#!/bin/bash
set -e

# Define workspace project directories here (relative to repo root)
PROJECTS=("apps/invoices" "apps/orders")

# Path to root-level contracts folder
CONTRACTS_SOURCE="./contracts"

echo "Syncing contracts folder into projects..."
for project in "${PROJECTS[@]}"; do
  TARGET="$project/contracts"
  
  echo "→ Updating $TARGET"
  
  # Remove existing contracts folder if exists
  rm -rf "$TARGET"
  
  # Copy root contracts folder into the project
  cp -R "$CONTRACTS_SOURCE" "$TARGET"
done

echo "✅ Contracts synced successfully to all projects."
