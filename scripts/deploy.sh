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
SERVER_IP="localhost"
# Nest uses global prefix api/v1; GET / returns 404, so do not probe bare :3000/
BACKEND_HEALTH_URL="${BACKEND_HEALTH_URL:-http://localhost:3000/api/v1/health}"

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
    print_info "Waiting for backend at $BACKEND_HEALTH_URL ..."
    
    max_attempts=30
    attempt=0
    while [ $attempt -lt $max_attempts ]; do
        if curl -fsS "$BACKEND_HEALTH_URL" &> /dev/null; then
            print_success "Backend is healthy"
            break
        fi
        attempt=$((attempt + 1))
        echo -n "."
        sleep 2
    done
    
    if [ $attempt -eq $max_attempts ]; then
        print_error "Backend failed to become healthy (no OK response from $BACKEND_HEALTH_URL)"
        print_info "Check logs: docker compose $COMPOSE_FILES logs --tail=80 backend"
        return 1
    fi
    
    print_success "All services are healthy"
}

run_migrations() {
    print_info "Running database migrations..."
    
    docker compose $COMPOSE_FILES exec -T backend pnpm prisma migrate deploy
    
    print_success "Database migrations completed"
}

display_summary() {
    echo ""
    echo "====================================="
    echo "Deployment Summary"
    echo "====================================="
    echo ""
    print_success "Ding Platform has been deployed successfully!"
    echo ""
    print_info "Nginx should run on the host server (not Docker)."
    print_info "If your public IP is unknown, run: curl -s ipv4.icanhazip.com"
    echo ""
    echo "Access your application at:"
    echo "  Backend API (direct):   http://localhost:3000"
    echo "  Frontend (via Nginx):   http://$SERVER_IP"
    echo "  API via Nginx:          http://$SERVER_IP/api"
    echo ""
    echo "Useful commands:"
    echo "  View logs:       ./scripts/logs.sh"
    echo "  Deploy frontend: ./scripts/deploy-frontend.sh"
    echo "  Backend + static: DEPLOY_FRONTEND=1 ./scripts/deploy.sh"
    echo "  Stop services:   docker compose $COMPOSE_FILES down"
    echo "  Restart:         docker compose $COMPOSE_FILES restart"
    echo "  View status:     docker compose $COMPOSE_FILES ps"
    echo ""
    echo "Host Nginx setup:"
    echo "  Frontend root:   /var/www/ding-frontend"
    echo "  Nginx config:    /etc/nginx/conf.d/ding.conf"
    echo "  Config template: ./nginx/ding.conf"
    echo "  Reload Nginx:    sudo nginx -t && sudo systemctl reload nginx"
    echo ""
}

main() {
    echo ""
    check_docker
    check_docker_compose
    echo ""
    
    stop_existing
    echo ""
    
    deploy_services
    echo ""
    
    wait_for_services
    echo ""
    
    run_migrations
    echo ""

    if [ "${DEPLOY_FRONTEND:-0}" = "1" ]; then
        print_info "DEPLOY_FRONTEND=1 — publishing static frontend..."
        "$(dirname "$0")/deploy-frontend.sh"
        echo ""
    fi

    get_server_ip
    echo ""
    
    display_summary
}

main
