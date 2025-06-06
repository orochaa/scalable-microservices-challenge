#!/bin/bash
set -e

echo "🚀 Preparing workspace..."
./prepare.sh

echo "📦 Starting Docker Compose:"
docker compose up --build "$@"
