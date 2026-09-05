Reka Local

Find Local. Support Local. Grow Together.

About

Reka Local is a community-first digital marketplace developed during the Geekulcha Hackathon to bridge the gap between customers and informal/local vendors.

Many talented entrepreneurs struggle to reach customers because they rely on word-of-mouth marketing, have limited online presence, and lack affordable digital tools.

Reka Local solves this by giving vendors a simple platform where they can:

Create a business profile
List products
Receive customer orders
Accept digital payments
Build trust through reviews
Increase visibility in their communities

Customers can discover nearby businesses, browse products, support local economies, and shop conveniently from one application.

## Project Structure

This is a full-stack application with:

- **Frontend**: React + Vite + Tailwind CSS (Figma Make compatible)
  - Location: Root directory (`/src`, `/index.html`, etc.)
  - Runs on port 8443
  - Deployment: `.figma/make/` configuration for Figma Make

- **Backend**: Node.js + Express + Prisma
  - Location: `/Backend` directory
  - Runs on port 5000
  - Database: PostgreSQL
  - API documentation in `/Backend/README.md`

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm or npm
- PostgreSQL (for backend)

### Frontend (Figma Make App)

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env` file (optional, for local backend):
```bash
cp .env.example .env
```

3. Run development server:
```bash
pnpm run dev
```

Frontend runs on `http://localhost:8443`

### Backend (Express API)

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment:
```bash
cp .env.example .env
# Edit .env with your PostgreSQL connection string
```

4. Run development server:
```bash
pnpm run dev
```

Backend runs on `http://localhost:5000`

### Running Both Together

1. **Terminal 1 - Frontend**:
```bash
pnpm run dev
```

2. **Terminal 2 - Backend**:
```bash
cd Backend && pnpm run dev
```

The frontend will automatically proxy API requests to the backend:
- Frontend: `http://localhost:8443`
- Backend: `http://localhost:5000`
- API calls: `http://localhost:8443/api/*` → `http://localhost:5000/api/*`

## API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: Set via `VITE_API_URL` environment variable

### Available Endpoints

See `/Backend/README.md` for complete API documentation.

## Environment Variables

### Frontend (`.env`)
- `VITE_API_URL` - Backend API URL (default: `http://localhost:5000/api`)

### Backend (`Backend/.env`)
- `DATABASE_URL` - PostgreSQL connection string (required)
- `FRONTEND_URL` - Frontend URL for CORS (default: `http://localhost:8443`)
- `PORT` - Backend server port (default: 5000)
- `JWT_SECRET` - Secret for JWT tokens

## Database Setup

To run database migrations:

```bash
cd Backend
pnpm run prisma:migrate
```

To view the database:
```bash
pnpm run prisma:studio
```

## Deployment

### Figma Make Deployment

The project is configured to deploy to Figma Make:

1. Ensure `.figma/make/` directory is present
2. Configuration files:
   - `.figma/make/site.json` - Site metadata
   - `.figma/make/dev.json` - Dev server configuration
   - `.figma/make/deploy` - Deployment script

Deploy using:
```bash
pnpm run build
figma make deploy --build-dir dist
```

### Production deployment on Render

The repository includes `render.yaml`, which deploys the React build and Express
API together as one Render web service. Customers, vendors, and farmers use one
HTTPS URL, so API requests remain on the same origin.

1. Push this branch to GitHub.
2. In Render, choose **New +** → **Blueprint**, connect this repository, and
   select `render.yaml`.
3. Render creates the `reka-local` web service and `reka-local-db` PostgreSQL
   database, generates `JWT_SECRET`, and provides the final `https://...onrender.com`
   URL.
4. In the Render service's **Environment** tab, set `STRIPE_SECRET_KEY` and the
   SMTP variables only when live card payments and email receipts are required.
   Keep all secrets in Render; never commit them to this repository.

The active API currently uses in-memory demo stores while its Prisma persistence
layer is completed. The provided PostgreSQL database and `DATABASE_URL` are ready
for that migration, but accounts, orders, and harvest reservations will reset
after a web-service restart until those routes are persisted through Prisma.

## Development

### Frontend Development
- Hot module replacement (HMR) enabled
- Tailwind CSS v4 with Vite plugin
- React 19 with TypeScript

### Backend Development
- Nodemon for auto-restart
- Prisma ORM for database
- Express middleware configuration in `/Backend/src/app.js`

## Contributing

Follow the existing code structure and add new features in the appropriate directories:
- Frontend components: `/src/`
- Backend routes: `/Backend/src/`
- Database models: `/Backend/prisma/schema.prisma`

## License

See LICENSE file for details.
