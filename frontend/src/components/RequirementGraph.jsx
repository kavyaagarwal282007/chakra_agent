import React, { useState } from 'react';
import { 
  GitFork, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  Activity, 
  X,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export default function RequirementGraph() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedNode, setSelectedNode] = useState(null);

  // Nodes definition matching the Stitch visual layout
  const nodes = [
    {
      id: 'req-104',
      type: 'product',
      category: 'PRODUCT NODE',
      tag: 'COMPLETED',
      tagColor: 'emerald',
      title: 'Req #104: Multi-Region Failover',
      description: 'Autonomous failover spec across 3 active regions with zero downtime invariants.',
      meta1: 'Latency: 1.2s',
      meta2: '100% Validated',
      status: 'success',
      x: 40,
      y: 40,
      width: 260,
      badge: 'PRD Ready',
      details: {
        author: 'Product Agent v2.4',
        specLink: 'spec/prd-104-failover.md',
        invariants: 12,
        dependencies: ['None (Root Requirement)'],
        downstream: ['Task #210: gRPC Transport Overhaul', 'Epic #42: Raft Consensus Engine']
      }
    },
    {
      id: 'epic-42',
      type: 'product',
      category: 'PRODUCT NODE',
      tag: 'SYNTHESIZING',
      tagColor: 'cyan',
      title: 'Epic #42: Raft Consensus Engine',
      description: 'Generating state machine replication requirements and leader election timeouts.',
      meta1: 'Progress',
      meta2: '68% Draft',
      status: 'processing',
      x: 40,
      y: 200,
      width: 260,
      badge: 'In Review',
      details: {
        author: 'Product Agent v2.4',
        specLink: 'spec/epic-42-raft.md',
        invariants: 8,
        dependencies: ['Req #104: Multi-Region Failover'],
        downstream: ['Task #210: gRPC Transport Overhaul']
      }
    },
    {
      id: 'task-210',
      type: 'engineering',
      category: 'ENG TASK NODE',
      tag: 'IN-PROGRESS',
      tagColor: 'indigo',
      title: 'Task #210: gRPC Transport Overhaul',
      description: 'Refactoring protobuf definitions and HTTP/2 stream multiplexer for 10x throughput.',
      meta1: 'PR #842',
      meta2: '+344 / -82 lines',
      status: 'active',
      x: 350,
      y: 110,
      width: 270,
      badge: 'Active PR',
      details: {
        author: 'Engineering Agent',
        branch: 'feat/auth-v2-grpc',
        pr: '#842',
        tests: '42 passing',
        downstream: ['Sec Audit: Token Expiry Hardening', 'Test Spec #88: Chaos Partitioning']
      }
    },
    {
      id: 'sec-audit',
      type: 'security',
      category: 'SEC AUDIT NODE',
      tag: 'BLOCKED',
      tagColor: 'rose',
      title: 'Sec Audit: Token Expiry Hardening',
      description: 'CVE-2024-8192 detected in jwt-decode. Execution halted awaiting patch v3.2.0.',
      meta1: 'CVSS: 8.4 Critical',
      meta2: 'Quarantined',
      status: 'error',
      x: 670,
      y: 40,
      width: 270,
      badge: 'CVE Alert',
      details: {
        author: 'Security Agent',
        cve: 'CVE-2024-8192',
        severity: 'HIGH (8.4 CVSS)',
        remediation: 'Run auto-patch PR or bump jwt-decode to >= 3.2.0',
        downstream: ['Deploy #89: Canary Release']
      }
    },
    {
      id: 'qa-test',
      type: 'qa',
      category: 'QA TEST NODE',
      tag: 'RUNNING',
      tagColor: 'amber',
      title: 'Test Spec #88: Chaos Partitioning',
      description: 'Simulating 30% synthetic packet drops across EU-West and US-East worker clusters.',
      meta1: 'Pass: 28 / Flaky: 2',
      meta2: 'Batch 4/5',
      status: 'warning',
      x: 670,
      y: 200,
      width: 270,
      badge: 'Batch 4/5',
      details: {
        author: 'QA Agent',
        suite: 'e2e/chaos/partition_test.go',
        passRate: '93.3%',
        downstream: ['Deploy #89: Canary Release']
      }
    }
  ];

  const filterOptions = ['All', 'Product', 'Engineering', 'QA', 'Security'];

  const filteredNodes = nodes.filter(n => {
    if (activeFilter === 'All') return true;
    return n.type.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section className="mb-6 rounded-xl border border-obsidian-750 bg-obsidian-900/80 backdrop-blur-md overflow-hidden relative shadow-glow-card">
      {/* Graph Header */}
      <div className="px-5 py-3.5 border-b border-obsidian-750/90 flex flex-wrap items-center justify-between gap-3 bg-obsidian-950/40">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-cyber-cyan" />
            <h2 className="text-sm font-bold tracking-tight text-obsidian-50 font-mono">
              Autonomous Requirement Pipeline DAG
            </h2>
          </div>
          <p className="text-[11px] text-obsidian-400 mt-0.5">
            Live directed acyclic graph resolving cross-agent dependencies in real time.
          </p>
        </div>

        {/* Filter Tabs & Zoom Controls */}
        <div className="flex items-center gap-4">
          {/* Filters */}
          <div className="flex items-center gap-1 bg-obsidian-950 p-1 rounded-md border border-obsidian-750 text-xs font-mono">
            <span className="text-[10px] text-obsidian-400 px-1.5 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {filterOptions.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  activeFilter === f 
                    ? 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 font-semibold' 
                    : 'text-obsidian-300 hover:text-obsidian-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-obsidian-950 p-1 rounded-md border border-obsidian-750">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 10, 150))}
              className="p-1 hover:text-cyber-cyan text-obsidian-400 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-obsidian-300 px-1">{zoomLevel}%</span>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 10, 70))}
              className="p-1 hover:text-cyber-cyan text-obsidian-400 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setZoomLevel(100)}
              className="p-1 hover:text-cyber-cyan text-obsidian-400 transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="relative min-h-[380px] w-full p-6 bg-obsidian-950 bg-grid-cyber overflow-x-auto select-none">
        <div 
          className="relative transition-transform duration-200 origin-top-left"
          style={{ 
            width: '1000px', 
            height: '350px',
            transform: `scale(${zoomLevel / 100})` 
          }}
        >
          {/* SVG Connection Lines with Pulse Animations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="line-cyan-indigo" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="line-indigo-rose" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="line-indigo-amber" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>

              {/* Glowing filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Edge: Req-104 -> Task-210 */}
            <path 
              d="M 300 90 C 325 90, 325 150, 350 150" 
              fill="none" 
              stroke="url(#line-cyan-indigo)" 
              strokeWidth="2" 
              strokeDasharray="4 2"
              className="animate-pulse"
              filter="url(#glow)"
            />

            {/* Edge: Epic-42 -> Task-210 */}
            <path 
              d="M 300 240 C 325 240, 325 170, 350 170" 
              fill="none" 
              stroke="url(#line-cyan-indigo)" 
              strokeWidth="2" 
              strokeDasharray="4 2"
              className="animate-pulse"
              filter="url(#glow)"
            />

            {/* Edge: Task-210 -> Sec-Audit (Blocked) */}
            <path 
              d="M 620 150 C 645 150, 645 90, 670 90" 
              fill="none" 
              stroke="url(#line-indigo-rose)" 
              strokeWidth="2.5" 
              className="animate-pulse"
              filter="url(#glow)"
            />

            {/* Edge: Task-210 -> QA-Test */}
            <path 
              d="M 620 170 C 645 170, 645 240, 670 240" 
              fill="none" 
              stroke="url(#line-indigo-amber)" 
              strokeWidth="2" 
              strokeDasharray="4 2"
              filter="url(#glow)"
            />

            {/* Ports / Sockets */}
            <circle cx="300" cy="90" r="4" fill="#06b6d4" />
            <circle cx="300" cy="240" r="4" fill="#06b6d4" />
            <circle cx="350" cy="150" r="4" fill="#6366f1" />
            <circle cx="350" cy="170" r="4" fill="#6366f1" />
            <circle cx="620" cy="150" r="4" fill="#6366f1" />
            <circle cx="620" cy="170" r="4" fill="#6366f1" />
            <circle cx="670" cy="90" r="4.5" fill="#f43f5e" />
            <circle cx="670" cy="240" r="4" fill="#f59e0b" />
          </svg>

          {/* Render Nodes */}
          {filteredNodes.map(node => {
            const isSelected = selectedNode?.id === node.id;
            const isEmerald = node.tagColor === 'emerald';
            const isCyan = node.tagColor === 'cyan';
            const isIndigo = node.tagColor === 'indigo';
            const isRose = node.tagColor === 'rose';
            const isAmber = node.tagColor === 'amber';

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.width}px`,
                }}
                className={`p-3 rounded-lg border text-xs cursor-pointer transition-all duration-200 z-10 glass-panel ${
                  isSelected 
                    ? 'ring-2 ring-cyber-cyan border-cyber-cyan shadow-glow-cyan' 
                    : isRose 
                    ? 'border-cyber-rose/60 hover:border-cyber-rose hover:shadow-glow-rose/40' 
                    : isAmber
                    ? 'border-cyber-amber/50 hover:border-cyber-amber hover:shadow-glow-amber/40'
                    : isCyan
                    ? 'border-cyber-cyan/40 hover:border-cyber-cyan hover:shadow-glow-cyan/30'
                    : 'border-obsidian-750 hover:border-cyber-emerald/60 hover:shadow-glow-emerald/30'
                }`}
              >
                {/* Node Sub-Header */}
                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5 pb-1 border-b border-obsidian-800">
                  <span className="text-obsidian-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isRose ? 'bg-cyber-rose animate-ping' : isAmber ? 'bg-cyber-amber' : isCyan ? 'bg-cyber-cyan' : 'bg-cyber-emerald'
                    }`}></span>
                    {node.category}
                  </span>
                  <span className={`px-1.5 py-0.2 rounded font-semibold text-[9px] uppercase ${
                    isRose 
                      ? 'bg-cyber-rose/20 text-cyber-rose border border-cyber-rose/40' 
                      : isAmber 
                      ? 'bg-cyber-amber/20 text-cyber-amber border border-cyber-amber/40' 
                      : isCyan 
                      ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40' 
                      : 'bg-cyber-emerald/20 text-cyber-emerald border border-cyber-emerald/40'
                  }`}>
                    {node.tag}
                  </span>
                </div>

                {/* Node Title & Description */}
                <h4 className="font-semibold text-obsidian-50 text-xs mb-1 tracking-tight">
                  {node.title}
                </h4>
                <p className="text-[11px] text-obsidian-300 leading-relaxed mb-2.5 line-clamp-2">
                  {node.description}
                </p>

                {/* Node Footer Stats */}
                <div className="flex items-center justify-between text-[10px] font-mono pt-1.5 border-t border-obsidian-800/80 text-obsidian-400">
                  <span className="text-obsidian-300">{node.meta1}</span>
                  <span className={`font-semibold ${
                    isRose ? 'text-cyber-rose' : isAmber ? 'text-cyber-amber' : isCyan ? 'text-cyber-cyan' : 'text-cyber-emerald'
                  }`}>
                    {node.meta2}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* DAG Minimap (Bottom-Right overlay matching Stitch screenshot) */}
        <div className="absolute bottom-4 right-4 bg-obsidian-900/90 border border-obsidian-750 p-2.5 rounded-lg shadow-lg font-mono text-[10px] w-48 z-20 backdrop-blur-md">
          <div className="flex justify-between items-center text-obsidian-400 mb-1.5">
            <span className="font-bold text-[9px] uppercase tracking-wider text-obsidian-300">DAG MINIMAP</span>
            <span className="text-cyber-cyan font-semibold">{zoomLevel}% ZOOM</span>
          </div>
          {/* Mini node points diagram */}
          <div className="relative h-14 bg-obsidian-950 rounded border border-obsidian-800 p-1.5 flex items-center justify-between">
            <div className="space-y-1.5">
              <div className="w-4 h-2 bg-cyber-emerald/80 rounded-sm"></div>
              <div className="w-4 h-2 bg-cyber-cyan/80 rounded-sm"></div>
            </div>
            <div className="w-5 h-2.5 bg-cyber-indigo/80 rounded-sm"></div>
            <div className="space-y-1.5">
              <div className="w-4 h-2 bg-cyber-rose/80 rounded-sm animate-pulse"></div>
              <div className="w-4 h-2 bg-cyber-amber/80 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Legend (Bottom-Left overlay) */}
        <div className="absolute bottom-4 left-6 flex flex-wrap items-center gap-3 text-[11px] font-mono text-obsidian-400 bg-obsidian-900/80 px-3 py-1.5 rounded-md border border-obsidian-750/70 z-20">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan"></span>
            <span>Product</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-indigo"></span>
            <span>Engineering</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-amber"></span>
            <span>QA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-rose"></span>
            <span className="text-cyber-rose font-medium">Security Blocked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald"></span>
            <span>DevOps</span>
          </div>
        </div>
      </div>

      {/* Node Details Inspection Drawer / Modal */}
      {selectedNode && (
        <div className="p-4 bg-obsidian-850 border-t border-obsidian-750 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono animate-fadeIn">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-cyber-cyan font-bold">{selectedNode.category}</span>
              <span className="text-obsidian-400">|</span>
              <span className="text-obsidian-200 font-semibold">{selectedNode.title}</span>
            </div>
            <p className="text-obsidian-300 font-sans text-xs">
              {selectedNode.description}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => alert(`Inspecting node: ${selectedNode.title}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/25 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Inspect Telemetry</span>
            </button>
            <button 
              onClick={() => setSelectedNode(null)}
              className="p-1.5 rounded bg-obsidian-750 text-obsidian-400 hover:text-obsidian-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
