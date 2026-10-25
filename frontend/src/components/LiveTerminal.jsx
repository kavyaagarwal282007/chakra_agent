import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  Download, 
  Trash2, 
  Pause, 
  Play, 
  Search, 
  Copy, 
  Check, 
  Radio, 
  ShieldAlert,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { fetchStatus, triggerPasswordResetDemo } from '../api';

export default function LiveTerminal() {
  const [activeTab, setActiveTab] = useState('all');
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [copied, setCopied] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [backendSync, setBackendSync] = useState(false);
  const logContainerRef = useRef(null);

  // Initial fallback logs
  const [logs, setLogs] = useState([
    {
      id: 1,
      time: '14:28:01.402',
      agent: 'PRODUCT',
      agentColor: 'text-cyber-cyan',
      level: 'SUCCESS',
      levelColor: 'bg-cyber-emerald/15 text-cyber-emerald border-cyber-emerald/30',
      message: 'PRD #104 section 3.2 generated with 12 validation invariants. Handoff to Task #210 dispatched.',
      type: 'log'
    },
    {
      id: 2,
      time: '14:28:02.118',
      agent: 'DEV',
      agentColor: 'text-cyber-indigo',
      level: 'INFO',
      levelColor: 'bg-cyber-indigo/15 text-cyber-indigo border-cyber-indigo/30',
      message: 'Compiled auth_service.go : 0 errors, 42 tests passed in 1.4s. Branch feat/auth-v2 in sync.',
      type: 'log'
    },
    {
      id: 3,
      time: '14:28:02.450',
      agent: 'DEV',
      type: 'diff',
      fileName: 'DIFF // pkg/auth/token_rotator.go (PR #842)',
      diffStats: '+12 -4 lines',
      diffLines: [
        { type: 'remove', text: '- func ValidateTokenOld(token string, secret []byte) (*Claims, error)' },
        { type: 'add', text: '+ func ValidateToken(ctx context.Context, claims *JWTClaims, keySet JWKSResolver) error' },
        { type: 'add', text: '+ return keySet.VerifySignature(ctx, claims.Header.Kid, claims.RawToken)' }
      ]
    }
  ]);

  // Polling backend /api/status for live terminal_logs array
  useEffect(() => {
    let isMounted = true;

    const pollLogs = async () => {
      const data = await fetchStatus();
      if (!isMounted) return;

      if (data && Array.isArray(data.terminal_logs) && data.terminal_logs.length > 0) {
        setBackendSync(true);
        setLogs(prev => {
          // If backend logs has entries, update or append while preserving local exec commands
          const backendIds = new Set(data.terminal_logs.map(l => l.id));
          const localUserCommands = prev.filter(l => l.agent === 'OPERATOR_LOCAL' && !backendIds.has(l.id));
          return [...data.terminal_logs, ...localUserCommands];
        });
      } else {
        setBackendSync(false);
      }
    };

    pollLogs();
    const interval = setInterval(pollLogs, 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Auto-scroll to bottom as new logs arrive
  useEffect(() => {
    if (isAutoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isAutoScroll]);

  // Handle command submission in terminal
  const handleCommand = async (e) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim().toLowerCase();
    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${now.getMilliseconds().toString().padStart(3, '0')}`;

    if (cmd === 'clear') {
      setLogs([]);
      setCommandInput('');
      return;
    }

    if (cmd === 'deploy-demo' || cmd === 'deploy' || cmd === 'password-reset') {
      try {
        await triggerPasswordResetDemo();
      } catch (err) {
        console.error(err);
      }
      setCommandInput('');
      return;
    }

    let reply = `Command executed: ${cmd}`;
    let level = 'INFO';
    let levelColor = 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/30';

    if (cmd === 'help') {
      reply = 'Available commands: deploy-demo, cve-status, run-tests, clear, help';
    } else if (cmd === 'cve-status') {
      reply = 'Querying Security Agent CVE telemetry: active invariant verification running.';
    } else if (cmd === 'run-tests') {
      reply = 'Triggering synthetic test harness run across worker pool.';
      level = 'SUCCESS';
      levelColor = 'bg-cyber-emerald/15 text-cyber-emerald border-cyber-emerald/30';
    }

    setLogs(prev => [
      ...prev,
      {
        id: Date.now(),
        time: timeStr,
        agent: 'OPERATOR_LOCAL',
        agentColor: 'text-obsidian-200 font-bold',
        level: 'EXEC',
        levelColor: 'bg-obsidian-750 text-obsidian-100 border-obsidian-700',
        message: `$ ${cmd}`,
        type: 'log'
      },
      {
        id: Date.now() + 1,
        time: timeStr,
        agent: 'SWARM-ENGINE',
        agentColor: 'text-cyber-cyan',
        level: level,
        levelColor: levelColor,
        message: reply,
        type: 'log'
      }
    ]);

    setCommandInput('');
  };

  // Export logs as JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `chakra-telemetry-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy logs
  const handleCopyLogs = () => {
    const text = logs.map(l => l.type === 'diff' ? `${l.fileName}\n${(l.diffLines || []).map(d=>d.text).join('\n')}` : `[${l.time}] [${l.agent}] [${l.level}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter logs by tab & search
  const filteredLogs = logs.filter(l => {
    const ag = (l.agent || '').toUpperCase();
    if (activeTab === 'security' && !ag.includes('SEC')) return false;
    if (activeTab === 'product' && !ag.includes('PROD')) return false;
    if (activeTab === 'engineering' && !ag.includes('DEV') && !ag.includes('ENG')) return false;
    if (activeTab === 'qa' && !ag.includes('QA')) return false;
    if (activeTab === 'devops' && !ag.includes('OPS') && !ag.includes('DEVOPS')) return false;
    
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      const msg = (l.message || '').toLowerCase();
      return msg.includes(q) || ag.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section className="rounded-xl border border-obsidian-750 bg-obsidian-900/90 backdrop-blur-md overflow-hidden shadow-glow-card">
      {/* Top Console Bar */}
      <div className="px-5 py-3 border-b border-obsidian-750 flex flex-wrap items-center justify-between gap-3 bg-obsidian-950/70">
        <div>
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyber-emerald" />
            <h2 className="text-sm font-bold tracking-tight text-obsidian-50 font-mono flex items-center gap-2">
              Central Live Terminal Console
              {backendSync && (
                <span className="text-[10px] bg-cyber-emerald/15 text-cyber-emerald px-1.5 py-0.2 rounded border border-cyber-emerald/30 font-normal">
                  Live Feed: /api/status
                </span>
              )}
            </h2>
          </div>
          <p className="text-[11px] text-obsidian-400 mt-0.5">
            Line-rate sub-millisecond trace streaming from autonomous agent execution runtimes.
          </p>
        </div>

        {/* Console Controls */}
        <div className="flex items-center gap-3">
          <div className="text-[11px] font-mono text-obsidian-400">
            Stream Buffer: <strong className="text-cyber-cyan font-medium">{logs.length} lines</strong>
          </div>

          <div className="flex items-center gap-1.5 border-l border-obsidian-750 pl-3">
            <button 
              onClick={() => setIsAutoScroll(!isAutoScroll)}
              className={`px-2 py-1 rounded text-[10px] font-mono transition-colors border ${
                isAutoScroll 
                  ? 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/30' 
                  : 'bg-obsidian-800 text-obsidian-400 border-obsidian-700'
              }`}
              title="Toggle Auto-Scroll"
            >
              Auto-Scroll: {isAutoScroll ? 'ON' : 'PAUSED'}
            </button>

            <button 
              onClick={() => setLogs([])}
              className="p-1.5 rounded bg-obsidian-800 text-obsidian-400 hover:text-cyber-rose border border-obsidian-700 transition-colors"
              title="Clear terminal buffer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={handleCopyLogs}
              className="p-1.5 rounded bg-obsidian-800 text-obsidian-400 hover:text-obsidian-100 border border-obsidian-700 transition-colors"
              title="Copy all logs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button 
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono bg-obsidian-800 hover:bg-obsidian-750 text-obsidian-200 border border-obsidian-750 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Header Chrome (MacOS traffic lights + URI + Agent Tabs) */}
      <div className="px-4 py-2 border-b border-obsidian-800 bg-obsidian-950 flex flex-wrap items-center justify-between gap-3 select-none">
        {/* Left: Traffic dots & stream URI */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-rose"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-amber"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-emerald"></span>
          </div>
          <span className="font-mono text-[11px] text-obsidian-400">
            chakra-agent-runtime://cluster-delta-09/telemetry.stream
          </span>
        </div>

        {/* Right: Agent Filter Tabs */}
        <div className="flex items-center gap-1 text-[11px] font-mono">
          {[
            { id: 'all', label: 'All Agents', dot: true },
            { id: 'product', label: 'Product' },
            { id: 'engineering', label: 'Engineering' },
            { id: 'qa', label: 'QA' },
            { id: 'security', label: 'Security' },
            { id: 'devops', label: 'DevOps' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                activeTab === tab.id 
                  ? 'bg-obsidian-800 text-obsidian-100 font-semibold border border-obsidian-700 shadow-sm' 
                  : 'text-obsidian-400 hover:text-obsidian-200'
              }`}
            >
              {tab.dot && <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald"></span>}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Body with auto-scroll */}
      <div 
        ref={logContainerRef}
        className="p-4 bg-obsidian-950 min-h-[300px] max-h-[460px] overflow-y-auto font-mono text-[11.5px] leading-relaxed space-y-2 select-text"
      >
        {filteredLogs.map(log => {
          if (log.type === 'diff') {
            return (
              <div key={log.id} className="my-2.5 p-3 rounded-md bg-obsidian-900 border border-obsidian-800">
                <div className="flex items-center justify-between text-[11px] text-obsidian-400 pb-1.5 mb-2 border-b border-obsidian-800">
                  <span className="font-semibold text-cyber-indigo">{log.fileName}</span>
                  <span className="text-cyber-cyan">{log.diffStats}</span>
                </div>
                <div className="space-y-0.5 text-[11px]">
                  {(log.diffLines || []).map((line, idx) => (
                    <div 
                      key={idx} 
                      className={
                        line.type === 'remove' 
                          ? 'text-cyber-rose bg-cyber-rose/10 px-1 py-0.5 rounded' 
                          : 'text-cyber-emerald bg-cyber-emerald/10 px-1 py-0.5 rounded'
                      }
                    >
                      {line.text}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={log.id} className="flex items-start gap-2.5 hover:bg-obsidian-900/50 py-0.5 px-1 rounded transition-colors">
              <span className="text-obsidian-500 shrink-0">[{log.time}]</span>
              <span className={`shrink-0 font-semibold ${log.agentColor || 'text-cyber-cyan'}`}>
                [{log.agent}]
              </span>
              <span className={`shrink-0 px-1.5 py-0.2 rounded text-[10px] font-semibold border ${log.levelColor || 'bg-obsidian-800 text-obsidian-300 border-obsidian-700'}`}>
                [{log.level}]
              </span>
              <span className="text-obsidian-200 break-all">
                {log.message}
              </span>
            </div>
          );
        })}

        {/* Interactive Command Prompt Line with glowing blinking cursor */}
        <form onSubmit={handleCommand} className="pt-2 flex items-center gap-2 text-obsidian-300">
          <span className="text-cyber-cyan font-bold select-none">chakra-agent-hub@cluster-delta-09:~$</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type 'deploy-demo' or 'help'..."
            className="flex-1 bg-transparent border-none outline-none text-cyber-emerald font-mono text-[11.5px] placeholder:text-obsidian-600"
          />
          <span className="w-2 h-4 bg-cyber-emerald inline-block animate-blink"></span>
        </form>
      </div>

      {/* Terminal Status Footer */}
      <div className="px-4 py-2 border-t border-obsidian-800 bg-obsidian-950/90 flex flex-wrap items-center justify-between text-[11px] font-mono text-obsidian-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse"></span>
          <span className="text-obsidian-300">
            {backendSync ? 'Connected to FastAPI Backend (http://127.0.0.1:8000)' : 'Listening on live log stream'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Buffer: <strong className="text-cyber-cyan font-normal">{logs.length} lines</strong></span>
          <span>Encoding: <strong className="text-obsidian-200 font-normal">UTF-8</strong></span>
          <span className="text-cyber-emerald">● Auto-scroll active</span>
        </div>
      </div>
    </section>
  );
}
