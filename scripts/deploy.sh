#!/bin/bash

# Ding Platform Production Deployment Script
set -e

echo "====================================="
echo "Ding Platform Production Deployment"
echo "====================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

COMPOSE_FILES="-f docker-compose.yml -f docker-compose.prod.yml"
SAFE_DB_MODE=true

check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    print_success "Docker is installed ($(docker --version))"
}

check_docker_compose() {
    if ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    print_success "Docker Compose is installed ($(docker compose version))"
}

get_server_ip() {
    SERVER_IP=$(curl -s ipv4.icanhazip.com || curl -s -4 ifconfig.me || hostname -I | awk '{print $1}')
    print_info "Detected server IP: $SERVER_IP"
}

create_directories() {
    print_info "Creating necessary directories..."
    mkdir -p nginx/logs
    mkdir -p nginx/ssl
    mkdir -p nginx/conf.d
    print_success "Directories created"
}

stop_existing() {
    print_info "Stopping existing containers..."
    docker compose $COMPOSE_FILES down 2>/dev/null || true
    print_success "Existing containers stopped (volumes preserved)"
}

deploy_services() {
    print_info "Building and starting services..."
    print_info "This may take several minutes on first run..."
    
    docker compose $COMPOSE_FILES up -d --build
    
    print_success "Services built and started"
}

wait_for_services() {
    print_info "Waiting for services to be healthy..."
    
    max_attempts=30
    attempt=0
    while [ $attempt -lt $max_attempts ]; do
        if curl -f http://localhost:3000 &> /dev/null; then
            print_success "Backend is healthy"
            break
        fi
        attempt=$((attempt + 1))
        echo -n "."
        sleep 2
    done
    
    if [ $attempt -eq $max_attempts ]; then
        print_error "Backend failed to become healthy"
        return 1
    fi
    
    print_success "All services are healthy"
}

run_migrations() {
    print_info "Running database migrations..."
    
    docker compose $COMPOSE_FILES exec -T backend pnpm prisma migrate deploy
    
    print_success "Database migrations completed"
}

configure_nginx() {
    print_info "Configuring Nginx..."
    
    if [ ! -f nginx/nginx.conf ]; then
        print_error "nginx/nginx.conf not found!"
        return 1
    fi
    
    docker compose $COMPOSE_FILES up -d nginx
    
    print_success "Nginx configured and started"
}

display_summary() {
    echo ""
    echo "====================================="
    echo "Deployment Summary"
    echo "====================================="
    echo ""
    print_success "Ding Platform has been deployed successfully!"
    echo ""
    echo "Access your application at:"
    echo "  Backend:   http://localhost:3000"
    echo "  Frontend:  http://localhost"
    echo "  Prisma:    http://localhost:5555"
    echo ""
    echo "Useful commands:"
    echo "  View logs:       ./scripts/logs.sh"
    echo "  Stop services:   docker compose $COMPOSE_FILES down"
    echo "  Restart:         docker compose $COMPOSE_FILES restart"
    echo "  View status:     docker compose $COMPOSE_FILES ps"
    echo ""
}

main() {
    echo ""
    check_docker
    check_docker_compose
    echo ""
    
    create_directories
    echo ""
    
    stop_existing
    echo ""
    
    deploy_services
    echo ""
    
    wait_for_services
    echo ""
    
    run_migrations
    echo ""
    
    configure_nginx
    echo ""
    
    display_summary
}

main
