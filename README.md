# Kenyan Native Languages Platform

A comprehensive multilingual platform for preserving and translating all native Kenyan languages. This platform serves as both a translation API and a language preservation tool, supporting 40+ Kenyan languages including endangered ones.

## Project Structure

```
maneno/
├── backend/          # FastAPI backend application
├── frontend/         # Next.js frontend application
├── ml-pipeline/      # Machine learning models and training
├── docs/            # Documentation and guides
└── plan.md          # Original project plan
```

## Features

- **Translation Service**: Multi-language translation endpoints (English ↔ Kenyan languages, Kenyan language ↔ Kenyan language)
- **Audio Processing**: Speech-to-text and text-to-speech capabilities
- **Language Preservation**: Community contribution tools and cultural context
- **Educational Components**: Interactive language learning modules
- **Community Features**: User contributions, feedback, and verification workflows

## Supported Languages

### Tier 1 (High Resource)
- Swahili (Kiswahili)
- Kikuyu (Gikuyu)
- Luo (Dholuo)
- Luhya (Luluhya)
- Kamba (Kikamba)

### Tier 2 (Medium Resource)
- Kalenjin
- Kisii (Ekegusii)
- Meru (Kimeru)
- Turkana
- Maasai (Maa)

### Tier 3 (Low/Endangered)
- Samburu
- Pokot
- Borana
- Rendille
- El Molo

## Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### ML Pipeline Setup
```bash
cd ml-pipeline
pip install -r requirements.txt
```

## API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation.

## Contributing

This project aims to preserve and promote Kenyan native languages. We welcome contributions from:
- Native speakers
- Linguists and language experts
- Developers and technologists
- Community members

## License

[License information to be added]

## Contact

[Contact information to be added]
