import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles,
  Code2,
  GitBranch,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Terminal,
  Cpu,
  Layers,
  FileCode,
  GitPullRequest,
  Activity,
  Lock,
  Unlock,
  ArrowRight,
  Copy,
  Check,
  Download,
  Search,
  RefreshCw,
  Eye,
  Zap,
  Box,
  Compass,
  Award,
  ChevronRight,
  FolderGit2,
  FileText,
  Sliders,
  HelpCircle
} from 'lucide-react';
import { fetchStatus, triggerPasswordResetDemo } from './api';

// ============================================================================
// DEFAULT PRESETS & FALLBACK SIMULATION DATA (Guarantees 100% Reliability)
// ============================================================================
const PRESET_SCENARIOS = [
  {
    id: 'password-reset',
    title: 'Secure Password Reset + Rate Limiting',
    badge: 'Auth & Security',
    prompt: 'Build a production-grade Password Reset service in Python FastAPI with cryptographic reset tokens, strict 15-minute expiration, single-use token invalidation, and Redis IP rate-limiting.',
    language: 'python'
  },
  {
    id: 'stripe-webhook',
    title: 'Idempotent Payment Webhook Engine',
    badge: 'FinTech Core',
    prompt: 'Create a fault-tolerant Stripe Webhook payment processor in TypeScript/Node.js that verifies HMAC signatures, prevents replay attacks, and uses database transaction locks to prevent double-crediting user wallets.',
    language: 'typescript'
  },
  {
    id: 'rag-document-acl',
    title: 'Multi-Tenant AI Vector Search with ACL',
    badge: 'Enterprise AI',
    prompt: 'Implement a multi-tenant RAG document retrieval endpoint in Python that enforces strict tenant_id isolation, sanitizes prompt injection payloads, and filters vector embeddings by user role permissions.',
    language: 'python'
  }
];

const SAMPLE_GITHUB_FILES = [
  {
    path: 'src/auth/password_reset.py',
    language: 'python',
    size: '2.4 KB',
    content: `import hashlib
import time
from fastapi import APIRouter, HTTPException

router = APIRouter()
RESET_TOKENS = {}  # token -> user_email

@router.post("/auth/request-reset")
async def request_password_reset(email: str):
    # Generate token based on email and timestamp
    raw = f"{email}-{int(time.time())}"
    token = hashlib.sha256(raw.encode()).hexdigest()
    RESET_TOKENS[token] = {"email": email, "created_at": time.time()}
    return {"status": "sent", "token": token}

@router.post("/auth/confirm-reset")
async def confirm_password_reset(token: str, new_password: str):
    record = RESET_TOKENS.get(token)
    if not record:
        raise HTTPException(status_code=400, detail="Invalid token")
    # Update user password in database
    update_user_password(record["email"], new_password)
    return {"status": "password_updated"}`
  },
  {
    path: 'src/payments/webhook_handler.ts',
    language: 'typescript',
    size: '1.9 KB',
    content: `import express from 'express';
const app = express();

app.post('/webhooks/payment', async (req, res) => {
  const event = req.body;
  if (event.type === 'payment_intent.succeeded') {
    const { userId, amount } = event.data.object.metadata;
    await db.wallets.incrementBalance(userId, amount);
  }
  res.json({ received: true });
});`
  }
];

function buildFallbackArtifact(inputMode, userPrompt, userCode, repoInfo) {
  const isCodeMode = inputMode === 'code' || inputMode === 'github';
  const subjectTitle =
    inputMode === 'github'
      ? `Repo Audit & Hardening: ${repoInfo.name || 'selected module'}`
      : inputMode === 'code'
      ? 'Custom Source Code Verification & Auto-Healing'
      : userPrompt.slice(0, 68) || 'Secure Password Reset Service';

  return {
    projectTitle: subjectTitle,
    requirement: {
      id: 'REQ-204',
      title: subjectTitle,
      userStory: isCodeMode
        ? 'As a Principal Engineer, I want my existing implementation audited against concurrency, replay, and injection edge cases so that vulnerabilities are automatically patched before release.'
        : `As an end user, I need "${userPrompt.slice(0, 95)}" implemented with strict cryptographic verification, atomic state transitions, and zero regression risk.`,
      acceptanceCriteria: [
        'AC-1: Cryptographic tokens/requests must enforce strict TTL expiration (<= 900s) and high-entropy CSPRNG generation.',
        'AC-2: State-mutating operations must be atomic and strictly single-use (idempotent lock) to prevent race-condition replay.',
        'AC-3: Endpoint must enforce rate-limiting and input validation with zero sensitive data leakage.'
      ],
      affectedFiles: ['src/core/service_handler.py', 'tests/test_edge_cases.py', 'security/audit_policy.yaml']
    },
    architectureSummary:
      'Layered Zero-Trust Service Architecture with Redis Atomic Mutex Locks, CSPRNG Token Authority, and Automated Regression Harness.',
    v1Code:
      isCodeMode && userCode.trim().length > 20
        ? userCode
        : `import hashlib
import time
from fastapi import APIRouter, HTTPException

router = APIRouter()
# v1 Implementation generated by Engineering Agent
TOKEN_STORE = {}

@router.post("/api/v1/execute-action")
async def request_token(email: str):
    # Predictable SHA256 timestamp token
    raw = f"{email}:{int(time.time())}"
    token = hashlib.sha256(raw.encode()).hexdigest()
    TOKEN_STORE[token] = {"email": email, "issued_at": time.time()}
    return {"token": token, "status": "issued"}

@router.post("/api/v1/verify-and-commit")
async def verify_and_commit(token: str, payload: str):
    session = TOKEN_STORE.get(token)
    if not session:
        raise HTTPException(status_code=401, detail="Invalid token")
    # BUG: Missing TTL expiration check & token is not invalidated after use!
    return {"status": "committed", "user": session["email"]}`,
    initialTests: [
      { id: 'TST-01', name: 'test_happy_path_execution', category: 'Unit', v1Status: 'PASS', v2Status: 'PASS', durationMs: 14 },
      { id: 'TST-02', name: 'test_malformed_payload_rejection', category: 'Negative', v1Status: 'PASS', v2Status: 'PASS', durationMs: 19 },
      { id: 'TST-03', name: 'test_token_expiration_ttl_boundary', category: 'Edge Case', v1Status: 'FAIL', v2Status: 'PASS', durationMs: 42 },
      { id: 'TST-04', name: 'test_concurrent_replay_race_condition', category: 'Security / Chaos', v1Status: 'FAIL', v2Status: 'PASS', durationMs: 67 },
      { id: 'TST-05', name: 'test_csprng_entropy_ unpredictability', category: 'Security', v1Status: 'FAIL', v2Status: 'PASS', durationMs: 31 },
      { id: 'TST-06', name: 'test_regression_existing_auth_routes', category: 'Regression', v1Status: 'PASS', v2Status: 'PASS', durationMs: 23 }
    ],
    diagnosis: {
      incidentId: 'INC-8842',
      component: 'src/core/service_handler.py :: verify_and_commit()',
      severity: 'CRITICAL (CVSS 8.6)',
      rootCause:
        '1) Predictable timestamp-seeded SHA256 digest enables brute-force token prediction. 2) Missing TTL timestamp delta validation allows expired tokens indefinitely. 3) Lack of atomic pop/lock allows concurrent replay attacks.',
      suggestedFix:
        'Replace hashlib timestamp seed with secrets.token_urlsafe(32), enforce strict 900-second TTL window check, and use atomic single-use consumption with constant-time comparison.'
    },
    diffLines: [
      { type: 'context', text: 'import time' },
      { type: 'remove', text: 'import hashlib' },
      { type: 'add', text: 'import secrets' },
      { type: 'add', text: 'import hmac' },
      { type: 'add', text: 'from threading import Lock' },
      { type: 'context', text: 'from fastapi import APIRouter, HTTPException' },
      { type: 'add', text: 'TOKEN_MUTEX = Lock()' },
      { type: 'add', text: 'TOKEN_TTL_SECONDS = 900  # Strict 15-minute window' },
      { type: 'context', text: '' },
      { type: 'remove', text: '    raw = f"{email}:{int(time.time())}"' },
      { type: 'remove', text: '    token = hashlib.sha256(raw.encode()).hexdigest()' },
      { type: 'add', text: '    token = secrets.token_urlsafe(32)  # CSPRNG 256-bit entropy' },
      { type: 'context', text: '' },
      { type: 'remove', text: '    session = TOKEN_STORE.get(token)' },
      { type: 'add', text: '    with TOKEN_MUTEX:  # Atomic single-use token consumption' },
      { type: 'add', text: '        session = TOKEN_STORE.pop(token, None)' },
      { type: 'context', text: '    if not session:' },
      { type: 'context', text: '        raise HTTPException(status_code=401, detail="Invalid or already consumed token")' },
      { type: 'add', text: '    if (time.time() - session["issued_at"]) > TOKEN_TTL_SECONDS:' },
      { type: 'add', text: '        raise HTTPException(status_code=403, detail="Token expired (TTL exceeded)")' }
    ],
    v2Code: `import secrets
import hmac
import time
from threading import Lock
from fastapi import APIRouter, HTTPException

router = APIRouter()
# v2 Self-Healed & Verified Implementation (Patched by Chakra Engineering Agent)
TOKEN_STORE = {}
TOKEN_MUTEX = Lock()
TOKEN_TTL_SECONDS = 900  # Strict 15-minute expiration policy

@router.post("/api/v1/execute-action")
async def request_token(email: str):
    if not email or "@" not in email:
        raise HTTPException(status_code=422, detail="Invalid email identity")
    # High-entropy CSPRNG token prevents prediction attacks
    token = secrets.token_urlsafe(32)
    with TOKEN_MUTEX:
        TOKEN_STORE[token] = {
            "email": email.strip().lower(),
            "issued_at": time.time(),
            "nonce": secrets.token_hex(8)
        }
    return {"token": token, "expires_in": TOKEN_TTL_SECONDS, "status": "issued"}

@router.post("/api/v1/verify-and-commit")
async def verify_and_commit(token: str, payload: str):
    # Atomic pop guarantees single-use and blocks concurrent race replay
    with TOKEN_MUTEX:
        session = TOKEN_STORE.pop(token, None)
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or already consumed token")
    if (time.time() - session["issued_at"]) > TOKEN_TTL_SECONDS:
        raise HTTPException(status_code=403, detail="Token expired (TTL exceeded)")
    if len(payload) < 12:
        raise HTTPException(status_code=400, detail="Payload fails minimum security policy")
    return {
        "status": "committed_verified",
        "user": session["email"],
        "verification_gate": "PASSED"
    }`,
    securityMetrics: {
      v1Cvss: 8.6,
      v2Cvss: 0.0,
      owaspCategory: 'A07:2021 - Identification and Authentication Failures',
      secretsLeaked: 0,
      testCoveragePct: 98.4
    }
  };
}

// ============================================================================
// 3D INTERACTIVE SPATIAL ORBITAL CORE (HTML5 3D WebGL-Style Projection Canvas)
// ============================================================================
const Interactive3DCore = ({ agents, pipelineStage, selectedAgentId, onSelectAgent }) => {
  const canvasRef = useRef(null);
  const rotationRef = useRef({ x: 0.32, y: 0.55 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const pulseParticlesRef = useRef([]);

  // Spawn 3D energy particles between nodes
  useEffect(() => {
    const pts = [];
    for (let i = 0; i < 38; i++) {
      pts.push({
        fromIdx: i % 5,
        toIdx: (i + 1) % 5,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
        orbitCore: i % 3 === 0
      });
    }
    pulseParticlesRef.current = pts;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const statusPalette = {
      STANDBY: { main: '#64748B', glow: 'rgba(100, 116, 139, 0.25)', bg: '#F8FAFC' },
      BUILDING: { main: '#2563EB', glow: 'rgba(37, 99, 235, 0.35)', bg: '#EFF6FF' },
      FAIL: { main: '#E11D48', glow: 'rgba(225, 29, 72, 0.45)', bg: '#FFF1F2' },
      DIAGNOSING: { main: '#D97706', glow: 'rgba(217, 119, 6, 0.4)', bg: '#FFFBEB' },
      PASSED: { main: '#059669', glow: 'rgba(5, 150, 105, 0.38)', bg: '#ECFDF5' }
    };

    const project3D = (x, y, z, width, height) => {
      // Rotate around Y
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotate around X
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const fov = 520;
      const distance = 620;
      const scale = fov / (distance + z2);
      return {
        x: width / 2 + x1 * scale,
        y: height / 2 + y2 * scale,
        z: z2,
        scale
      };
    };

    const render = () => {
      time += 0.016;
      if (!isDraggingRef.current) {
        rotationRef.current.y += 0.0045;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      // Subtle holographic background grid rings
      const center = project3D(0, 0, 0, width, height);
      const coreColor =
        pipelineStage === 'FAIL'
          ? '#E11D48'
          : pipelineStage === 'RECOVER'
          ? '#D97706'
          : pipelineStage === 'PASSED' || pipelineStage === 'RELEASED'
          ? '#059669'
          : '#2563EB';

      // Draw 3D latitude/longitude orbital rings
      const ringRadii = [155, 210];
      ringRadii.forEach((radius, rIdx) => {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.12) {
          const rx = Math.cos(a) * radius;
          const ry = rIdx === 0 ? Math.sin(a * 2) * 28 : Math.sin(a) * 45;
          const rz = Math.sin(a) * radius;
          const p = project3D(rx, ry, rz, width, height);
          if (a === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = rIdx === 0 ? 'rgba(37, 99, 235, 0.16)' : 'rgba(14, 165, 233, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Compute 3D positions of the 5 specialized agents
      const orbitRadius = Math.min(width, height) * 0.34 + 35;
      const node3DCoords = agents.map((ag, idx) => {
        const angle = (idx / agents.length) * Math.PI * 2 + time * 0.15;
        const yWave = Math.sin(time * 1.4 + idx * 1.3) * 26;
        const x = Math.cos(angle) * orbitRadius;
        const z = Math.sin(angle) * orbitRadius;
        const proj = project3D(x, yWave, z, width, height);
        return { ...ag, x, y: yWave, z, proj, idx };
      });

      // Draw energy beams from each node to the central Verification Core and adjacent nodes
      node3DCoords.forEach((node, i) => {
        const nextNode = node3DCoords[(i + 1) % node3DCoords.length];
        // Spoke to center
        const grad = ctx.createLinearGradient(center.x, center.y, node.proj.x, node.proj.y);
        grad.addColorStop(0, `${coreColor}44`);
        grad.addColorStop(1, `${statusPalette[node.state]?.main || '#2563EB'}55`);
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(node.proj.x, node.proj.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.75;
        ctx.stroke();

        // Outer ring connection
        ctx.beginPath();
        ctx.moveTo(node.proj.x, node.proj.y);
        ctx.lineTo(nextNode.proj.x, nextNode.proj.y);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.18)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Draw streaming 3D telemetry particles
      pulseParticlesRef.current.forEach((pt) => {
        pt.progress += pt.speed * (pipelineStage === 'IDLE' ? 0.5 : 1.7);
        if (pt.progress > 1) pt.progress = 0;

        const fromNode = node3DCoords[pt.fromIdx];
        const toNode = node3DCoords[pt.toIdx];
        if (!fromNode || !toNode) return;

        const sx = pt.orbitCore ? 0 : fromNode.x;
        const sy = pt.orbitCore ? 0 : fromNode.y;
        const sz = pt.orbitCore ? 0 : fromNode.z;

        const px = sx + (toNode.x - sx) * pt.progress;
        const py = sy + (toNode.y - sy) * pt.progress;
        const pz = sz + (toNode.z - sz) * pt.progress;
        const proj = project3D(px, py, pz, width, height);

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.max(2, 4.2 * proj.scale), 0, Math.PI * 2);
        ctx.fillStyle = coreColor;
        ctx.shadowColor = coreColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Sort 3D elements back-to-front by Z depth
      const renderQueue = [
        ...node3DCoords.map((n) => ({ type: 'AGENT', data: n, z: n.proj.z })),
        { type: 'CORE', z: center.z }
      ].sort((a, b) => b.z - a.z);

      renderQueue.forEach((item) => {
        if (item.type === 'CORE') {
          // Central 3D Verification Core Sphere
          const pulse = 1 + Math.sin(time * 3.2) * 0.07;
          const coreR = 36 * center.scale * pulse;

          // Outer Halo
          const halo = ctx.createRadialGradient(
            center.x,
            center.y,
            coreR * 0.2,
            center.x,
            center.y,
            coreR * 2.4
          );
          halo.addColorStop(0, `${coreColor}40`);
          halo.addColorStop(0.6, `${coreColor}12`);
          halo.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.beginPath();
          ctx.arc(center.x, center.y, coreR * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();

          // Pearlescent 3D Core Sphere
          const sphereGrad = ctx.createRadialGradient(
            center.x - coreR * 0.3,
            center.y - coreR * 0.3,
            coreR * 0.1,
            center.x,
            center.y,
            coreR
          );
          sphereGrad.addColorStop(0, '#FFFFFF');
          sphereGrad.addColorStop(0.45, '#F0F9FF');
          sphereGrad.addColorStop(1, coreColor);

          ctx.beginPath();
          ctx.arc(center.x, center.y, coreR, 0, Math.PI * 2);
          ctx.fillStyle = sphereGrad;
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#FFFFFF';
          ctx.stroke();

          // Core Label
          ctx.font = '700 10px Inter, system-ui, sans-serif';
          ctx.fillStyle = '#0F172A';
          ctx.textAlign = 'center';
          ctx.fillText('CHAKRA CORE', center.x, center.y - 2);
          ctx.font = '600 9px Inter, system-ui, sans-serif';
          ctx.fillStyle = coreColor;
          ctx.fillText(pipelineStage, center.x, center.y + 10);
        } else {
          const n = item.data;
          const palette = statusPalette[n.state] || statusPalette.STANDBY;
          const isSelected = selectedAgentId === n.id;
          const r = (isSelected ? 27 : 22) * n.proj.scale;

          // Glow ring
          const g = ctx.createRadialGradient(n.proj.x, n.proj.y, r * 0.2, n.proj.x, n.proj.y, r * 2.1);
          g.addColorStop(0, palette.glow);
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.beginPath();
          ctx.arc(n.proj.x, n.proj.y, r * 2.1, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();

          // 3D Glass Orb for Agent
          const orbGrad = ctx.createRadialGradient(
            n.proj.x - r * 0.35,
            n.proj.y - r * 0.35,
            r * 0.1,
            n.proj.x,
            n.proj.y,
            r
          );
          orbGrad.addColorStop(0, '#FFFFFF');
          orbGrad.addColorStop(0.55, palette.bg);
          orbGrad.addColorStop(1, palette.main);

          ctx.beginPath();
          ctx.arc(n.proj.x, n.proj.y, r, 0, Math.PI * 2);
          ctx.fillStyle = orbGrad;
          ctx.fill();
          ctx.lineWidth = isSelected ? 3 : 2;
          ctx.strokeStyle = isSelected ? palette.main : '#FFFFFF';
          ctx.stroke();

          // Agent Badge Pill below 3D Orb
          const pillW = 108 * n.proj.scale;
          const pillH = 24 * n.proj.scale;
          const pillX = n.proj.x - pillW / 2;
          const pillY = n.proj.y + r + 6;

          ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
          ctx.beginPath();
          ctx.roundRect(pillX, pillY, pillW, pillH, 8);
          ctx.fill();
          ctx.strokeStyle = `${palette.main}55`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.font = `700 ${Math.max(9, Math.round(10 * n.proj.scale))}px Inter, system-ui, sans-serif`;
          ctx.fillStyle = '#0F172A';
          ctx.textAlign = 'center';
          ctx.fillText(n.shortName, n.proj.x, pillY + pillH * 0.55);

          // Store projected screen coords for click detection
          n.screenX = n.proj.x;
          n.screenY = n.proj.y;
          n.screenR = r + 14;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      lastMouseRef.current = { x: cx, y: cy };
    };

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      if (isDraggingRef.current) {
        const dx = cx - lastMouseRef.current.x;
        const dy = cy - lastMouseRef.current.y;
        rotationRef.current.y += dx * 0.007;
        rotationRef.current.x = Math.max(-0.8, Math.min(0.8, rotationRef.current.x + dy * 0.007));
        lastMouseRef.current = { x: cx, y: cy };
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [agents, pipelineStage, selectedAgentId]);

  return (
    <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-sky-50/90 via-white to-indigo-50/80 border border-white shadow-[0_20px_50px_rgba(37,99,235,0.08)] select-none">
      {/* Subtle Holographic Grid Backdrop */}
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.22), transparent 45%), radial-gradient(circle at 80% 75%, rgba(99, 102, 241, 0.18), transparent 50%)'
        }}
      />
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top-Left Overlay HUD */}
      <div className="absolute top-3.5 left-4 flex items-center gap-2 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
        <span className="text-[11px] font-bold tracking-wider uppercase text-slate-700">
          3D Spatial Agent Topology • Drag to Rotate
        </span>
      </div>

      {/* Bottom Agent Quick-Select Pills */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-center gap-1.5">
        {agents.map((ag) => {
          const active = selectedAgentId === ag.id;
          const dotColor =
            ag.state === 'FAIL'
              ? 'bg-rose-500'
              : ag.state === 'DIAGNOSING'
              ? 'bg-amber-500'
              : ag.state === 'PASSED'
              ? 'bg-emerald-500'
              : ag.state === 'BUILDING'
              ? 'bg-blue-600'
              : 'bg-slate-400';
          return (
            <button
              key={ag.id}
              onClick={() => onSelectAgent(ag.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                active
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                  : 'bg-white/85 text-slate-700 border-slate-200/90 hover:bg-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${dotColor}`} />
              {ag.shortName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN CHAKRA AGENT SPATIAL APPLICATION
// ============================================================================
export default function App() {
  // Input Mode State ('prompt' | 'code' | 'github')
  const [inputMode, setInputMode] = useState('prompt');
  const [userPrompt, setUserPrompt] = useState(PRESET_SCENARIOS[0].prompt);
  const [userCode, setUserCode] = useState(SAMPLE_GITHUB_FILES[0].content);
  const [githubUrl, setGithubUrl] = useState('https://github.com/tiangolo/fastapi');
  const [repoInfo, setRepoInfo] = useState({
    name: 'tiangolo/fastapi',
    stars: '78.4k',
    branch: 'master',
    loaded: true,
    files: SAMPLE_GITHUB_FILES
  });
  const [selectedRepoFileIdx, setSelectedRepoFileIdx] = useState(0);
  const [isFetchingRepo, setIsFetchingRepo] = useState(false);
  const [forceRecoveryDemo, setForceRecoveryDemo] = useState(true);

  // Active Navigation View
  const [activeTab, setActiveTab] = useState('command'); // 'command' | 'recovery' | 'graph' | 'release'
  const [selectedAgentId, setSelectedAgentId] = useState('qa');
  const [selectedGraphNode, setSelectedGraphNode] = useState('REQ');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showAntigravityModal, setShowAntigravityModal] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Multi-Agent Pipeline Execution State
  // Stages: 'IDLE' | 'BUILD' | 'FAIL' | 'RECOVER' | 'PASSED' | 'RELEASED'
  const [pipelineStage, setPipelineStage] = useState('IDLE');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [releaseApproved, setReleaseApproved] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [backendAgentsData, setBackendAgentsData] = useState([]);

  // Dynamic Artifact generated by Gemini API (or structured fallback)
  const [artifact, setArtifact] = useState(() =>
    buildFallbackArtifact('prompt', PRESET_SCENARIOS[0].prompt, '', { name: 'tiangolo/fastapi' })
  );

  // Live Terminal Logs
  const [logs, setLogs] = useState([
    {
      time: '17:40:01',
      agent: 'SYSTEM',
      level: 'INFO',
      text: 'Chakra Spatial Multi-Agent Orchestrator v3.0 initialized. Ready for Build → Verify → Recover loop.'
    }
  ]);
  const terminalContainerRef = useRef(null);

  // Keep the main browser window at the top on initial mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-scroll only the internal terminal logs container, never the main window
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // ==========================================================================
  // LIVE POLLING HOOK: Connects /api/status to the 3D Command Center & Code Lab
  // ==========================================================================
  useEffect(() => {
    let isMounted = true;

    const pollStatus = async () => {
      const data = await fetchStatus();
      if (!isMounted) return;

      if (data) {
        setBackendConnected(true);

        // Map backend current_step (0-5) to pipelineStage
        const stepToStage = ['IDLE', 'BUILD', 'FAIL', 'RECOVER', 'PASSED', 'RELEASED'];
        if (typeof data.current_step === 'number') {
          const mappedStage = stepToStage[data.current_step] || 'IDLE';
          setPipelineStage(mappedStage);
          setCurrentStepIndex(data.current_step === 5 ? 4 : data.current_step);

          if (data.current_step === 5) {
            setReleaseApproved(true);
          }
        }

        setIsRunning(Boolean(data.simulation_running));

        if (Array.isArray(data.agents)) {
          setBackendAgentsData(data.agents);
        }

        // Live logs from FastAPI backend
        if (Array.isArray(data.terminal_logs) && data.terminal_logs.length > 0) {
          setLogs(
            data.terminal_logs.map((l) => ({
              time: l.time || '17:40:00',
              agent: l.agent || 'AGENT',
              level: l.level || 'INFO',
              text: l.message || l.text || '',
              type: l.type,
              fileName: l.fileName,
              diffStats: l.diffStats,
              diffLines: l.diffLines
            }))
          );

          // If backend provided a diff line in Step 3, update artifact diff
          const diffLog = data.terminal_logs.find((l) => l.type === 'diff' && l.diffLines);
          if (diffLog && diffLog.diffLines) {
            setArtifact((prev) => ({
              ...prev,
              diffLines: diffLog.diffLines,
              diagnosis: {
                ...prev.diagnosis,
                incidentId: 'INC-8843',
                severity: 'CRITICAL (CVSS 8.4)',
                component: 'pkg/auth/password_reset.go :: VerifyResetToken()',
                rootCause: '1) Vulnerability found: Edge case missing in password reset. 2) Token expiration replay window unhandled.',
                suggestedFix: 'Applied patch with atomic redis lock and nonce verification (PR #843-patch1).'
              }
            }));
          }
        }
      } else {
        setBackendConnected(false);
      }
    };

    // Immediate poll then poll every 1 second
    pollStatus();
    const interval = setInterval(pollStatus, 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Compute the 5 Specialized Agents' live status based on pipelineStage + backend data
  const agents = useMemo(() => {
    const stageMap = {
      IDLE: ['STANDBY', 'STANDBY', 'STANDBY', 'STANDBY', 'STANDBY'],
      BUILD: ['PASSED', 'BUILDING', 'STANDBY', 'STANDBY', 'STANDBY'],
      FAIL: ['PASSED', 'PASSED', 'FAIL', 'FAIL', 'STANDBY'],
      RECOVER: ['PASSED', 'DIAGNOSING', 'DIAGNOSING', 'DIAGNOSING', 'STANDBY'],
      PASSED: ['PASSED', 'PASSED', 'PASSED', 'PASSED', 'BUILDING'],
      RELEASED: ['PASSED', 'PASSED', 'PASSED', 'PASSED', 'PASSED']
    };
    const currentStates = stageMap[pipelineStage] || stageMap.IDLE;

    const baseAgents = [
      {
        id: 'product',
        name: 'Product Agent',
        shortName: 'Product',
        role: 'Requirements, User Stories & Acceptance Criteria',
        state: currentStates[0],
        directive:
          pipelineStage === 'IDLE'
            ? 'Awaiting user specification or repository input'
            : `Synthesized ${artifact.requirement.id} with ${artifact.requirement.acceptanceCriteria.length} strict acceptance criteria`,
        metricLabel: 'Spec Traceability',
        metricValue: '100%'
      },
      {
        id: 'engineering',
        name: 'Engineering Agent',
        shortName: 'Engineering',
        role: 'Architecture, Implementation & Auto-Patching',
        state: currentStates[1],
        directive:
          pipelineStage === 'RECOVER'
            ? `Applying root-cause patch for ${artifact.diagnosis.incidentId}`
            : pipelineStage === 'PASSED' || pipelineStage === 'RELEASED'
            ? 'v2 Patched Implementation compiled & verified clean'
            : 'Generated initial v1 service implementation',
        metricLabel: 'Patch Diff',
        metricValue: pipelineStage === 'PASSED' || pipelineStage === 'RELEASED' ? '+18 / -2 lines' : 'v1 Build'
      },
      {
        id: 'qa',
        name: 'QA Verification Agent',
        shortName: 'QA Verify',
        role: 'Unit, Negative, Edge-Case & Regression Tests',
        state: currentStates[2],
        directive:
          pipelineStage === 'FAIL'
            ? 'BLOCKED: 3/6 edge-case & concurrency tests FAILED on v1 build'
            : pipelineStage === 'RECOVER'
            ? 'Isolating failing test trace & generating regression harness'
            : pipelineStage === 'PASSED' || pipelineStage === 'RELEASED'
            ? 'All 32 test cases PASSED (Zero regressions)'
            : 'Ready to execute independent test matrix',
        metricLabel: 'Test Matrix',
        metricValue:
          pipelineStage === 'FAIL'
            ? '3/6 FAILED'
            : pipelineStage === 'PASSED' || pipelineStage === 'RELEASED'
            ? '32/32 PASSED'
            : 'Standby'
      },
      {
        id: 'security',
        name: 'Security Audit Agent',
        shortName: 'Security',
        role: 'Secrets, Auth, OWASP & Concurrency Vulnerability Gate',
        state: currentStates[3],
        directive:
          pipelineStage === 'FAIL'
            ? `CRITICAL ALERT: ${artifact.diagnosis.severity} flaw detected`
            : pipelineStage === 'RECOVER'
            ? 'Verifying CSPRNG entropy & atomic mutex lock patch'
            : pipelineStage === 'PASSED' || pipelineStage === 'RELEASED'
            ? `Audit PASSED: CVSS dropped from ${artifact.securityMetrics.v1Cvss} → 0.0`
            : 'Zero-Trust static & dynamic analyzer armed',
        metricLabel: 'CVSS Risk Score',
        metricValue:
          pipelineStage === 'FAIL'
            ? `${artifact.securityMetrics.v1Cvss} CRITICAL`
            : pipelineStage === 'PASSED' || pipelineStage === 'RELEASED'
            ? '0.0 SAFE'
            : '0.0'
      },
      {
        id: 'devops',
        name: 'DevOps & Release Gate',
        shortName: 'DevOps Gate',
        role: 'Evidence Evaluation & Human-in-the-Loop Release',
        state: currentStates[4],
        directive:
          pipelineStage === 'FAIL'
            ? 'RELEASE GATE RED: Deployment blocked due to QA/Security failure'
            : pipelineStage === 'PASSED' || pipelineStage === 'RELEASED'
            ? 'RELEASE GATE GREEN: All verification evidence satisfied'
            : 'Awaiting independent QA & Security sign-off',
        metricLabel: 'Gate Verdict',
        metricValue:
          pipelineStage === 'FAIL'
            ? 'RED (BLOCKED)'
            : pipelineStage === 'RECOVER'
            ? 'YELLOW (PATCHING)'
            : pipelineStage === 'PASSED' || pipelineStage === 'RELEASED'
            ? 'GREEN (RELEASED)'
            : 'PENDING'
      }
    ];

    // If live backend agent data is available, enrich directives
    return baseAgents.map((ag) => {
      const backendMatch = backendAgentsData.find((b) => b.id === ag.id);
      if (backendMatch && backendMatch.directive) {
        return {
          ...ag,
          directive: backendMatch.directive,
          metricValue: backendMatch.stat1Val || ag.metricValue
        };
      }
      return ag;
    });
  }, [pipelineStage, artifact, backendAgentsData]);

  // ==========================================================================
  // LAUNCH CHAKRA 5-AGENT SWARM: Triggers POST /api/demo/password-reset
  // ==========================================================================
  const handleRunSwarm = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setReleaseApproved(false);

    try {
      // 1. Trigger the live FastAPI backend endpoint with user's text prompt
      const activePrompt =
        inputMode === 'code'
          ? `Audit, verify and fix the following source code:\n${userCode}`
          : inputMode === 'github'
          ? `Audit and verify GitHub repository module ${repoInfo.name}:\n${userCode}`
          : userPrompt;
      const result = await triggerPasswordResetDemo({ prompt: activePrompt, mode: inputMode, code: userCode });
      console.log('Backend live Gemini SDLC Swarm triggered:', result);

      // Local optimistic initial notification in the terminal
      const nowTime = () => new Date().toTimeString().slice(0, 8);
      setLogs((prev) => [
        ...prev,
        {
          time: nowTime(),
          agent: 'ORCHESTRATOR',
          level: 'INFO',
          text: `Triggered Live Gemini Swarm (/api/demo/password-reset) with prompt: "${activePrompt.slice(0, 60)}..."`
        }
      ]);
    } catch (err) {
      console.warn('Backend trigger had an issue, falling back to local simulation:', err);

      // Fallback client simulation if backend is not responding
      setPipelineStage('BUILD');
      setCurrentStepIndex(1);
      await new Promise((r) => setTimeout(r, 1800));

      if (forceRecoveryDemo) {
        setPipelineStage('FAIL');
        setCurrentStepIndex(2);
        setSelectedAgentId('qa');
        await new Promise((r) => setTimeout(r, 2400));

        setPipelineStage('RECOVER');
        setCurrentStepIndex(3);
        setSelectedAgentId('engineering');
        await new Promise((r) => setTimeout(r, 2300));
      }

      setPipelineStage('PASSED');
      setCurrentStepIndex(4);
      setSelectedAgentId('devops');
      setIsRunning(false);
    }
  };

  const handleResetDemo = () => {
    setIsRunning(false);
    setPipelineStage('IDLE');
    setCurrentStepIndex(0);
    setReleaseApproved(false);
    setLogs([
      {
        time: new Date().toTimeString().slice(0, 8),
        agent: 'SYSTEM',
        level: 'INFO',
        text: 'Workspace reset to clean state. Ready for demo dispatch.'
      }
    ]);
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const antigravityMasterPrompt = `Task: Upgrade the Chakra Agent project into a full-stack, dynamic Multi-Agent system with a Luminous 3D Spatial Glass UI (Light Mode) and dynamic Prompt / Code / GitHub Repository analysis.

1. Frontend (frontend/src/):
- Replace the dark theme with a bright Alabaster & Pearlescent Spatial Glass theme (#F4F7FB background, frosted white cards, 3D orbital canvas for the 5 agents: Product, Engineering, QA, Security, DevOps).
- Add a 3-mode Input Dock: (A) Natural Language Feature Prompt, (B) Paste Custom Source Code, and (C) Connect Public GitHub Repository URL via api.github.com.
- Include 4 interactive views: 3D Swarm Command Center, Code Diff & Recovery Lab (v1 vs v2 patched code), Interactive Requirement Traceability Graph, and Human-in-the-Loop Release Gate.

2. Backend (backend/main.py):
- Create POST /api/analyze that accepts { mode, prompt, code, repo_url }.
- Run the 5-agent closed verification loop: Product Agent (Requirements) -> Engineering Agent (v1 Code) -> QA & Security Agents (Edge-case & vulnerability audit that catches flaws) -> Automated Diagnosis & v2 Patch -> Regression Retest -> Release Gate Verdict.`;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-900 font-sans selection:bg-blue-600 selection:text-white pb-16">
      {/* Subtle Ambient Pearlescent Background Auras */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-sky-200/45 blur-3xl" />
        <div className="absolute top-1/4 -right-24 w-[480px] h-[480px] rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[420px] rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      {/* TOP SPATIAL GLASS NAVIGATION BAR */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '14s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-700 bg-clip-text text-transparent">
                  CHAKRA AGENT
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Spatial v3.0
                </span>
                {backendConnected ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    FastAPI :8000
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    Connecting :8000
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Self-Verifying Multi-Agent Software Engineering System •{' '}
                <span className="font-semibold text-slate-700">Build → Verify → Recover</span>
              </p>
            </div>
          </div>

          {/* Center Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/70">
            {[
              { id: 'command', label: '3D Command Center', icon: Cpu },
              { id: 'recovery', label: 'Code & Recovery Lab', icon: Code2, badge: pipelineStage === 'FAIL' || pipelineStage === 'RECOVER' ? '!' : null },
              { id: 'graph', label: 'Requirement Graph', icon: GitBranch },
              { id: 'release', label: 'Release Gate', icon: ShieldCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                  {tab.badge && (
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center animate-bounce">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAntigravityModal(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition flex items-center gap-1.5"
              title="Get prompt for your local Antigravity IDE"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Antigravity Prompt</span>
            </button>
            <button
              onClick={handleResetDemo}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex md:hidden items-center justify-around border-t border-slate-200/70 bg-white/90 px-2 py-1.5">
          {[
            { id: 'command', label: '3D Hub', icon: Cpu },
            { id: 'recovery', label: 'Code & Diff', icon: Code2 },
            { id: 'graph', label: 'Req Graph', icon: GitBranch },
            { id: 'release', label: 'Release Gate', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* ====================================================================
            1. MULTI-MODE DYNAMIC INPUT DOCK (Prompt | Paste Code | GitHub Repo)
           ==================================================================== */}
        <section className="rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-1.5">
                <Zap className="w-3.5 h-3.5" /> Interactive Multi-Modal Input Engine
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                What should your AI Engineering Team build, audit, or self-heal today?
              </h1>
            </div>

            {/* 3 Input Mode Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 self-start">
              <button
                onClick={() => setInputMode('prompt')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  inputMode === 'prompt'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/70'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                1. Feature Prompt
              </button>
              <button
                onClick={() => setInputMode('code')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  inputMode === 'code'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/70'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                2. Paste Your Code
              </button>
              <button
                onClick={() => setInputMode('github')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  inputMode === 'github'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/70'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                3. GitHub Repository
              </button>
            </div>
          </div>

          {/* Dynamic Input Body */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-8 space-y-3">
              {inputMode === 'prompt' && (
                <>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Describe the feature or system you want Chakra to build & verify:
                  </label>
                  <textarea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    rows={3}
                    placeholder="e.g., Add a secure password-reset feature with 15-minute token expiration, Redis rate limiting, and replay protection..."
                    className="w-full rounded-2xl bg-slate-50/90 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 p-3.5 text-sm text-slate-800 font-medium transition outline-none"
                  />
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-semibold text-slate-400">Quick Presets:</span>
                    {PRESET_SCENARIOS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setUserPrompt(preset.prompt)}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200/80 transition"
                      >
                        {preset.title}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {inputMode === 'code' && (
                <>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Paste your source code (Python, TypeScript, Go, Rust) for independent QA & Security verification:
                    </label>
                    <button
                      onClick={() => setUserCode(SAMPLE_GITHUB_FILES[0].content)}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Load Vulnerable Auth Sample
                    </button>
                  </div>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    rows={6}
                    placeholder="Paste your function, API route, or module here..."
                    className="w-full rounded-2xl bg-slate-900 text-sky-100 font-mono text-xs p-4 border border-slate-300 focus:ring-4 focus:ring-blue-500/15 outline-none"
                  />
                </>
              )}

              {inputMode === 'github' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Connect any Public GitHub Repository URL:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/owner/repository"
                      className="flex-1 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white px-4 py-2.5 text-sm font-medium outline-none"
                    />
                    <button
                      onClick={handleFetchGithubRepo}
                      disabled={isFetchingRepo}
                      className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm"
                    >
                      {isFetchingRepo ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <FolderGit2 className="w-4 h-4" />
                      )}
                      {isFetchingRepo ? 'Fetching Repo...' : 'Fetch Live Repo'}
                    </button>
                  </div>

                  {/* Repo File Selector */}
                  {repoInfo.loaded && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            Connected: {repoInfo.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            Branch: <strong>{repoInfo.branch}</strong> • ⭐ {repoInfo.stars}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">Select file to audit & self-heal:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {repoInfo.files.map((file, idx) => (
                          <button
                            key={file.path}
                            onClick={() => {
                              setSelectedRepoFileIdx(idx);
                              setUserCode(file.content);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition flex items-center gap-1.5 ${
                              selectedRepoFileIdx === idx
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5" />
                            {file.path}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Launch Panel with Connected FastAPI Trigger */}
            <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200/80 p-4 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Verification Mode
                  </span>
                  <button
                    onClick={() => setForceRecoveryDemo(!forceRecoveryDemo)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                      forceRecoveryDemo
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {forceRecoveryDemo ? 'Auto-Fail & Self-Heal ON' : 'Direct Pass Mode'}
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Triggers the closed verification loop on our FastAPI backend. Simulates Build → QA/Security Flaw (RED) → Automated Root Cause & Patch (YELLOW) → Retest & Release Gate (GREEN).
                </p>
              </div>

              {/* WIRED BUTTON: POST /api/demo/password-reset */}
              <button
                onClick={handleRunSwarm}
                disabled={isRunning}
                className={`w-full py-3.5 px-5 rounded-2xl font-extrabold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isRunning
                    ? 'bg-indigo-500 cursor-wait'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Executing Swarm Stage: {pipelineStage}...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    LAUNCH CHAKRA 5-AGENT SWARM
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CLOSED-LOOP SDLC PROGRESS STEPPER */}
          <div className="mt-5 pt-4 border-t border-slate-200/70">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { step: 1, title: '1. Product & Build', sub: 'Specs + v1 Code', activeAt: 1, color: 'blue' },
                { step: 2, title: '2. Independent Verify', sub: 'QA & Sec Gate (FAIL)', activeAt: 2, color: 'rose' },
                { step: 3, title: '3. Auto Diagnosis', sub: 'Root Cause + Patch', activeAt: 3, color: 'amber' },
                { step: 4, title: '4. Regression Retest', sub: 'Tests PASS', activeAt: 4, color: 'emerald' },
                { step: 5, title: '5. Release Gate', sub: 'Evidence Verdict', activeAt: 4, color: 'emerald' }
              ].map((item) => {
                const reached = currentStepIndex >= item.activeAt;
                const isCurrent = currentStepIndex === item.activeAt;
                return (
                  <div
                    key={item.step}
                    className={`rounded-2xl p-2.5 border transition-all flex items-center gap-2.5 ${
                      isCurrent && item.color === 'rose'
                        ? 'bg-rose-50 border-rose-300 shadow-sm'
                        : isCurrent && item.color === 'amber'
                        ? 'bg-amber-50 border-amber-300 shadow-sm'
                        : reached
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-slate-50/80 border-slate-200/60 opacity-65'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl text-xs font-extrabold flex items-center justify-center shrink-0 ${
                        isCurrent && item.color === 'rose'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : isCurrent && item.color === 'amber'
                          ? 'bg-amber-500 text-white animate-pulse'
                          : reached
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {item.step}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">{item.title}</div>
                      <div className="text-[11px] text-slate-500 truncate">{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================================
            VIEW 1: 3D SWARM COMMAND CENTER
           ==================================================================== */}
        {activeTab === 'command' && (
          <div className="space-y-6">
            {/* Top Row: 3D Orbital Core + Live Failure/Recovery Alert Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <Interactive3DCore
                  agents={agents}
                  pipelineStage={pipelineStage}
                  selectedAgentId={selectedAgentId}
                  onSelectAgent={setSelectedAgentId}
                />
              </div>

              {/* Right Column: Live Stage Telemetry & Quick Recovery Inspector */}
              <div className="lg:col-span-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Independent Verification Loop Status
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                        pipelineStage === 'FAIL'
                          ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
                          : pipelineStage === 'RECOVER'
                          ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
                          : pipelineStage === 'PASSED' || pipelineStage === 'RELEASED'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {pipelineStage === 'FAIL'
                        ? '🔴 GATE BLOCKED: FAILURE DETECTED'
                        : pipelineStage === 'RECOVER'
                        ? '🟡 SELF-HEALING: DIAGNOSING & PATCHING'
                        : pipelineStage === 'PASSED' || pipelineStage === 'RELEASED'
                        ? '🟢 VERIFIED: ALL CHECKS PASSED'
                        : pipelineStage === 'BUILD'
                        ? '🔵 BUILDING SPECS & CODE'
                        : '⚪ STANDBY'}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">{artifact.projectTitle}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {artifact.requirement.userStory}
                  </p>

                  {/* Dynamic Incident / Diagnosis Highlight Box */}
                  <div
                    className={`rounded-2xl p-3.5 border transition-all ${
                      pipelineStage === 'FAIL'
                        ? 'bg-rose-50/90 border-rose-200'
                        : pipelineStage === 'RECOVER'
                        ? 'bg-amber-50/90 border-amber-200'
                        : 'bg-emerald-50/70 border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        {artifact.diagnosis.incidentId}: {artifact.diagnosis.severity}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">
                        {artifact.diagnosis.component.split('::')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>Root Cause Caught by QA/Sec:</strong> {artifact.diagnosis.rootCause}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 mt-4">
                  <button
                    onClick={() => setActiveTab('recovery')}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    Inspect Code Diff & Patch
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('graph')}
                    className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition"
                  >
                    View Requirement Graph
                  </button>
                </div>
              </div>
            </div>

            {/* 5 SPECIALIZED 3D TILT AGENT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {agents.map((ag) => {
                const isFail = ag.state === 'FAIL';
                const isDiag = ag.state === 'DIAGNOSING';
                const isPass = ag.state === 'PASSED';
                const isBuild = ag.state === 'BUILDING';

                return (
                  <div
                    key={ag.id}
                    onClick={() => setSelectedAgentId(ag.id)}
                    className={`group cursor-pointer rounded-3xl p-4 transition-all duration-300 hover:-translate-y-1.5 bg-white/90 backdrop-blur-xl border ${
                      isFail
                        ? 'border-rose-300 shadow-[0_14px_34px_rgba(225,29,72,0.15)]'
                        : isDiag
                        ? 'border-amber-300 shadow-[0_14px_34px_rgba(217,119,6,0.14)]'
                        : isPass
                        ? 'border-emerald-200 shadow-[0_14px_34px_rgba(5,150,105,0.10)]'
                        : isBuild
                        ? 'border-blue-300 shadow-[0_14px_34px_rgba(37,99,235,0.14)]'
                        : 'border-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-xs font-extrabold text-slate-900">{ag.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          isFail
                            ? 'bg-rose-100 text-rose-700'
                            : isDiag
                            ? 'bg-amber-100 text-amber-800'
                            : isPass
                            ? 'bg-emerald-100 text-emerald-800'
                            : isBuild
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {ag.state}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium mb-3">{ag.role}</p>

                    <div className="p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200/60 text-xs text-slate-700 font-medium min-h-[60px] flex items-center">
                      {ag.directive}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-semibold">{ag.metricLabel}</span>
                      <span className="font-extrabold text-slate-800">{ag.metricValue}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LIVE TELEMETRY STREAM CONSOLE */}
            <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_16px_40px_rgba(15,23,42,0.05)] overflow-hidden">
              <div className="px-5 py-3 bg-slate-100/80 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Live Multi-Agent Verification Telemetry Stream
                  </span>
                  {backendConnected && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      FastAPI Live
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-slate-500">{logs.length} events logged</span>
              </div>
              <div ref={terminalContainerRef} className="p-4 max-h-56 overflow-y-auto font-mono text-xs space-y-2 bg-slate-50/50">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-xl border flex items-start gap-2.5 ${
                      log.level === 'ERROR' || log.level === 'CRITICAL' || log.level === 'FAIL'
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : log.level === 'WARN' || log.level === 'DIAGNOSING'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : log.level === 'SUCCESS'
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-white border-slate-200/70 text-slate-700'
                    }`}
                  >
                    <span className="text-slate-400 shrink-0">[{log.time}]</span>
                    <span className="font-bold px-2 py-0.5 rounded bg-slate-200/70 text-slate-800 text-[10px] shrink-0">
                      {log.agent}
                    </span>
                    <span className="leading-relaxed">{log.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            VIEW 2: CODE, DIFF & AUTOMATED RECOVERY LAB
           ==================================================================== */}
        {activeTab === 'recovery' && (
          <div className="space-y-6">
            {/* Automated Failure Diagnosis Header Card */}
            <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/70">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                    AUTOMATED FAILURE RECOVERY ENGINE (FAIL → DIAGNOSE → FIX → PASS)
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                    Incident {artifact.diagnosis.incidentId} • {artifact.diagnosis.component}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(artifact.v2Code)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedCode ? 'Copied Verified v2 Code!' : 'Copy Patched v2 Code'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-rose-700 mb-1">
                    Probable Root Cause (Caught by Independent QA & Security)
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">{artifact.diagnosis.rootCause}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-1">
                    Autonomous Engineering Patch Applied
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">{artifact.diagnosis.suggestedFix}</p>
                </div>
              </div>
            </div>

            {/* Side-by-Side Diff & Final Patched Code */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Unified Code Diff */}
              <div className="rounded-3xl bg-white/95 border border-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] overflow-hidden">
                <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Self-Healing Patch Diff (v1 Vulnerable → v2 Hardened)
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Verified Patch
                  </span>
                </div>
                <div className="p-4 font-mono text-xs space-y-1 overflow-x-auto bg-slate-900 text-slate-100 min-h-[340px]">
                  {artifact.diffLines.map((line, i) => (
                    <div
                      key={i}
                      className={`px-2.5 py-1 rounded ${
                        line.type === 'remove'
                          ? 'bg-rose-950/90 text-rose-300 border-l-2 border-rose-500'
                          : line.type === 'add'
                          ? 'bg-emerald-950/90 text-emerald-300 border-l-2 border-emerald-400'
                          : 'text-slate-400'
                      }`}
                    >
                      <span className="select-none mr-2 font-bold">
                        {line.type === 'remove' ? '-' : line.type === 'add' ? '+' : ' '}
                      </span>
                      {line.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Patched v2 Code + Test Suite Results */}
              <div className="space-y-6">
                <div className="rounded-3xl bg-white/95 border border-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] overflow-hidden">
                  <div className="px-5 py-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Final Verified v2 Implementation
                    </span>
                    <span className="text-xs font-mono text-slate-500">100% Tests Passing</span>
                  </div>
                  <pre className="p-4 font-mono text-xs overflow-x-auto bg-slate-900 text-sky-100 max-h-60">
                    {artifact.v2Code}
                  </pre>
                </div>

                {/* Independent QA Test Matrix Comparison (v1 vs v2) */}
                <div className="rounded-3xl bg-white/95 border border-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] p-5">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-3">
                    Independent QA Regression Matrix (Pass 1 vs Pass 2 After Recovery)
                  </h3>
                  <div className="space-y-2">
                    {artifact.initialTests.map((t) => (
                      <div
                        key={t.id}
                        className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-slate-800">{t.name}</span>
                          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-700">
                            {t.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              t.v1Status === 'FAIL'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            v1: {t.v1Status}
                          </span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-600 text-white">
                            v2: {t.v2Status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            VIEW 3: INTERACTIVE REQUIREMENT TRACEABILITY GRAPH
           ==================================================================== */}
        {activeTab === 'graph' && (
          <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                  End-to-End SDLC Lineage
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Interactive Requirement-to-Code-to-Test Traceability Graph
                </h2>
                <p className="text-xs text-slate-500">
                  Click any node below to inspect how Chakra traces why code exists, which tests verify it, and what happens if requirements change.
                </p>
              </div>
            </div>

            {/* Interactive Connected Nodes Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
              {[
                {
                  id: 'REQ',
                  stage: '1. Requirement',
                  title: artifact.requirement.id,
                  desc: artifact.requirement.title,
                  detail: artifact.requirement.userStory,
                  impact: 'Changing this requirement triggers automatic re-synthesis of 3 acceptance criteria and 6 QA tests.'
                },
                {
                  id: 'AC',
                  stage: '2. Acceptance Criteria',
                  title: `${artifact.requirement.acceptanceCriteria.length} Verification Rules`,
                  desc: artifact.requirement.acceptanceCriteria[0],
                  detail: artifact.requirement.acceptanceCriteria.join(' • '),
                  impact: 'Directly governs the QA edge-case test generator and Security token TTL policy.'
                },
                {
                  id: 'CODE',
                  stage: '3. Implementation',
                  title: artifact.requirement.affectedFiles[0],
                  desc: artifact.architectureSummary,
                  detail: `Patched in Incident ${artifact.diagnosis.incidentId} with CSPRNG + atomic mutex lock.`,
                  impact: 'Linked to 6 automated unit/chaos tests. Any commit here blocks release until QA & Security pass.'
                },
                {
                  id: 'TEST',
                  stage: '4. QA & Security Audit',
                  title: '6 Automated Suites',
                  desc: 'Unit, Edge-Case, Chaos & OWASP Checks',
                  detail: `Pass 1 caught ${artifact.diagnosis.severity} flaw. Pass 2 verified 6/6 tests passing (0.0 CVSS).`,
                  impact: 'Acts as an independent verification gate before DevOps can unlock deployment.'
                },
                {
                  id: 'RELEASE',
                  stage: '5. Release Decision',
                  title: 'Gate Verdict: GREEN',
                  desc: 'Evidence-Based Human Sign-Off',
                  detail: 'All requirement criteria, regression suites, and zero-trust security thresholds satisfied.',
                  impact: 'Final production release artifact with full audit lineage.'
                }
              ].map((node) => {
                const selected = selectedGraphNode === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedGraphNode(node.id)}
                    className={`cursor-pointer rounded-3xl p-4 border transition-all flex flex-col justify-between ${
                      selected
                        ? 'bg-gradient-to-b from-blue-600 to-indigo-700 text-white border-blue-600 shadow-xl scale-[1.02]'
                        : 'bg-slate-50/90 hover:bg-white text-slate-800 border-slate-200/90'
                    }`}
                  >
                    <div>
                      <div
                        className={`text-[10px] font-extrabold uppercase tracking-wider mb-1 ${
                          selected ? 'text-sky-200' : 'text-blue-600'
                        }`}
                      >
                        {node.stage}
                      </div>
                      <div className="font-extrabold text-sm mb-1.5">{node.title}</div>
                      <p className={`text-xs leading-relaxed ${selected ? 'text-blue-100' : 'text-slate-600'}`}>
                        {node.desc}
                      </p>
                    </div>
                    <div
                      className={`mt-4 pt-2.5 border-t text-[11px] font-bold flex items-center justify-between ${
                        selected ? 'border-white/20 text-white' : 'border-slate-200 text-blue-600'
                      }`}
                    >
                      <span>Inspect Lineage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Node Deep Traceability Inspector */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/60 to-emerald-50/60 border border-blue-200/80 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-blue-800 mb-1">
                  Active Traceability Node Details ({selectedGraphNode})
                </div>
                <p className="text-sm font-semibold text-slate-800">{artifact.requirement.userStory}</p>
                <ul className="mt-2 space-y-1 text-xs text-slate-700">
                  {artifact.requirement.acceptanceCriteria.map((ac, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {ac}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80">
                <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 mb-1">
                  Impact Analysis: "What happens if this requirement changes?"
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  If <strong>{artifact.requirement.id}</strong> is modified, Chakra automatically flags{' '}
                  <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono">
                    {artifact.requirement.affectedFiles.join(', ')}
                  </code>{' '}
                  and invalidates <strong>6 linked QA & Security tests</strong>, forcing a fresh verification cycle before release.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            VIEW 4: HUMAN-IN-THE-LOOP RELEASE GATE
           ==================================================================== */}
        {activeTab === 'release' && (
          <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/70 pb-5">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  HUMAN-IN-THE-LOOP RELEASE SAFETY GATE
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Final Evidence Verdict: {pipelineStage === 'FAIL' ? 'RED (BLOCKED)' : 'GREEN (ELIGIBLE FOR RELEASE)'}
                </h2>
                <p className="text-xs text-slate-500">
                  Chakra never blindly deploys AI-generated code. Review the independent verification scorecard below.
                </p>
              </div>

              <button
                onClick={() => {
                  setReleaseApproved(true);
                  setPipelineStage('RELEASED');
                }}
                disabled={pipelineStage === 'FAIL'}
                className={`px-6 py-3.5 rounded-2xl font-extrabold text-xs text-white shadow-lg transition flex items-center gap-2 ${
                  releaseApproved
                    ? 'bg-emerald-600'
                    : pipelineStage === 'FAIL'
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:scale-[1.02]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                {releaseApproved ? 'PRODUCTION RELEASE DEPLOYED ✓' : 'APPROVE & DEPLOY VERIFIED RELEASE'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <div className="text-xs font-extrabold uppercase text-emerald-800">GREEN GATE CRITERIA</div>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">6 / 6 Tests Passed</div>
                <p className="text-xs text-slate-600 mt-1">
                  100% requirement coverage verified after autonomous recovery patch.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200">
                <div className="text-xs font-extrabold uppercase text-sky-800">SECURITY AUDIT SCORE</div>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">0.0 CVSS (Clean)</div>
                <p className="text-xs text-slate-600 mt-1">
                  Reduced from {artifact.securityMetrics.v1Cvss} Critical after CSPRNG + Mutex fix.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200">
                <div className="text-xs font-extrabold uppercase text-indigo-800">TRACEABILITY LINEAGE</div>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">{artifact.requirement.id} Verified</div>
                <p className="text-xs text-slate-600 mt-1">
                  Linked across {artifact.requirement.affectedFiles.length} implementation & test files.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: COPY-PASTE MASTER PROMPT FOR ANTIGRAVITY IDE */}
      {showAntigravityModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900">
                Master Prompt for Your Local Antigravity IDE
              </h3>
              <button
                onClick={() => setShowAntigravityModal(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Close ✕
              </button>
            </div>
            <p className="text-xs text-slate-600">
              You can use this interactive app right here in the Preview! If you also want your local Antigravity IDE agent to update your local files with this bright 3D theme and dynamic input engine, copy and paste this prompt into Antigravity:
            </p>
            <pre className="p-4 rounded-2xl bg-slate-900 text-sky-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
              {antigravityMasterPrompt}
            </pre>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(antigravityMasterPrompt);
                  setCopiedPrompt(true);
                  setTimeout(() => setCopiedPrompt(false), 2000);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5"
              >
                {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedPrompt ? 'Copied to Clipboard!' : 'Copy Antigravity Prompt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
