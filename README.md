# UNIVOCHAT — Social Network

A full-stack social networking application with real-time chat, posts, and social graph visualization.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express, TypeScript, Socket.IO |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (Google OAuth + Credentials) |
| Storage | Cloudflare R2 (S3-compatible) |
| State | Recoil |
| Graph | Cytoscape.js |
| Deploy | Vercel, Docker |

## Features

- **Authentication** — Google OAuth and email/password sign-in
- **Profiles** — Custom username and profile picture
- **Posts** — Create, like, comment, and delete image/text posts
- **Friends** — Send, accept, and manage friend requests with suggestions
- **Real-time Chat** — One-on-one messaging via Socket.IO with inbox and unread tracking
- **Social Graph** — Interactive visualization of your friend network
- **Online Status** — See friends' online/offline status in real time

## Directory Structure

```
├── backend/          Express API + Socket.IO server + Prisma
│   ├── prisma/       Schema and migrations
│   └── src/          Controllers, routes, middleware, utils
├── frontend/         Next.js app (App Router)
│   └── src/
│       ├── app/      Pages, components, layout
│       └── lib/      Auth config, utilities
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudflare R2 bucket (or S3-compatible storage)
- Google OAuth credentials

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/blackberry?schema=public"
R2_ACCESS_KEY_ID="your-r2-key"
R2_SECRET_ACCESS_KEY="your-r2-secret"
R2_ENDPOINT="https://<account-id>.r2.cloudflarestorage.com"
```

```bash
npx prisma generate
npx prisma migrate deploy
npm run dev
```

The backend starts on **port 3000**.

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_WEBSOCKET_URL=ws://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-nextauth-secret
```

```bash
npm run dev
```

The frontend runs on **port 3001**. Open [http://localhost:3001](http://localhost:3001).

### Docker (Frontend only)

```bash
cd frontend
docker build -t univo-frontend .
docker run -p 3000:3000 univo-frontend
```

## API Overview

Backend routes are served from `http://localhost:3000`:

| Route | Purpose |
|---|---|
| `/users` | Profile CRUD |
| `/posts` | Posts, likes |
| `/comments` | Comments on posts |
| `/friends` | Requests, accept, search |
| `/messages` | Chat history, inbox, mark read |
| `/graph` | Social graph data |
| `/uploads` | Static file serving |

## Database

8 models — User, FriendRequest, Friend, Chat, ChatReadState, Post, Comment, Like. Managed via Prisma with PostgreSQL.
