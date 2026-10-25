# Chakra Agent

<div align="center">
  <p><strong>Next-Gen Autonomous Multi-Agent Software Engineering Platform</strong></p>
  <p><em>Build, verify, monitor, and recover software with mathematical certainty using coordinated AI agents and isolated sandboxes.</em></p>

  <p>
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkavyaagarwal282007%2FChakra-Agent&env=GEMINI_API_KEY&envDescription=Your+Google+Gemini+API+Key">
      <img src="https://vercel.com/button" alt="Deploy with Vercel" />
    </a>
  </p>

  <p>
    <a href="#quickstart">Quickstart</a> •
    <a href="./readme/ARCHITECTURE.md">Architecture</a> •
    <a href="./readme/AGENT_SPEC.md">Agent Specs</a> •
    <a href="./readme/QUICKSTART.md">Development Guide</a> •
    <a href="./readme/CONTRIBUTING.md">Contributing</a>
  </p>
</div>

---

## ⚡ Overview

Conventional AI coding assistants generate raw code snippets and abandon you to debug missing dependencies, broken unit tests, and runtime race conditions.

**Chakra Agent** introduces closed-loop, test-driven autonomous engineering. When given a natural language prompt or issue ticket, specialized agents coordinate inside isolated ephemeral micro-VMs:

1. **Planner Agent** parses AST requirements and decomposes features into verified acceptance criteria.
2. **Coding Agent** synthesizes type-safe TypeScript AST patches.
3. **Sandbox QA Agent** runs unit & integration suites in isolated ephemeral containers.
4. **Recovery Agent** detects assertion failures (e.g., async clock skew, race conditions) and automatically repairs the AST in real time (<1s).
5. **Verifier Agent** audits security (OWASP Top 10) and signs a cryptographic Cosign / Sigstore release attestation.

```
USER REQUEST
     ↓
PLANNER AGENT
     ↓
CODING AGENT
     ↓
TESTING SANDBOX AGENT
     ↓
RECOVERY AGENT (Self-Healing Loop)
     ↓
VERIFIED RELEASE PR
```

---

## 📁 Repository Documentation (`/readme`)

Detailed technical documentation is organized in the [`/readme`](./readme) folder:

| Document | Description |
| :--- | :--- |
| [**Architecture (`readme/ARCHITECTURE.md`)**](./readme/ARCHITECTURE.md) | Multi-agent mesh topology, agent roles, and data bus pipeline |
| [**Agent Specs (`readme/AGENT_SPEC.md`)**](./readme/AGENT_SPEC.md) | Input/output contracts, AST mutation schemas, and Cosign attestation formats |
| [**Quickstart Guide (`readme/QUICKSTART.md`)**](./readme/QUICKSTART.md) | Local development setup, scripts, and repository directory structure |
| [**Contributing (`readme/CONTRIBUTING.md`)**](./readme/CONTRIBUTING.md) | Contribution standards, zero-pill design rules, and PR guidelines |

---

## 🚀 Quickstart

### Full-Stack Quickstart

#### 1. Backend Setup (FastAPI & Google GenAI Agent Swarm)
```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Add your GEMINI_API_KEY in .env

python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

#### 2. Frontend Setup (3D Spatial Command Dashboard)
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to launch the 3D Spatial Agent dashboard and trigger the live multi-agent swarm.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + Custom Design System
- **Typography**: Plus Jakarta Sans & JetBrains Mono
- **Bundler**: [Vite](https://vitejs.dev)
- **Icons**: Material Symbols Outlined
- **Animations**: CSS Transitions & Motion

---

## 📜 License

Distributed under the Apache-2.0 License. See `LICENSE` for more information.
