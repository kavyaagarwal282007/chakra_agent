/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, Project } from './types';
import { INITIAL_PROJECTS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LandingPage } from './components/LandingPage';
import { AuthScreen } from './components/AuthScreen';
import { ProjectsScreen } from './components/ProjectsScreen';
import { WorkspaceScreen } from './components/WorkspaceScreen';
import { ReviewReleaseScreen } from './components/ReviewReleaseScreen';
import { DiffModal } from './components/DiffModal';
import { NewProjectModal } from './components/NewProjectModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { NotificationDrawer } from './components/NotificationDrawer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [, setSelectedProjectId] = useState<string>('account-service');

  // Modals & overlays state
  const [diffModalOpen, setDiffModalOpen] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const handleCreateProject = (newProj: Partial<Project>) => {
    const created: Project = {
      id: `proj-${Date.now()}`,
      name: newProj.name || 'New Service',
      category: newProj.category || 'Backend',
      repo: newProj.repo || 'github.com/acme/service',
      branch: newProj.branch || 'main',
      status: 'verified',
      description: newProj.description || 'Autonomous scaffold microservice.',
      testCount: '12 / 12 tests passing',
      lastRun: 'Scaffold run',
      lastDeployed: 'Just now',
      hasFailure: false,
    };
    setProjects([created, ...projects]);
  };

  const handleConfirmMerge = () => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === 'account-service'
          ? { ...p, lastDeployed: 'Just now (Staging Canary Live)' }
          : p
      )
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentScreen} />;
      case 'auth':
        return (
          <AuthScreen
            onLoginSuccess={() => setCurrentScreen('projects')}
            onNavigate={setCurrentScreen}
          />
        );
      case 'projects':
        return (
          <ProjectsScreen
            projects={projects}
            onSelectProject={(id) => setSelectedProjectId(id)}
            onNavigate={setCurrentScreen}
            onOpenNewProjectModal={() => setNewProjectModalOpen(true)}
          />
        );
      case 'workspace':
        return (
          <WorkspaceScreen
            onNavigate={setCurrentScreen}
            onOpenDiffModal={() => setDiffModalOpen(true)}
          />
        );
      case 'review':
        return (
          <ReviewReleaseScreen
            onNavigate={setCurrentScreen}
            onOpenDiffModal={() => setDiffModalOpen(true)}
            onOpenConfirmationModal={() => setConfirmationModalOpen(true)}
          />
        );
      default:
        return <LandingPage onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans selection:bg-primary-fixed selection:text-primary">
      {/* Top Global Navigation Bar - Standardized & Naturally Responsive */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenNotifications={() => {
          setNotificationsOpen(true);
          setUnreadNotifications(0);
        }}
        unreadCount={unreadNotifications}
      />

      {/* Main Responsive Viewport */}
      <main className="flex-1 flex flex-col w-full">
        {renderScreen()}
      </main>

      {/* Mobile Bottom Navigation for App Screens (Handheld devices only) */}
      {['projects', 'workspace', 'review'].includes(currentScreen) && (
        <div className="block md:hidden">
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        </div>
      )}

      {/* Modals & Overlays */}
      <DiffModal isOpen={diffModalOpen} onClose={() => setDiffModalOpen(false)} />

      <NewProjectModal
        isOpen={newProjectModalOpen}
        onClose={() => setNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />

      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={handleConfirmMerge}
      />

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onNavigateToReview={() => setCurrentScreen('review')}
      />
    </div>
  );
}
