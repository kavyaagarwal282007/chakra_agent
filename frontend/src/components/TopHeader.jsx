import React, { useState } from 'react';
import { 
  Search, 
  Play, 
  Pause, 
  PlusCircle, 
  Bell, 
  Layers, 
  SlidersHorizontal,
  RefreshCw,
  CheckCircle2,
  Share2,
  KeyRound,
  Zap,
  Loader2
} from 'lucide-react';
import { triggerPasswordResetDemo } from '../api';

export default function TopHeader({ onRefresh, onDeploy, isPaused, setIsPaused, onDemoTriggered }) {
  const [isDemoTriggering, setIsDemoTriggering] = useState(false);

  const handleDeployPasswordReset = async () => {
    try {
      setIsDemoTriggering(true);
      const res = await triggerPasswordResetDemo();
      if (onDemoTriggered) {
        onDemoTriggered(res?.message || 'Password reset hackathon demo dispatched.');
      }
    } catch (err) {
      console.error('Demo trigger error:', err);
    } finally {
      setTimeout(() => setIsDemoTriggering(false), 2000);
    }
  };

  return (
    <header className="border-b border-obsidian-750 bg-obsidian-900/90 backdrop-blur-md sticky top-0 z-30">
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-obsidian-800 text-xs">
        {/* Search */}
        <div className="flex items-center gap-2 bg-obsidian-950 border border-obsidian-750 rounded-md px-3 py-1.5 w-96 text-obsidian-400 focus-within:border-cyber-cyan focus-within:text-obsidian-200 transition-all">
          <Search className="w-3.5 h-3.5 shrink-0" />
          <input 
            type="text" 
            placeholder="Search telemetry, logs, agent tasks, CVEs... (Cmd+K)" 
            className="bg-transparent border-none outline-none text-xs text-obsidian-100 placeholder:text-obsidian-400 w-full"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-obsidian-800 text-obsidian-400 rounded border border-obsidian-700 font-mono">⌘K</kbd>
        </div>

        {/* Global Action Links & Swarm Engine State */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-5 text-obsidian-300 font-medium">
            <button className="hover:text-cyber-cyan transition-colors">Swarm DAG</button>
            <button className="hover:text-cyber-cyan transition-colors">Agent Logs</button>
            <button className="hover:text-cyber-cyan transition-colors">Live Telemetry</button>
            <div className="flex items-center gap-2 pl-2 border-l border-obsidian-750">
              <span className="text-obsidian-400">Run Pipeline</span>
              <span className="font-mono text-[10px] bg-cyber-emerald/15 text-cyber-emerald px-1.5 py-0.5 rounded border border-cyber-emerald/30">
                4,820 RPS
              </span>
              <span className="font-mono text-[10px] text-cyber-cyan bg-cyber-cyan/10 px-1.5 py-0.5 rounded border border-cyber-cyan/20">
                24ms
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-obsidian-750 pl-3">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono transition-all border ${
                isPaused 
                  ? 'bg-cyber-amber/15 text-cyber-amber border-cyber-amber/40 hover:bg-cyber-amber/25'
                  : 'bg-obsidian-800 text-obsidian-300 border-obsidian-700 hover:text-obsidian-100'
              }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Resume Engine' : 'Pause Engine'}</span>
            </button>

            <button 
              onClick={onDeploy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-obsidian-800 hover:bg-obsidian-750 text-obsidian-200 border border-obsidian-700 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Deploy Swarm</span>
            </button>

            <button className="p-1.5 text-obsidian-400 hover:text-obsidian-200 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyber-rose"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mission Control Breadcrumb & Action Banner */}
      <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-obsidian-400 mb-1">
            <span>Chakra 2.0</span>
            <span>&gt;</span>
            <span>Swarms</span>
            <span>&gt;</span>
            <span className="text-cyber-cyan">Cluster-Delta-09</span>
            <span>&gt;</span>
            <span className="text-obsidian-200 font-semibold">Overview</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-obsidian-50">
              Mission Control // Autonomous Agent Hub
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse"></span>
              SYNCED // 18ms
            </span>
          </div>
        </div>

        {/* Action Controls + Prominent Demo Button */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* PROMINENT DEMO BUTTON */}
          <button 
            onClick={handleDeployPasswordReset}
            disabled={isDemoTriggering}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold font-mono tracking-wide bg-gradient-to-r from-cyber-emerald via-cyber-emerald-glow to-cyber-cyan text-obsidian-950 hover:brightness-110 shadow-glow-emerald border border-cyber-emerald transition-all duration-200 active:scale-95 disabled:opacity-75"
          >
            {isDemoTriggering ? (
              <Loader2 className="w-4 h-4 animate-spin text-obsidian-950" />
            ) : (
              <KeyRound className="w-4 h-4 text-obsidian-950" />
            )}
            <span>DEPLOY PASSWORD RESET FEATURE</span>
          </button>

          <button 
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium bg-obsidian-800 hover:bg-obsidian-750 text-obsidian-200 border border-obsidian-700 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>Diagnostics</span>
          </button>

          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium bg-obsidian-800 hover:bg-obsidian-750 text-obsidian-200 border border-obsidian-700 transition-all shadow-sm"
          >
            <Pause className="w-3.5 h-3.5 text-cyber-amber" />
            <span>Pause Swarm</span>
          </button>
        </div>
      </div>
    </header>
  );
}
