#!/bin/bash

# Script to fix "missing required error components" issue
# This happens when Next.js cache gets corrupted

echo "🔧 Fixing Next.js cache issues..."
echo ""

# Step 1: Stop any running dev servers
echo "1️⃣  Stopping any running dev servers..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "node server/updateTIME.mjs" 2>/dev/null || true
sleep 2

# Step 2: Remove corrupted cache
echo "2️⃣  Removing corrupted Next.js cache..."
rm -rf .next
rm -rf node_modules/.cache

# Step 3: Clear npm cache (optional but helps)
echo "3️⃣  Clearing npm cache..."
npm cache clean --force 2>/dev/null || true

echo ""
echo "✅ Cache cleared successfully!"
echo ""
echo "📝 Now run: npm run dev"
echo ""
