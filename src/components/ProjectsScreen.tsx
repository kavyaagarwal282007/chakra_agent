import React, { useState } from 'react';
import { Project, ScreenType } from '../types';
import { ChakraLogo } from './ChakraLogo';

interface ProjectsScreenProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenNewProjectModal: () => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  projects,
  onSelectProject,
  onNavigate,
  onOpenNewProjectModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'passing' | 'needs_review'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.repo.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'passing') return project.status === 'verified';
    if (filter === 'needs_review') return project.status === 'needs_recovery';
    return true;
  });

  const passingCount = projects.filter((p) => p.status === 'verified').length;
  const reviewCount = projects.filter((p) => p.status === 'needs_recovery').length;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3 min-w-0">
          <ChakraLogo size="md" animated />
          <div className="flex flex-col min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Engineering Projects
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              Autonomous multi-agent workspaces running isolated sandboxes.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNewProjectModal}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 h-11 bg-primary hover:bg-[#0047af] text-white rounded-xl font-semibold text-sm shadow-[0_2px_10px_rgba(0,84,202,0.25)] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Multi-Agent Command Telemetry Banner */}
      <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">monitoring</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-on-surface">Agent Mesh Status</span>
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span className="text-[11px] font-semibold text-tertiary">All Invariants Active</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              3 active sandboxes • 42 unit test assertions evaluated in the last 15 mins
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-on-surface-variant self-start md:self-auto pt-2 md:pt-0 border-t md:border-t-0 border-outline-variant/15">
          <div>
            <span className="text-outline block text-[10px]">AVG RECOVERY</span>
            <span className="font-bold text-secondary text-sm">820 ms</span>
          </div>
          <div className="w-px h-6 bg-outline-variant/30" />
          <div>
            <span className="text-outline block text-[10px]">REGRESSION INDEX</span>
            <span className="font-bold text-tertiary text-sm">0.00%</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === 'all'
                ? 'bg-surface-container-high text-on-surface shadow-xs border border-outline-variant/30'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/20'
            }`}
          >
            All Projects ({projects.length})
          </button>
          <button
            onClick={() => setFilter('passing')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              filter === 'passing'
                ? 'bg-surface-container-high text-on-surface shadow-xs border border-outline-variant/30'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span>Passing ({passingCount})</span>
          </button>
          <button
            onClick={() => setFilter('needs_review')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              filter === 'needs_review'
                ? 'bg-surface-container-high text-on-surface shadow-xs border border-outline-variant/30'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>Needs Recovery ({reviewCount})</span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 h-9 pl-9 pr-3 text-xs bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 flex flex-col space-y-4 relative overflow-hidden hover:shadow-md transition-shadow"
          >
            {project.status === 'verified' && (
              <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10"></div>
            )}

            {/* Top row */}
            <div className="flex items-start justify-between gap-3 relative">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    project.status === 'verified'
                      ? 'bg-primary-fixed text-primary'
                      : 'bg-secondary-fixed text-secondary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {project.id === 'account-service'
                      ? 'dns'
                      : project.id === 'pay-gateway'
                      ? 'payments'
                      : 'forward_to_inbox'}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold text-on-surface truncate">
                      {project.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <div className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">device_hub</span>
                    <span className="truncate">{project.repo}</span>
                    <span className="px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant text-[10px] font-mono">
                      {project.branch}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              {project.status === 'verified' ? (
                <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>Verified</span>
                </span>
              ) : (
                <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">build_circle</span>
                  <span>Needs Recovery</span>
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Agent Collaboration Micro-Strip */}
            <div className="flex items-center gap-2 flex-wrap text-[11px]">
              <span className="text-outline font-medium">Assigned Agents:</span>
              <span className="px-2 py-0.5 rounded-md bg-surface-container text-primary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">psychology</span>
                Product Architect
              </span>
              <span className="px-2 py-0.5 rounded-md bg-surface-container text-primary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">terminal</span>
                Engineering Agent
              </span>
              <span className="px-2 py-0.5 rounded-md bg-surface-container text-secondary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">healing</span>
                Recovery Agent
              </span>
            </div>

            {/* Test Status Row */}
            {project.status === 'verified' ? (
              <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between text-on-surface-variant text-xs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-tertiary">check</span>
                    <span className="font-semibold text-on-surface">{project.testCount}</span>
                  </span>
                  <span>{project.lastDeployed || '12m ago'}</span>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full w-full"></div>
                </div>
                <span className="text-[11px] text-on-surface-variant truncate">
                  Last run: <strong className="text-on-surface">{project.lastRun}</strong>
                </span>
              </div>
            ) : (
              <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between text-xs border border-outline-variant/20">
                <span className="flex items-center gap-1.5 text-error font-semibold">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  <span>{project.failureMessage || '3 tests failed (Retry Loop)'}</span>
                </span>
                <span className="text-secondary font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  Chakra Fix Ready
                </span>
              </div>
            )}

            {/* Bottom Row */}
            <div className="pt-1 flex items-center justify-between gap-3">
              <div className="flex items-center -space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary text-[10px] font-bold ring-2 ring-surface-container-lowest">
                  CA
                </div>
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-on-secondary text-[10px] font-bold ring-2 ring-surface-container-lowest">
                  AG
                </div>
                <div className="w-6 h-6 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary text-[10px] font-bold ring-2 ring-surface-container-lowest">
                  QA
                </div>
                <span className="text-on-surface-variant text-[11px] font-medium pl-3">
                  Autonomous Pair Active
                </span>
              </div>

              {project.status === 'verified' ? (
                <button
                  onClick={() => {
                    onSelectProject(project.id);
                    onNavigate('workspace');
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 h-10 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs sm:text-sm font-semibold shadow-xs active:scale-95 transition-all"
                >
                  <span>Open Workspace</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onSelectProject(project.id);
                    onNavigate('workspace');
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 h-10 bg-surface-container-high hover:bg-surface-container text-on-surface rounded-xl text-xs sm:text-sm font-semibold active:scale-95 transition-all border border-outline-variant/20"
                >
                  <span>Review &amp; Recover</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="p-8 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
            <p className="text-sm font-semibold text-on-surface">No projects match your filter</p>
            <p className="text-xs text-on-surface-variant mt-1">Try clearing your search query or reset filter.</p>
          </div>
        )}
      </div>

      {/* Tip Card */}
      <div className="bg-surface-container rounded-2xl p-4 sm:p-5 shadow-xs border border-outline-variant/30 flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]">lightbulb</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-bold text-on-surface">Isolated Safe Execution</span>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            Chakra Agent tests all generated code in an isolated Docker sandbox before opening pull requests or applying diffs.
          </p>
        </div>
      </div>
    </div>
  );
};
