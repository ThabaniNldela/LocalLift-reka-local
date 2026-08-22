#!/usr/bin/env bash
# Quick setup script for Reka Local

echo "🎯 Reka Local Setup"
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
  exit 1
fi

echo "✅ Node.js $(node --version) found"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
  echo "📦 pnpm not found. Installing globally..."
  npm install -g pnpm
fi

echo "✅ pnpm $(pnpm --version) found"
echo ""

# Frontend setup
echo "📦 Setting up Frontend..."
pnpm install
if [ -f ".env.example" ]; then
  if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env from .env.example"
  fi
fi

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd Backend

pnpm install

if [ -f ".env.example" ]; then
  if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created Backend/.env from Backend/.env.example"
    echo ""
    echo "⚠️  Please update Backend/.env with your DATABASE_URL"
  fi
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure Backend/.env with your PostgreSQL connection"
echo "2. Run 'bash dev-all.sh' to start both servers"
echo "3. Or run 'pnpm run dev' for frontend and 'cd Backend && pnpm run dev' for backend separately"
echo ""
echo "Frontend: http://localhost:8443"
echo "Backend: http://localhost:5000"
