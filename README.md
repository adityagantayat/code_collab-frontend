# code_collab-frontend

> **Interactive Single Page Application (SPA) for a developer-focused code collaboration platform.** Built with React 19, TypeScript, Vite, Redux Toolkit, and styled with Tailwind CSS v4 and DaisyUI.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Key Features](#key-features)
  - [1. Authentication & Session Hydration](#1-authentication--session-hydration)
  - [2. User Feed & Discovery](#2-user-feed--discovery)
  - [3. Profile Editing & Live Preview](#3-profile-editing--live-preview)
  - [4. Connections & Connection Requests](#4-connections--connection-requests)
  - [5. Centralized API Client](#5-centralized-api-client)
- [State Management (Redux Store)](#state-management-redux-store)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)

---

## Overview

`code_collab-frontend` is the web client for Code Collab. It allows software developers to discover other engineers, view profiles, send and review connection requests, and manage their personal technical portfolios.

The application connects to `code_collab-backend` (`http://localhost:3000`) and uses HTTP-only cookie-based authentication for secure session management.

---

## Tech Stack

| Layer | Technology | Version | Description |
|---|---|---|---|
| **Framework** | React | ^19.3.1 | Core UI library with modern hooks |
| **Language** | TypeScript | ~6.0.3 | Strict type definitions and safe contracts |
| **Build Tool** | Vite | ^8.3.4 | Fast HMR dev server and optimized bundling |
| **Routing** | React Router | ^7.18.4 | Declarative nested routing |
| **State Management** | Redux Toolkit & React-Redux | ^2.13.0 / ^9.3.0 | Centralized store with slice reducers |
| **Styling** | Tailwind CSS & DaisyUI | ^4.3.3 / ^5.7.50 | Utility-first CSS with dark-mode UI components |
| **HTTP Client** | Axios | ^1.20.0 | Promise-based HTTP client with credentials |
| **Linting** | ESLint | ^10.13.0 | Flat config with React Hooks & TS plugins |

---

## Project Architecture

The app follows a modular component-driven architecture:

* **Layout & Guard (`Body.tsx`)**: Wraps primary views, provides sticky navigation and footer, and performs on-mount session hydration (`/profile/view`).
* **Feature Components (`src/components/`)**: Self-contained UI components with local state and Redux dispatchers (`Feed`, `UserCard`, `EditProfile`, `Connections`, `ConnectionCard`, `Requests`).
* **Central Utilities (`src/utils/`)**: Shared types, Redux slices, and the Axios network wrapper.

---

## Key Features

### 1. Authentication & Session Hydration
* **Sign In (`Login.tsx`)**: Email and password authentication via `POST /auth/signin` with error handling and Redux dispatch.
* **Session Hydration (`Body.tsx`)**: On initial application mount, verifies existing session cookies against `GET /profile/view`. Unauthenticated users are redirected to `/login`, while authenticated sessions populate the Redux store.
* **Sign Out (`Navbar.tsx`)**: Calls `POST /auth/signout`, clears client-side Redux user state, and resets to `/login`.

### 2. User Feed & Discovery
* **Feed (`Feed.tsx`)**: Fetches recommended developer profiles via `GET /user/feed` and saves them in `feedSlice`.
* **User Card (`UserCard.tsx`)**: Rich card interface showing avatar, full name, age, gender, technical skills, and about description with *Ignore* and *Interested* action triggers.

### 3. Profile Editing & Live Preview
* **Form Controls (`EditProfile.tsx`)**: Two-column layout with first name, last name, age (blank placeholder by default, avoiding `0` fallback bugs), gender radio buttons (`Male`, `Female`, `Other`), about bio, skills list, and photo URL.
* **Reactive Dirty Tracking**: Computes `isFormChanged` against original user props to dynamically enable/disable the *Update* button when edits are present.
* **Live Preview Toggle**: Switches seamlessly between form editing and a rendered `<UserCard showButtons={false} />` to preview profile changes before submitting.
* **Toast Feedback**: DaisyUI floating toast alerts confirming successful updates (`PATCH /profile/edit`) or surfacing validation errors.

### 4. Connections & Connection Requests
* **Connections View (`Connections.tsx`)**: Fetches accepted connections from `GET /user/connections` and displays them via reusable `ConnectionCard` components.
* **Received Requests (`Requests.tsx`)**: Lists pending connection requests (`GET /user/requests/received`).
* **Review Actions**: Accept or Reject requests via `PATCH /requests/review/:status/:requestId`, triggering immediate real-time removal from the Redux `requestsSlice`.
* **Connection Card (`ConnectionCard.tsx`)**: Reusable horizontal card with avatar, profile summary, skills, and optional accept/reject buttons.

### 5. Centralized API Client
* **Helper (`src/utils/api.ts`)**: Standardized `apiCall(path, method, body)` helper using Axios.
* Enforces `withCredentials: true` across all requests to guarantee cookie propagation.
* Supports both uppercase and lowercase HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
* Automatically type-checks and re-throws errors so UI components can handle status codes.

---

## State Management (Redux Store)

The global store (`src/utils/appStore.ts`) combines four domain slices:

| Slice | File | Purpose | Key Actions |
|---|---|---|---|
| `user` | `userSlice.ts` | Authenticated user profile | `addUser`, `removeUser`, `updateUser` |
| `feed` | `feedSlice.ts` | User discovery cards | `setFeed` |
| `connections` | `connectionSlice.ts` | List of accepted connections | `setConnections`, `removeConnections`, `updateConnections` |
| `requests` | `requestsSlice.ts` | Pending incoming requests | `setRequests`, `removeRequests`, `updateRequests` |

---

## Directory Structure

```
src/
├── components/
│   ├── ConnectionCard.tsx  # Reusable horizontal card for connections & requests
│   ├── Connections.tsx     # Accepted connections screen
│   ├── EditProfile.tsx     # Profile editor with dirty state & live preview
│   ├── Feed.tsx            # Feed discovery container
│   ├── Footer.tsx          # App footer
│   ├── Login.tsx           # Sign-in card with validation & error handling
│   ├── Navbar.tsx          # App navigation bar with user dropdown & links
│   ├── Profile.tsx         # User profile wrapper
│   ├── Requests.tsx        # Received connection requests review screen
│   └── UserCard.tsx        # Vertical developer profile card
├── pages/
│   └── Body.tsx            # Main layout wrapper, routing outlet & session hydration
├── utils/
│   ├── api.ts              # Centralized Axios API request utility
│   ├── appStore.ts         # Redux Toolkit store configuration
│   ├── connectionSlice.ts  # Redux slice for accepted connections
│   ├── feedSlice.ts        # Redux slice for user feed
│   ├── requestsSlice.ts    # Redux slice for connection requests
│   ├── types.ts            # TypeScript interfaces (IFeed, User, etc.)
│   └── userSlice.ts        # Redux slice for authenticated user
├── App.css
├── App.tsx                 # Route definitions (<Routes>, <Route>)
├── constants.ts            # Global constants (BASE_URL = http://localhost:3000)
├── index.css               # Global Tailwind CSS imports
└── main.tsx                # App entry point with DOM mount
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Running instance of `code_collab-backend` on port `3000`

### Installation
```bash
# Clone the repository
git clone https://github.com/adityagantayat/code_collab-frontend.git
cd code_collab-frontend

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```

The frontend will run at **http://localhost:5173**.

---

## Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite local development server with HMR |
| `npm run build` | Runs TypeScript compilation (`tsc -b`) and Vite production build |
| `npm run lint` | Runs ESLint on all TypeScript and TSX files |
| `npm run preview` | Previews the production build locally |
