# React Express TypeScript Boilerplate

A full-stack boilerplate project with React.js frontend and Express.js backend, with full TypeScript support alongside JavaScript compatibility.

## Features

- **Frontend**: React.js with TypeScript support and modern styling
- **Backend**: Express.js server with TypeScript support and CORS enabled
- **TypeScript**: Full TypeScript support with type definitions for both frontend and backend
- **JavaScript Compatibility**: Can run with both TypeScript and JavaScript files
- **API Integration**: Frontend communicates with backend via REST API with typed responses
- **Interactive UI**: "Hi" button that displays "Hello World" message from the backend
- **Type Safety**: Shared type definitions between frontend and backend

## Project Structure

```
boilerplate/
├── frontend/              # React.js frontend with TypeScript
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.tsx        # Main React component (TypeScript)
│   │   ├── App.css        # Component styles
│   │   ├── index.tsx      # React entry point (TypeScript)
│   │   ├── index.css      # Global styles
│   │   └── types/
│   │       └── api.ts     # Frontend type definitions
│   ├── tsconfig.json      # TypeScript configuration
│   └── package.json
├── backend/               # Express.js backend with TypeScript
│   ├── src/
│   │   └── types/
│   │       └── index.ts   # Backend type definitions
│   ├── server.ts          # Express server (TypeScript)
│   ├── tsconfig.json      # TypeScript configuration
│   └── package.json
├── shared-types/          # Shared type definitions
│   └── index.ts
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation & Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## Running the Application

### Default: Run with TypeScript

**Terminal 1 - Backend Server (TypeScript):**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5001`

**Terminal 2 - Frontend Server (TypeScript):**
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

### Alternative: Build and Run Compiled JavaScript

**Build TypeScript Backend:**
```bash
cd backend
npm run build
npm run start:js
```

**Frontend (auto-compiles TypeScript):**
```bash
cd frontend
npm start
```

## How It Works

1. The React frontend displays a "Hi" button
2. When clicked, the button makes a GET request to `/api/hello` on the backend
3. The Express backend responds with `{"message": "Hello World!"}`
4. The frontend displays the message below the button

## API Endpoints

- `GET /api/hello` - Returns "Hello World!" message
- `GET /api/health` - Health check endpoint

## Development

- The frontend is configured with a proxy to `http://localhost:5000` for API calls
- CORS is enabled on the backend to allow frontend requests
- Both servers support hot reloading in development mode

## Technologies Used

### Frontend
- React 18.2.0 with TypeScript support
- React Scripts 5.0.1
- TypeScript 5.2.2
- CSS3 with modern features (gradients, animations, flexbox)

### Backend
- Express 4.18.2 with TypeScript support
- TypeScript 5.2.2
- CORS 2.8.5
- Node.js
- ts-node for TypeScript execution

### Type Safety
- Shared type definitions between frontend and backend
- Strict TypeScript configuration
- Type-safe API responses
- React component type definitions

## Customization

### TypeScript Files
- Modify `frontend/src/App.tsx` to change the React component behavior
- Update `backend/server.ts` to add new API endpoints
- Add new types in `frontend/src/types/api.ts` and `backend/src/types/index.ts`
- Use shared types from `shared-types/index.ts`

### Styling
- Customize styles in `frontend/src/App.css` and `frontend/src/index.css`

### TypeScript Configuration
- Frontend: `frontend/tsconfig.json`
- Backend: `backend/tsconfig.json`

## Troubleshooting

- Ensure both servers are running on different ports (3000 and 5001)
- Check that all dependencies are installed correctly
- Verify that the backend is running before testing the frontend
- Check browser console for any error messages

### TypeScript Issues
- Run `npm run build` in backend to check for TypeScript compilation errors
- Ensure all type definitions are properly imported
- Check `tsconfig.json` files for proper configuration
- Use `npm run dev:ts` for TypeScript development mode

### Port Configuration
- Backend runs on port 5001 (updated from 5000)
- Frontend proxy is configured for `http://localhost:5001`
- Update proxy in `frontend/package.json` if changing backend port
