import React, { useState } from 'react';
import { Project } from '../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Partial<Project>) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('ts');
  const [repo, setRepo] = useState('');
  const [autoGenTests, setAutoGenTests] = useState(true);
  const [runLinter, setRunLinter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onCreateProject({
        name: name.trim(),
        description: description.trim() || 'Custom microservice sandbox generated with Chakra Agent.',
        category: language === 'ts' ? 'TypeScript' : language === 'py' ? 'Python' : language === 'go' ? 'Go' : 'Rust',
        repo: repo.trim() || `github.com/acme/${name.toLowerCase().replace(/\s+/g, '-')}`,
        branch: 'main',
        status: 'verified',
        testCount: '12 / 12 tests passing',
        lastRun: 'Initial scaffold verification',
        lastDeployed: 'Just now',
        hasFailure: false,
      });
      setIsSubmitting(false);
      setName('');
      setDescription('');
      setRepo('');
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full sm:max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto space-y-4 border border-outline-variant/30">
        <div className="w-10 h-1 bg-surface-variant rounded-full mx-auto sm:hidden -mt-1 mb-1"></div>

        <div className="flex items-center justify-between pb-1">
          <div>
            <h3 className="font-bold text-lg text-on-surface">New Engineering Project</h3>
            <p className="text-xs text-on-surface-variant">Bootstrap an autonomous development workspace</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Project Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Analytics Pipeline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 px-3 rounded-xl bg-surface-container-low text-on-surface text-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30 transition-all shadow-xs"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Short Description</label>
            <textarea
              rows={2}
              placeholder="Describe the service or system..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 rounded-xl bg-surface-container-low text-on-surface text-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30 resize-none transition-all shadow-xs"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Programming Language</label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface text-sm outline-none appearance-none border border-outline-variant/30 pr-9 focus:ring-2 focus:ring-primary transition-all shadow-xs cursor-pointer"
              >
                <option value="ts">TypeScript (Node.js 20 LTS)</option>
                <option value="py">Python (FastAPI 3.11)</option>
                <option value="go">Go (1.22 Standard Runtime)</option>
                <option value="rust">Rust (Tokio Async)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-on-surface-variant pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface">Git Repository URL (Optional)</label>
            <input
              type="url"
              placeholder="https://github.com/acme/analytics-stream"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="h-11 px-3 rounded-xl bg-surface-container-low text-on-surface text-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30 transition-all shadow-xs"
            />
          </div>

          <details className="group rounded-xl bg-surface-container-low p-3 border border-outline-variant/30">
            <summary className="list-none flex items-center justify-between cursor-pointer text-xs text-on-surface font-semibold select-none">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[17px] text-primary">tune</span>
                Advanced sandbox settings
              </span>
              <span className="material-symbols-outlined text-[18px] transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="pt-2.5 space-y-2 text-xs text-on-surface-variant">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoGenTests}
                  onChange={(e) => setAutoGenTests(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
                />
                <span>Auto-generate unit test harness in isolated VM</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={runLinter}
                  onChange={(e) => setRunLinter(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
                />
                <span>Run verified AST linter on commit</span>
              </label>
            </div>
          </details>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 bg-surface-container-high hover:bg-surface-container text-on-surface text-sm font-semibold rounded-xl transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="flex-1 h-11 bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                  <span>Creating Sandbox...</span>
                </>
              ) : (
                <>
                  <span>Create Project</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
