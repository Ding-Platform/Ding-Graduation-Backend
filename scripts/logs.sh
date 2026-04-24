#!/bin/bash

detect_env() {
    if docker compose -f docker-compose.yml -f docker-compose.prod.yml ps &> /dev/null; then
        echo "-f docker-compose.yml -f docker-compose.prod.yml"
    elif docker compose -f docker-compose.yml -f docker-compose.dev.yml ps &> /dev/null; then
        echo "-f docker-compose.yml -f docker-compose.dev.yml"
    else
        echo ""
    fi
}

COMPOSE_FILES=$(detect_env)

if [ -z "$COMPOSE_FILES" ]; then
    echo "No containers running. Start with ./scripts/dev.sh or ./scripts/deploy.sh"
    exit 1
fi

echo "Following logs for: docker compose $COMPOSE_FILES logs -f"
docker compose $COMPOSE_FILES logs -f
