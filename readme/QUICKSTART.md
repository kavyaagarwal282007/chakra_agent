# Quickstart & Local Development

This guide covers setting up, running, testing, and building the Chakra Agent platform locally.

---

## Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Package Manager**: `npm` (v9+) or `bun` / `pnpm`

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/chakra-agent.git
   cd chakra-agent
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Variables reference:
   - `GEMINI_API_KEY`: Required for server-side AI reasoning & code mutation.
   - `APP_URL`: Base URL where the applet runs (defaults to `http://localhost:3000`).

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite dev server with hot reload on port `3000` |
| `npm run build` | Builds optimized production bundle to `/dist` |
| `npm run lint` | Runs `tsc --noEmit` to validate TypeScript types |
| `npm run preview` | Previews the production build locally |

---

## Project Structure

```
.
├── index.html                  # HTML entry point with Plus Jakarta Sans & typography
├── metadata.json               # Applet capability flags & metadata
├── package.json                # Project dependencies and npm scripts
├── public/                     # Static assets and media files
│   └── assets/aistudio/        # Graphic references & preview mockups
├── readme/                     # GitHub documentation folder
│   ├── ARCHITECTURE.md         # Multi-agent mesh topology & closed-loop flow
│   ├── AGENT_SPEC.md           # Sub-agent contracts, schemas, and attestations
│   ├── QUICKSTART.md           # Setup, running, and development guide
│   └── CONTRIBUTING.md         # Contribution workflow & style guide
├── src/
│   ├── components/
│   │   ├── ChakraLogo.tsx              # Standardized concentric orbital gyro logo
│   │   ├── Header.tsx                  # Responsive glassmorphism global header
│   │   ├── BottomNav.tsx               # Touch-friendly handheld navigation bar
│   │   ├── LandingPage.tsx             # Interactive landing hero, pipeline & sandbox
│   │   ├── LiveAgentMeshHero.tsx       # Real-time multi-agent mesh topology
│   │   ├── AgentWorkflowPipeline.tsx   # 6-stage interactive pipeline flow
│   │   ├── BuildVerifyRecoverFlow.tsx  # Self-healing AST cycle visualization
│   │   ├── ProjectsScreen.tsx          # Engineering projects directory
│   │   ├── WorkspaceScreen.tsx         # Autonomous build canvas & AST telemetry
│   │   ├── ReviewReleaseScreen.tsx     # Release gate review & agent attestations
│   │   ├── AuthScreen.tsx              # Developer authentication screen
│   │   ├── DiffModal.tsx               # Code diff viewer modal
│   │   ├── NewProjectModal.tsx         # Project creation modal
│   │   ├── ConfirmationModal.tsx       # Release sign-off confirmation dialog
│   │   └── NotificationDrawer.tsx      # System alerts & activity notifications
│   ├── data/
│   │   └── mockData.ts         # Initial project records, tests, and assets
│   ├── types.ts                # TypeScript interfaces (Project, ScreenType, etc.)
│   ├── index.css               # Tailwind CSS theme tokens & base variables
│   ├── main.tsx                # React 19 root entry
│   └── App.tsx                 # Core state machine & responsive viewport shell
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite & Tailwind CSS plugins configuration
```
