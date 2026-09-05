#!/usr/bin/env bash
# Run both frontend and backend development servers

echo "🚀 Starting Reka Local Full Stack..."
echo ""

# Check if Backend directory exists
if [ ! -d "Backend" ]; then
  echo "❌ Backend directory not found!"
  exit 1
fi

# Check if src directory exists
if [ ! -d "src" ]; then
  echo "❌ Frontend src directory not found!"
  exit 1
fi

echo "📝 This script will run:"
echo "   • Frontend on http://localhost:8443"
echo "   • Backend on http://localhost:5000"
echo ""
echo "Make sure:"
echo "   • PostgreSQL is running"
echo "   • Backend .env is configured with DATABASE_URL"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  pnpm install
fi

if [ ! -d "Backend/node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  cd Backend && pnpm install && cd ..
fi

# Run frontend and backend in parallel
echo "Starting servers..."
(
  echo "Frontend:"
  pnpm run dev
) &
FE_PID=$!

(
  echo "Backend:"
  cd Backend && pnpm run dev
) &
BE_PID=$!

# Trap Ctrl+C to kill both processes
trap "kill $FE_PID $BE_PID; exit" INT

# Wait for both to finish
wait
