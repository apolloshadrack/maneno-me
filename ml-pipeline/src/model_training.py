"""
Model training module for Kenyan language translation models.
"""

import torch
import torch.nn as nn
from transformers import (
    AutoTokenizer, 
    AutoModelForSeq2SeqLM,
    TrainingArguments,
    Trainer,
    DataCollatorForSeq2Seq
)
from datasets import Dataset
import pandas as pd
import json
from pathlib import Path
from typing import Dict, List, Tuple
import logging
import mlflow
import mlflow.transformers

logger = logging.getLogger(__name__)


class KenyanLanguageTranslator:
    """Trainer for Kenyan language translation models."""
    
    def __init__(self, model_name: str = "facebook/m2m100_418M"):
        self.model_name = model_name
        self.tokenizer = None
        self.model = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
    def load_model(self):
        """Load the base model and tokenizer."""
        logger.info(f"Loading model: {self.model_name}")
        
        self.tokenizer = AutoTokenizer.from_pretrained(
            self.model_name,
            src_lang="en",
            tgt_lang="sw"
        )
        
        self.model = AutoModelForSeq2SeqLM.from_pretrained(self.model_name)
        self.model.to(self.device)
        
        logger.info("Model loaded successfully")
    
    def prepare_dataset(self, data_path: str) -> Dataset:
        """Prepare dataset for training."""
        logger.info(f"Loading dataset from {data_path}")
        
        with open(data_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Convert to pandas DataFrame for easier manipulation
        df = pd.DataFrame(data)
        
        # Create training examples
        examples = []
        for _, row in df.iterrows():
            examples.append({
                "source": row["text"],
                "target": row["translation"],
                "source_lang": row["source_lang"],
                "target_lang": row["target_lang"]
            })
        
        dataset = Dataset.from_list(examples)
        logger.info(f"Prepared {len(dataset)} training examples")
        
        return dataset
    
    def tokenize_function(self, examples):
        """Tokenize the dataset."""
        # Set source and target languages
        self.tokenizer.src_lang = examples["source_lang"][0]
        self.tokenizer.tgt_lang = examples["target_lang"][0]
        
        # Tokenize inputs
        model_inputs = self.tokenizer(
            examples["source"],
            max_length=128,
            padding=True,
            truncation=True
        )
        
        # Tokenize targets
        with self.tokenizer.as_target_tokenizer():
            labels = self.tokenizer(
                examples["target"],
                max_length=128,
                padding=True,
                truncation=True
            )
        
        model_inputs["labels"] = labels["input_ids"]
        return model_inputs
    
    def train_model(
        self, 
        train_dataset: Dataset, 
        eval_dataset: Dataset = None,
        output_dir: str = "models/kenyan_translator",
        num_epochs: int = 3,
        batch_size: int = 8
    ):
        """Train the translation model."""
        logger.info("Starting model training...")
        
        # Tokenize datasets
        train_dataset = train_dataset.map(
            self.tokenize_function,
            batched=True,
            remove_columns=train_dataset.column_names
        )
        
        if eval_dataset:
            eval_dataset = eval_dataset.map(
                self.tokenize_function,
                batched=True,
                remove_columns=eval_dataset.column_names
            )
        
        # Data collator
        data_collator = DataCollatorForSeq2Seq(
            tokenizer=self.tokenizer,
            model=self.model,
            padding=True
        )
        
        # Training arguments
        training_args = TrainingArguments(
            output_dir=output_dir,
            num_train_epochs=num_epochs,
            per_device_train_batch_size=batch_size,
            per_device_eval_batch_size=batch_size,
            warmup_steps=500,
            weight_decay=0.01,
            logging_dir=f"{output_dir}/logs",
            logging_steps=100,
            evaluation_strategy="steps" if eval_dataset else "no",
            eval_steps=500 if eval_dataset else None,
            save_strategy="steps",
            save_steps=1000,
            load_best_model_at_end=True if eval_dataset else False,
            metric_for_best_model="eval_loss" if eval_dataset else None,
            greater_is_better=False,
            report_to="mlflow",
            push_to_hub=False
        )
        
        # Initialize trainer
        trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=train_dataset,
            eval_dataset=eval_dataset,
            data_collator=data_collator,
            tokenizer=self.tokenizer
        )
        
        # Start MLflow run
        with mlflow.start_run():
            # Log model parameters
            mlflow.log_params({
                "model_name": self.model_name,
                "num_epochs": num_epochs,
                "batch_size": batch_size,
                "train_size": len(train_dataset),
                "eval_size": len(eval_dataset) if eval_dataset else 0
            })
            
            # Train the model
            trainer.train()
            
            # Save the model
            trainer.save_model()
            self.tokenizer.save_pretrained(output_dir)
            
            # Log model to MLflow
            mlflow.transformers.log_model(
                transformers_model={
                    "model": self.model,
                    "tokenizer": self.tokenizer
                },
                artifact_path="model",
                registered_model_name="kenyan_language_translator"
            )
            
            logger.info(f"Model training completed. Model saved to {output_dir}")
    
    def evaluate_model(self, test_dataset: Dataset) -> Dict:
        """Evaluate the trained model."""
        logger.info("Evaluating model...")
        
        # Tokenize test dataset
        test_dataset = test_dataset.map(
            self.tokenize_function,
            batched=True,
            remove_columns=test_dataset.column_names
        )
        
        # Initialize trainer for evaluation
        trainer = Trainer(
            model=self.model,
            tokenizer=self.tokenizer,
            data_collator=DataCollatorForSeq2Seq(
                tokenizer=self.tokenizer,
                model=self.model,
                padding=True
            )
        )
        
        # Evaluate
        eval_results = trainer.evaluate(test_dataset)
        
        logger.info(f"Evaluation results: {eval_results}")
        return eval_results
    
    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        """Translate text using the trained model."""
        if not self.model or not self.tokenizer:
            raise ValueError("Model not loaded. Call load_model() first.")
        
        # Set languages
        self.tokenizer.src_lang = source_lang
        self.tokenizer.tgt_lang = target_lang
        
        # Tokenize input
        inputs = self.tokenizer(text, return_tensors="pt").to(self.device)
        
        # Generate translation
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_length=128,
                num_beams=4,
                early_stopping=True
            )
        
        # Decode output
        translation = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return translation


def main():
    """Main training pipeline."""
    logging.basicConfig(level=logging.INFO)
    
    # Initialize translator
    translator = KenyanLanguageTranslator()
    translator.load_model()
    
    # Prepare datasets
    train_dataset = translator.prepare_dataset("data/swahili_corpus.json")
    
    # Train model
    translator.train_model(
        train_dataset=train_dataset,
        output_dir="models/swahili_translator",
        num_epochs=3,
        batch_size=4
    )
    
    # Test translation
    translation = translator.translate(
        "Hello, how are you?",
        source_lang="en",
        target_lang="sw"
    )
    print(f"Translation: {translation}")


if __name__ == "__main__":
    main()
