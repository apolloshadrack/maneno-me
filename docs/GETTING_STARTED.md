# Getting Started with Kenyan Native Languages Platform

## Overview

The Kenyan Native Languages Platform is a comprehensive system for preserving, translating, and promoting all native Kenyan languages. This platform combines modern web technologies with machine learning to create a powerful tool for language preservation and education.

## Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Docker & Docker Compose** (recommended for full setup)
- **Python 3.9+** (for local development)
- **Node.js 18+** (for frontend development)
- **PostgreSQL** (for local database)
- **Redis** (for caching)
- **MongoDB** (for media storage)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd maneno
   ```

2. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

3. **Access the platform:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize database:**
   ```bash
   python app/core/init_db.py
   ```

6. **Start the backend:**
   ```bash
   uvicorn app.main:app --reload
   ```

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
   ```

4. **Start the frontend:**
   ```bash
   npm run dev
   ```

#### ML Pipeline Setup

1. **Navigate to ML pipeline directory:**
   ```bash
   cd ml-pipeline
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run data collection:**
   ```bash
   python src/data_collection.py
   ```

## Project Structure

```
maneno/
├── backend/                 # FastAPI backend application
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   └── store/         # State management
│   ├── package.json
│   └── Dockerfile
├── ml-pipeline/           # Machine learning pipeline
│   ├── src/
│   │   ├── data_collection.py
│   │   └── model_training.py
│   ├── requirements.txt
│   └── Dockerfile
├── docs/                  # Documentation
├── docker-compose.yml     # Docker services
└── setup.sh              # Setup script
```

## Supported Languages

### Tier 1 (High Resource)
- **Swahili (Kiswahili)** - National language
- **Kikuyu (Gikuyu)** - Central Kenya
- **Luo (Dholuo)** - Western Kenya
- **Luhya (Luluhya)** - Western Kenya
- **Kamba (Kikamba)** - Eastern Kenya

### Tier 2 (Medium Resource)
- **Kalenjin** - Rift Valley
- **Kisii (Ekegusii)** - Southwestern Kenya
- **Meru (Kimeru)** - Eastern Kenya
- **Turkana** - Northwestern Kenya
- **Maasai (Maa)** - Southern Kenya

### Tier 3 (Low/Endangered)
- **Samburu** - Northern Kenya
- **Pokot** - Northwestern Kenya
- **Borana** - Northern Kenya
- **Rendille** - Northern Kenya
- **El Molo** - Critically endangered

## API Endpoints

### Translation
- `POST /api/v1/translate/` - Translate text
- `POST /api/v1/translate/batch` - Batch translation
- `POST /api/v1/translate/detect` - Language detection

### Languages
- `GET /api/v1/languages/` - List all languages
- `GET /api/v1/languages/{code}` - Get language details
- `GET /api/v1/languages/tier/{tier}` - Get languages by tier

### Audio Processing
- `POST /api/v1/audio/speech-to-text` - Convert speech to text
- `POST /api/v1/audio/text-to-speech` - Convert text to speech
- `POST /api/v1/audio/pronunciation-score` - Score pronunciation

### Community Features
- `POST /api/v1/community/contribute/translation` - Contribute translation
- `POST /api/v1/community/contribute/audio` - Contribute audio
- `GET /api/v1/community/cultural-context/{lang}/{phrase}` - Get cultural context

## Development

### Backend Development

1. **Run tests:**
   ```bash
   cd backend
   pytest
   ```

2. **Format code:**
   ```bash
   black app/
   isort app/
   ```

3. **Lint code:**
   ```bash
   flake8 app/
   ```

### Frontend Development

1. **Run tests:**
   ```bash
   cd frontend
   npm test
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Lint code:**
   ```bash
   npm run lint
   ```

### ML Pipeline Development

1. **Train models:**
   ```bash
   cd ml-pipeline
   python src/model_training.py
   ```

2. **Collect data:**
   ```bash
   python src/data_collection.py
   ```

## Contributing

We welcome contributions from:

- **Native speakers** - Provide authentic translations and cultural context
- **Linguists** - Help with language documentation and analysis
- **Developers** - Contribute to the technical platform
- **Community members** - Help preserve endangered languages

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests if applicable**
5. **Submit a pull request**

## Deployment

### Production Deployment

1. **Set up production environment variables**
2. **Build Docker images:**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

3. **Deploy to production:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Cloud Deployment

The platform is designed to be deployed on:
- **AWS** (EC2, RDS, ElastiCache, S3)
- **Google Cloud Platform** (Compute Engine, Cloud SQL, Memorystore)
- **Azure** (Virtual Machines, Database, Cache)

## Monitoring

### Health Checks
- Backend: `GET /health`
- Frontend: Built-in Next.js health checks
- Databases: Docker health checks

### Logging
- Structured logging with JSON format
- Log levels: DEBUG, INFO, WARNING, ERROR
- Centralized logging with ELK stack (optional)

### Metrics
- API response times
- Translation accuracy
- User engagement
- Model performance

## Support

For support and questions:

1. **Check the documentation** in the `docs/` directory
2. **Open an issue** on GitHub
3. **Contact the development team**

## License

[License information to be added]

## Acknowledgments

- Kenyan linguistic community
- Native speakers and language experts
- Open source contributors
- Academic institutions and researchers
