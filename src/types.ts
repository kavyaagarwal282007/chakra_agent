export type ScreenType = 'landing' | 'auth' | 'projects' | 'workspace' | 'review';

export interface Project {
  id: string;
  name: string;
  category: string;
  repo: string;
  branch: string;
  status: 'verified' | 'needs_recovery' | 'building';
  description: string;
  testCount: string;
  lastRun: string;
  lastDeployed?: string;
  hasFailure?: boolean;
  failureMessage?: string;
  fixReady?: boolean;
}

export interface AgentActivity {
  id: string;
  agentName: string;
  agentType: 'product' | 'engineering' | 'qa' | 'recovery' | 'security';
  icon: string;
  time: string;
  status: 'ready' | 'compiled' | 'failure' | 'recovered' | 'verified' | 'running';
  statusText: string;
  message: string;
  codeSnippet?: string;
  tagColor?: string;
}

export interface VerificationCheck {
  id: string;
  title: string;
  statusText: string;
  statusType: 'passed' | 'warning' | 'info';
  description: string;
  linesAdded?: number;
  linesRemoved?: number;
  runtime?: string;
  recoveredNote?: string;
  metric?: string;
}
