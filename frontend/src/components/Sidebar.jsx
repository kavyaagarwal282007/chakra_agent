import React, { useState } from 'react';
import { 
  GitFork, 
  Cpu, 
  Activity, 
  Terminal, 
  Sliders, 
  ShieldAlert, 
  BookOpen, 
  Stethoscope, 
  Zap, 
  CircleDot,
  Radio
} from 'lucide-react';

export default function Sidebar({ activeNav, setActiveNav }) {
  const [killSwitchOpen, setKillSwitchOpen] = useState(false);

  const navItems = [
    { id: 'dag', label: 'DAG Pipeline', icon: GitFork, badge: null },
    { id: 'agents', label: 'Agent Nodes', icon: Cpu, badge: '5 ACT' },
    { id: 'telemetry', label: 'Telemetry Matrix', icon: Activity, badge: null },
    { id: 'terminal', label: 'Log Terminal', icon: Terminal, dot: true },
    { id: 'config', label: 'Swarm Config', icon: Sliders, badge: null },
  ];

  return (
    <aside className="w-64 bg-obsidian-900 border-r border-obsidian-750 flex flex-col justify-between shrink-0 select-none">
      {/* Top Branding */}
      <div>
        <div className="p-4 border-b border-obsidian-750 flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-obsidian-800 border border-cyber-emerald/40 shadow-glow-emerald">
            <Radio className="w-5 h-5 text-cyber-emerald animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyber-emerald rounded-full border-2 border-obsidian-900"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wider text-obsidian-50">SWARM-OS</span>
              <span className="text-[10px] bg-cyber-emerald/15 text-cyber-emerald px-1.5 py-0.5 rounded border border-cyber-emerald/30 font-mono">v4.2</span>
            </div>
            <div className="text-[11px] text-obsidian-400 font-mono">CHAKRA 2.0 HUB</div>
          </div>
        </div>

        {/* Cluster Status Pill Card */}
        <div className="m-3 p-3 rounded-lg bg-obsidian-850/90 border border-obsidian-750/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-obsidian-100">
              <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-ping"></span>
              <span>CLUSTER-DELTA-09</span>
            </div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-obsidian-400">
            <span>Latency: <strong className="text-cyber-cyan font-normal">18ms</strong></span>
            <span className="text-cyber-emerald">● 5/5 Online</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-2 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-all duration-150 ${
                  isActive 
                    ? 'bg-obsidian-800 text-cyber-cyan border-l-2 border-cyber-cyan shadow-sm' 
                    : 'text-obsidian-300 hover:text-obsidian-100 hover:bg-obsidian-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyber-cyan' : 'text-obsidian-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyber-emerald/15 text-cyber-emerald border border-cyber-emerald/30 font-semibold">
                    {item.badge}
                  </span>
                )}
                {item.dot && (
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan shadow-glow-cyan"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Resource Metrics & Killswitch */}
      <div className="p-3 border-t border-obsidian-750/80 space-y-3 bg-obsidian-950/40">
        <div className="space-y-2 text-xs">
          <div>
            <div className="flex justify-between text-[11px] text-obsidian-300 font-mono mb-1">
              <span>CLUSTER HEALTH</span>
              <span className="text-cyber-emerald font-semibold">99.8%</span>
            </div>
            <div className="w-full bg-obsidian-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyber-emerald h-full rounded-full" style={{ width: '99.8%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-obsidian-300 font-mono mb-1">
              <span>MEM (64.2 / 128 GB)</span>
              <span className="text-cyber-cyan">50%</span>
            </div>
            <div className="w-full bg-obsidian-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyber-cyan h-full rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-obsidian-300 font-mono mb-1">
              <span>GPU COMPUTE ARRAY</span>
              <span className="text-cyber-indigo">72%</span>
            </div>
            <div className="w-full bg-obsidian-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyber-indigo h-full rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
        </div>

        {/* Emergency Kill Switch Button */}
        <button
          onClick={() => setKillSwitchOpen(!killSwitchOpen)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded border border-cyber-rose/60 text-cyber-rose hover:bg-cyber-rose/10 transition-colors text-xs font-mono font-semibold tracking-wider hover:shadow-glow-rose"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>KILL SWITCH</span>
        </button>

        {killSwitchOpen && (
          <div className="p-2 rounded bg-cyber-rose/15 border border-cyber-rose/40 text-[11px] text-cyber-rose font-mono">
            ⚠️ Safety lock engaged. Swarm quorum override required to halt all autonomous agents.
          </div>
        )}

        {/* Footer Meta */}
        <div className="pt-2 border-t border-obsidian-800 space-y-1 text-[11px] text-obsidian-400">
          <div className="flex items-center gap-2 hover:text-obsidian-200 cursor-pointer py-1">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Diagnostics</span>
          </div>
          <div className="flex items-center gap-2 hover:text-obsidian-200 cursor-pointer py-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentation</span>
          </div>
          <div className="pt-2 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-obsidian-700 border border-obsidian-600 flex items-center justify-center font-mono text-xs font-bold text-cyber-cyan">
              AC
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-obsidian-200 truncate">Alex Chen</div>
              <div className="text-[10px] text-obsidian-400 truncate">Principal Architect</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
