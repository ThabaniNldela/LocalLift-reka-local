# Reka Local Backend

Node.js + Express + Prisma backend for Reka Local platform.

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or pnpm

### Installation

1. Install dependencies:
```bash
cd Backend
npm install
# or
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database URL and other settings
```

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Run migrations (when DB is ready):
```bash
npm run prisma:migrate
```

### Development

Start the dev server with hot-reload:
```bash
npm run dev
```

The backend will run on `http://0.0.0.0:5000` by default.

### Production

Start the server:
```bash
npm start
```

## API Endpoints

- `GET /` - API info
- `GET /health` - Health check
- `GET /api/vendors` - List vendors
- `GET /api/auth` - Auth endpoints (to be implemented)

## Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - Frontend URL for CORS
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV` - Environment (development/production)

## Database Schema

The Prisma schema defines models for:
- Users (customers, vendors, admins)
- Vendors (business profiles)
- Products
- Orders & OrderItems
- Reviews
- Locations

## Backend and Frontend Integration

This backend is configured to work with the frontend at `http://localhost:8443`. CORS is automatically enabled for this URL.

Frontend API base: `http://localhost:5000/api`

To configure a different frontend URL:
1. Update `FRONTEND_URL` in `.env`
2. Restart the backend

## Deployment to Figma Make

The backend can be deployed alongside the frontend in Figma Make:

1. Ensure both `.figma/make/` and `Backend/` are properly structured
2. Backend runs on port 5000, frontend on port 8443
3. Both share the same Figma Make deployment
