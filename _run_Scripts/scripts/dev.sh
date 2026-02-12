#!/bin/bash
set -euo pipefail

echo "🚀 Starting Ding development environment..."

# Always run from Ding-Platform-Backend root so relative paths in compose work.
# We resolve BACKEND_ROOT robustly by walking up until we find the backend markers.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

find_backend_root() {
  local dir="$1"
  while [[ "$dir" != "/" ]]; do
    if [[ -f "$dir/package.json" && -d "$dir/prisma" && -d "$dir/_deploy" ]]; then
      echo "$dir"
      return 0
    fi
    dir="$(cd "$dir/.." && pwd)"
  done
  return 1
}

BACKEND_ROOT="$(find_backend_root "$SCRIPT_DIR" || true)"
if [[ -z "${BACKEND_ROOT}" ]]; then
  echo "❌ Could not locate Ding-Platform-Backend root from: $SCRIPT_DIR"
  echo "   Expected to find: package.json, prisma/, _deploy/"
  exit 1
fi

COMPOSE_FILE="$BACKEND_ROOT/_deploy/docker-compose.dev.yml"
ENV_FILE="$BACKEND_ROOT/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "❌ env file not found at: $ENV_FILE"
  echo "   Create it (or copy from .env.example) and re-run."
  exit 1
fi

cd "$BACKEND_ROOT"

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose --project-directory "$BACKEND_ROOT" --env-file "$ENV_FILE" -f "$COMPOSE_FILE" down || true

# Build and start the development environment
echo "🔨 Building and starting development environment..."
docker compose --project-directory "$BACKEND_ROOT" --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Wait for Neo4j to be ready
echo "⏳ Waiting for Neo4j to be ready..."
MAX_RETRIES=30
RETRY_COUNT=0
NEO4J_READY=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  # Check if Neo4j container is running
  if docker compose --project-directory "$BACKEND_ROOT" --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps neo4j | grep -q "Up"; then
    # Give it a bit more time to fully initialize
    sleep 3
    echo "✅ Neo4j container is running!"
    NEO4J_READY=true
    break
  fi
  RETRY_COUNT=$((RETRY_COUNT + 1))
  echo "  Waiting for Neo4j container... ($RETRY_COUNT/$MAX_RETRIES)"
  sleep 2
done

if [ "$NEO4J_READY" = false ]; then
  echo "⚠️  Neo4j container may not be ready, but continuing..."
  echo "   If seed fails, wait a bit longer and run: docker compose --project-directory \"$BACKEND_ROOT\" --env-file \"$ENV_FILE\" -f \"$COMPOSE_FILE\" exec backend pnpm prisma:seed"
fi

# Additional wait to ensure Neo4j is fully initialized
echo "⏳ Allowing Neo4j additional time to initialize..."
sleep 10

# Ask if user wants to seed the database
echo ""
read -p "🌱 Do you want to seed the database? This will DROP all existing data and create 1000 users with profiles and Neo4j nodes. (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🌱 Running database seed..."
  echo "⚠️  WARNING: This will drop all existing data in PostgreSQL and Neo4j!"
  echo ""
  
  # Run seed inside the container (use service name 'backend')
  docker compose --project-directory "$BACKEND_ROOT" --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T backend pnpm prisma:seed
  
  if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database seeded successfully!"
  else
    echo ""
    echo "❌ Seed failed. Check the logs above for details."
  fi
else
  echo "⏭️  Skipping database seed."
fi

echo ""
echo "✅ Development environment is ready!"
echo "📱 App will be available at: http://localhost:3000"
echo "🗄️  Database will be available at: localhost:5432"
echo "🔍 Prisma Studio will be available at: http://localhost:5555"
echo "💡 To stop the environment, run: docker compose -f \"$COMPOSE_FILE\" down"
echo ""
echo "📋 To view logs: docker compose -f \"$COMPOSE_FILE\" logs -f"
