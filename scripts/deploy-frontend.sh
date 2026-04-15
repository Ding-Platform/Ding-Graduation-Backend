#!/bin/bash

# Build Ding frontend and publish static files for host Nginx.
set -euo pipefail

FRONTEND_DIR="${FRONTEND_DIR:-/root/Ding/Ding-Platform-Frontend}"
TARGET_DIR="${TARGET_DIR:-/var/www/ding-frontend}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}[ok] $1${NC}"
}

print_error() {
    echo -e "${RED}[error] $1${NC}"
}

print_info() {
    echo -e "${YELLOW}[info] $1${NC}"
}

# Prefer host pnpm: Corepack (Node 16+) or global npm install. Docker only if none work.
ensure_pnpm() {
    if command -v pnpm &> /dev/null; then
        return 0
    fi

    if command -v corepack &> /dev/null; then
        print_info "Provisioning pnpm with corepack..."
        corepack enable
        corepack prepare pnpm@10 --activate
    fi

    if command -v pnpm &> /dev/null; then
        return 0
    fi

    if command -v npm &> /dev/null; then
        print_info "Installing pnpm globally with npm..."
        npm install -g pnpm
    fi

    command -v pnpm &> /dev/null
}

check_requirements() {
    if [ ! -d "$FRONTEND_DIR" ]; then
        print_error "Frontend directory not found: $FRONTEND_DIR"
        exit 1
    fi

    print_success "Requirements validated"
}

build_frontend() {
    if ensure_pnpm; then
        print_info "Installing frontend dependencies..."
        pnpm --dir "$FRONTEND_DIR" install --frozen-lockfile

        print_info "Building frontend..."
        pnpm --dir "$FRONTEND_DIR" build
    else
        if ! command -v docker &> /dev/null; then
            print_error "pnpm could not be installed on this host and Docker is not available."
            print_info "Install Node.js (with corepack), or: npm install -g pnpm, or install Docker."
            exit 1
        fi
        print_info "Building frontend in Docker (no usable pnpm on host)..."
        docker run --rm \
            -v "$FRONTEND_DIR:/app" \
            -w /app \
            node:20-alpine \
            sh -lc "corepack enable && pnpm install --frozen-lockfile && pnpm build"
    fi

    if [ ! -d "$FRONTEND_DIR/dist" ]; then
        print_error "Build output not found: $FRONTEND_DIR/dist"
        exit 1
    fi

    print_success "Frontend build completed"
}

publish_frontend() {
    print_info "Publishing files to $TARGET_DIR ..."
    sudo mkdir -p "$TARGET_DIR"
    sudo rsync -a --delete "$FRONTEND_DIR/dist/" "$TARGET_DIR/"
    sudo chown -R www-data:www-data "$TARGET_DIR"

    print_success "Frontend files published"
}

main() {
    echo "====================================="
    echo "Ding Frontend Static Deploy"
    echo "====================================="
    echo ""

    check_requirements
    build_frontend
    publish_frontend

    echo ""
    print_success "Done. Static files are ready for Nginx at $TARGET_DIR"
}

main "$@"
