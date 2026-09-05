# Reka Local - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install & Configure (One-Time Setup)

```bash
# Copy and run the setup script
bash setup.sh

# This will:
# ✅ Install frontend dependencies (React, Vite, Tailwind)
# ✅ Install backend dependencies (Express, Prisma, etc.)
# ✅ Create .env files from templates
# ✅ Show what to configure next
```

### Step 2: Configure Database (One-Time Setup)

**Install PostgreSQL** (if not already installed)
- macOS: `brew install postgresql`
- Windows: Download from https://www.postgresql.org/download/windows/
- Linux: `sudo apt-get install postgresql`

**Set up your database:**

```bash
cd Backend
# Edit .env with your PostgreSQL connection
# Example:
# DATABASE_URL="postgresql://user:password@localhost:5432/reka_local"
nano .env  # or use your editor

# Run migrations (when DB is ready)
pnpm run prisma:migrate
```

### Step 3: Start Development

**Option A - Run Both Servers Together:**
```bash
bash dev-all.sh
```

**Option B - Run Separately:**

Terminal 1 (Frontend):
```bash
pnpm run dev
# Opens http://localhost:8443
```

Terminal 2 (Backend):
```bash
cd Backend
pnpm run dev
# Runs on http://localhost:5000
```

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│                    Port: 8443 (Figma Make)                   │
├─────────────────────────────────────────────────────────────┤
│  ✅ /api/* requests → Proxied to http://localhost:5000/api   │
│  ✅ API Client Library (src/api.ts)                          │
│  ✅ React Hooks (useBackendHealth, useFetch)                 │
│  ✅ Tailwind CSS v4 styling                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/JSON ↓
┌─────────────────────────────────────────────────────────────┐
│                 Backend (Express + Prisma)                   │
│                     Port: 5000                               │
├─────────────────────────────────────────────────────────────┤
│  ✅ GET /health - Health check                              │
│  ✅ GET /api/vendors - List vendors                         │
│  ✅ GET /api/auth - Authentication                          │
│  ✅ CORS enabled for http://localhost:8443                  │
└─────────────────────────────────────────────────────────────┘
                            ↓ SQL ↓
┌─────────────────────────────────────────────────────────────┐
│              Database (PostgreSQL)                           │
├─────────────────────────────────────────────────────────────┤
│  ✅ User (customers, vendors, admins)                       │
│  ✅ Vendor (business profiles)                              │
│  ✅ Product (vendor items)                                  │
│  ✅ Order (customer orders)                                 │
│  ✅ Review (ratings)                                        │
│  ✅ Location (geographic data)                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔑 Key Files & Their Purpose

### Frontend
- **`src/main.tsx`** - React entry point
- **`src/App.tsx`** - Main application component (landing page)
- **`src/api.ts`** - Backend API client library
- **`src/config.ts`** - Environment configuration
- **`src/hooks/useBackend.ts`** - React hooks for API interaction
- **`vite.config.ts`** - Vite configuration with proxy setup
- **`src/index.css`** - Global styles + Tailwind setup

### Backend
- **`Backend/src/server.js`** - Node.js server entry point
- **`Backend/src/app.js`** - Express.js app configuration & routes
- **`Backend/prisma/schema.prisma`** - Database schema definition
- **`Backend/package.json`** - Dependencies

### Configuration
- **`.env.example`** - Frontend environment template
- **`Backend/.env.example`** - Backend environment template
- **`.figma/make/`** - Figma Make deployment configuration

---

## 🛠️ Development Workflow

### Testing the API Connection

1. **Check Backend Health:**
```bash
curl http://localhost:5000/health
# Expected: { "status": "ok", "timestamp": "..." }
```

2. **Check API Welcome:**
```bash
curl http://localhost:5000/
# Expected: { "success": true, "message": "Welcome to the Reka Local API 🚀", "version": "1.0.0" }
```

3. **Test Frontend Connection:**
Visit `http://localhost:8443/api/health` in browser
Should show health check response

### Adding New Features

**Backend API Endpoint:**
```javascript
// In Backend/src/app.js
app.get("/api/your-endpoint", (req, res) => {
  res.json({ message: "Your response" });
});
```

**Frontend API Client:**
```typescript
// In src/api.ts
export async function getYourData() {
  return apiFetch("/your-endpoint");
}
```

**Frontend Component:**
```typescript
// In src/App.tsx
import { useFetch } from '@/hooks/useBackend';

function MyComponent() {
  const { data, isLoading, error } = useFetch('/api/your-endpoint');
  // Use data in component
}
```

---

## 📝 Database Migrations

### Create a New Migration
```bash
cd Backend
pnpm run prisma:migrate
# Follow prompts to name your migration
```

### View Database
```bash
cd Backend
pnpm run prisma:studio
# Opens Prisma Studio at http://localhost:5555
```

### Generate Prisma Client
```bash
cd Backend
pnpm run prisma:generate
```

---

## 🚀 Deployment

### Frontend to Figma Make
```bash
pnpm run build
figma make deploy --build-dir dist
```

### Backend to Cloud
1. Deploy Node.js server (Heroku, Vercel, DigitalOcean, etc.)
2. Set PostgreSQL database URL
3. Set environment variables (FRONTEND_URL, JWT_SECRET, etc.)
4. Update frontend VITE_API_URL to production backend

---

## 🐛 Troubleshooting

### Frontend won't connect to backend
- ✅ Check Backend is running on port 5000
- ✅ Check CORS is enabled (should be automatic)
- ✅ Check network tab in browser DevTools for request details

### Backend won't start
- ✅ Check Port 5000 is available: `lsof -i :5000` (macOS/Linux)
- ✅ Check Node.js is installed: `node --version`
- ✅ Check dependencies installed: `pnpm install`

### Database connection error
- ✅ Check PostgreSQL is running
- ✅ Verify DATABASE_URL in Backend/.env
- ✅ Check database exists: `psql -l` (if psql installed)

### Vite dev server not starting
- ✅ Check Port 8443 is available: `lsof -i :8443`
- ✅ Check node_modules exists: `pnpm install`
- ✅ Check pnpm/npm is installed: `pnpm --version`

---

## 📚 API Endpoints (Ready to Implement)

```
GET  /health              - Health check
GET  /                    - API info
GET  /api/vendors         - List vendors
GET  /api/vendors/:id     - Get vendor details
POST /api/auth/login      - User login
POST /api/auth/register   - User registration
GET  /api/orders          - List orders (implement)
POST /api/orders          - Create order (implement)
GET  /api/reviews         - List reviews (implement)
POST /api/reviews         - Create review (implement)
```

---

## ✨ Features Included

✅ **Complete Frontend**
- Beautiful landing page UI
- Responsive design with Tailwind CSS
- API client library with retry logic
- React hooks for data fetching

✅ **Ready-to-Go Backend**
- Express.js server setup
- CORS configured
- Prisma ORM with PostgreSQL
- Database schema with 7 models
- Environment configuration
- Health check endpoint

✅ **Developer Experience**
- Hot reload on both frontend & backend
- One-command setup
- Easy local development
- Comprehensive documentation
- Production-ready structure

---

## 🎯 Next Steps

1. ✅ Run `bash setup.sh`
2. ✅ Configure `Backend/.env` with your PostgreSQL URL
3. ✅ Run `bash dev-all.sh`
4. ✅ Open `http://localhost:8443`
5. ✅ Check `http://localhost:5000/health` to verify backend
6. ✅ Start building features!

---

## 📞 Support

- Check `README.md` for complete documentation
- Check `INTEGRATION_SUMMARY.md` for architecture details
- Check `Backend/README.md` for backend-specific info

**Everything is configured and ready to work!** 🎉
