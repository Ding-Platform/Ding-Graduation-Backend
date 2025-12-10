#!/bin/bash

# =============================================================================
# Ding Platform - Complete Database Setup & Seeder Script
# =============================================================================
# This script sets up and seeds all databases for the Ding Platform:
# - PostgreSQL (via Prisma)
# - Neo4j (graph database for social connections)
# - MongoDB (for chat module)
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo ""
    echo -e "${BLUE}============================================${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}============================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if .env file exists
check_env() {
    print_header "Checking Environment Configuration"
    
    if [ ! -f .env ]; then
        print_error ".env file not found!"
        print_info "Creating .env from .env.example..."
        cp .env.example .env
        print_warning "Please edit .env with your actual configuration values!"
        print_info "Required variables:"
        echo "  - DATABASE_URL (PostgreSQL connection string)"
        echo "  - NEO4J_URI, NEO4J_AUTH (Neo4j connection)"
        echo "  - MONGODB_URI, MONGODB_DB_NAME (MongoDB connection)"
        echo ""
        read -p "Press Enter after you've configured .env..." 
    else
        print_success ".env file found"
    fi
}

# Check database services
check_services() {
    print_header "Checking Database Services"
    
    # Check PostgreSQL
    print_info "Checking PostgreSQL..."
    if pg_isready -q 2>/dev/null; then
        print_success "PostgreSQL is running"
    else
        print_warning "PostgreSQL might not be running. Make sure it's started."
    fi
    
    # Check Neo4j (try to connect on default port)
    print_info "Checking Neo4j..."
    if nc -z localhost 7687 2>/dev/null; then
        print_success "Neo4j is running on port 7687"
    else
        print_warning "Neo4j might not be running on port 7687"
    fi
    
    # Check MongoDB
    print_info "Checking MongoDB..."
    if nc -z localhost 27017 2>/dev/null; then
        print_success "MongoDB is running on port 27017"
    else
        print_warning "MongoDB might not be running on port 27017"
    fi
    
    echo ""
    read -p "Continue with migration? (y/n): " continue_migration
    if [ "$continue_migration" != "y" ]; then
        print_info "Exiting. Please start required services and try again."
        exit 0
    fi
}

# Install dependencies
install_deps() {
    print_header "Installing Dependencies"
    
    if command -v pnpm &> /dev/null; then
        print_info "Installing npm packages with pnpm..."
        pnpm install
        print_success "Dependencies installed"
    else
        print_error "pnpm not found. Please install it: npm install -g pnpm"
        exit 1
    fi
}

# Generate Prisma client
generate_prisma() {
    print_header "Generating Prisma Client"
    
    print_info "Running prisma generate..."
    npx prisma generate
    print_success "Prisma client generated"
}

# Run PostgreSQL migrations
migrate_postgres() {
    print_header "Running PostgreSQL Migrations"
    
    print_info "Running Prisma migrations..."
    npx prisma migrate deploy
    print_success "PostgreSQL migrations completed"
}

# Seed PostgreSQL and Neo4j
seed_postgres_neo4j() {
    print_header "Seeding PostgreSQL & Neo4j"
    
    print_info "This will create:"
    echo "  - 1000 test users with profiles"
    echo "  - 3 developer accounts"
    echo "  - Friend relationships"
    echo "  - Follow relationships"
    echo ""
    print_warning "This may take 5-15 minutes..."
    
    npx ts-node --project tsconfig.json prisma/seed.ts
    print_success "PostgreSQL & Neo4j seeding completed"
}

# Seed MongoDB Chat data
seed_mongodb() {
    print_header "Seeding MongoDB (Chat)"
    
    print_info "This will create:"
    echo "  - 50 direct chat rooms"
    echo "  - 20 group chat rooms"
    echo "  - Messages with reactions"
    echo "  - Read receipts"
    echo "  - Pinned messages"
    echo ""
    
    npx ts-node --project tsconfig.json prisma/seed-chat.ts
    print_success "MongoDB chat seeding completed"
}

# Seed posts
seed_posts() {
    print_header "Seeding Posts"
    
    if [ -f prisma/seed-posts.ts ]; then
        print_info "Seeding posts for users..."
        npx ts-node --project tsconfig.json prisma/seed-posts.ts
        print_success "Posts seeding completed"
    else
        print_warning "seed-posts.ts not found, skipping..."
    fi
}

# Main execution
main() {
    print_header "🚀 Ding Platform - Complete Setup & Seed"
    
    echo "This script will:"
    echo "  1. Check environment configuration"
    echo "  2. Verify database services are running"
    echo "  3. Install npm dependencies"
    echo "  4. Generate Prisma client"
    echo "  5. Run PostgreSQL migrations"
    echo "  6. Seed PostgreSQL & Neo4j (users, profiles, relationships)"
    echo "  7. Seed MongoDB (chat rooms, messages)"
    echo "  8. Seed Posts (optional)"
    echo ""
    
    read -p "Continue? (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        echo "Cancelled."
        exit 0
    fi
    
    check_env
    check_services
    install_deps
    generate_prisma
    migrate_postgres
    seed_postgres_neo4j
    seed_mongodb
    seed_posts
    
    print_header "🎉 Setup Complete!"
    
    echo ""
    echo "Developer accounts created:"
    echo "  📧 ziadhamdy667@gmail.com    / Password#1"
    echo "  📧 ziad.fathi.seleem@gmail.com / Ziad@123"
    echo "  📧 zackriver.dev@gmail.com   / *A01201024880z#"
    echo ""
    echo "To start the application:"
    echo "  pnpm start:dev"
    echo ""
    echo "API will be available at:"
    echo "  http://localhost:3000/api/v1"
    echo ""
    echo "Swagger documentation:"
    echo "  http://localhost:3000/api/docs"
    echo ""
}

# Run main function
main
