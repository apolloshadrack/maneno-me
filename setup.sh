#!/bin/bash

# Kenyan Native Languages Platform Setup Script

set -e

echo "🇰🇪 Setting up Kenyan Native Languages Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Check if Python is installed
check_python() {
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.9+ first."
        exit 1
    fi
    
    print_success "Python 3 is installed"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "Node.js and npm are installed"
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    cd backend
    
    # Create virtual environment
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing Python dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
    
    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        print_status "Creating .env file..."
        cp env.example .env
        print_warning "Please update the .env file with your configuration"
    fi
    
    cd ..
    print_success "Backend setup completed"
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing Node.js dependencies..."
    npm install
    
    # Create .env.local file if it doesn't exist
    if [ ! -f ".env.local" ]; then
        print_status "Creating .env.local file..."
        echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
    fi
    
    cd ..
    print_success "Frontend setup completed"
}

# Setup ML pipeline
setup_ml_pipeline() {
    print_status "Setting up ML pipeline..."
    
    cd ml-pipeline
    
    # Create virtual environment
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing ML dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
    
    # Create data directory
    mkdir -p data models
    
    cd ..
    print_success "ML pipeline setup completed"
}

# Start services with Docker Compose
start_services() {
    print_status "Starting services with Docker Compose..."
    
    # Start database services
    docker-compose up -d postgres redis mongodb
    
    # Wait for databases to be ready
    print_status "Waiting for databases to be ready..."
    sleep 10
    
    # Initialize database
    print_status "Initializing database..."
    cd backend
    source venv/bin/activate
    python app/core/init_db.py
    cd ..
    
    # Start all services
    docker-compose up -d
    
    print_success "All services started successfully"
}

# Display status
show_status() {
    echo ""
    echo "🎉 Kenyan Native Languages Platform is ready!"
    echo ""
    echo "📊 Services Status:"
    echo "  • Frontend: http://localhost:3000"
    echo "  • Backend API: http://localhost:8000"
    echo "  • API Docs: http://localhost:8000/docs"
    echo "  • MLflow: http://localhost:5000 (if training profile is active)"
    echo ""
    echo "🗄️  Databases:"
    echo "  • PostgreSQL: localhost:5432"
    echo "  • Redis: localhost:6379"
    echo "  • MongoDB: localhost:27017"
    echo ""
    echo "📚 Next Steps:"
    echo "  1. Visit http://localhost:3000 to see the frontend"
    echo "  2. Check http://localhost:8000/docs for API documentation"
    echo "  3. Start contributing translations and audio recordings"
    echo ""
    echo "🔧 Development Commands:"
    echo "  • Backend: cd backend && source venv/bin/activate && uvicorn app.main:app --reload"
    echo "  • Frontend: cd frontend && npm run dev"
    echo "  • ML Pipeline: cd ml-pipeline && source venv/bin/activate && python src/data_collection.py"
    echo ""
}

# Main setup function
main() {
    echo "Starting setup process..."
    
    # Check prerequisites
    check_docker
    check_python
    check_node
    
    # Setup components
    setup_backend
    setup_frontend
    setup_ml_pipeline
    
    # Start services
    start_services
    
    # Show status
    show_status
}

# Run main function
main "$@"
