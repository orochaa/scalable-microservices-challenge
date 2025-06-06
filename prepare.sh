#!/bin/bash
set -e

CONTRACTS_SOURCE="./contracts"
APPS_DIR="./apps"

echo "🔄 Syncing contracts into all apps..."

# Loop through all folders inside ./apps
for project in "$APPS_DIR"/*; do
  if [ -d "$project" ]; then
    TARGET="$project/contracts"
    echo "→ Updating $TARGET"
    rm -rf "$TARGET"
    cp -R "$CONTRACTS_SOURCE" "$TARGET"
  fi
done

echo "✅ Contracts synced successfully."
