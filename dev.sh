#!/bin/bash
set -e

# Run your preparation script
./prepare.sh

# Then start Docker Compose
docker compose up --build
