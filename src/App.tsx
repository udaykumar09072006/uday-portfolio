import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SystemArchitectureSection } from './components/SystemArchitectureSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InterviewDashboard } from './components/InterviewDashboard';
import { ResumeModal } from './components/ResumeModal';
import { CyberCursor } from './components/CyberCursor';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CinematicFilmView } from './components/cinematic/CinematicFilmView';
import { PROJECTS, Project } from './data/portfolioData';

export default function App() {
  const [showCinematicIntro, setShowCinematicIntro] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'cinematic' | 'technical'>('cinematic');
  const [isInterviewModeOpen, setIsInterviewModeOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section for navbar indicators
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'system-design', 'achievements', 'contact', 'universe', 'chrono', 'gallery', 'finale'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIntroComplete = (targetSection?: string) => {
    setShowCinematicIntro(false);
    if (targetSection) {
      setTimeout(() => {
        handleNavigateToSection(targetSection);
      }, 150);
    }
  };

  const handleOpenProjectById = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (found) {
      setActiveProjectModal(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 relative selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Cinematic 3D Walk Intro Sequence on Initial Load or Replay */}
      {showCinematicIntro && (
        <CinematicIntro
          onComplete={handleIntroComplete}
        />
      )}

      {/* Cyber cursor tracker */}
      <CyberCursor />

      {/* Global Navigation Bar */}
      <Navbar
        onOpenInterviewMode={() => setIsInterviewModeOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onReplayIntro={() => setShowCinematicIntro(true)}
        currentMode={viewMode}
        onToggleMode={() => setViewMode((prev) => (prev === 'cinematic' ? 'technical' : 'cinematic'))}
        activeSection={activeSection}
      />

      {/* Primary Experience: 5-Scene Cinematic Film or Full Technical Spec View */}
      {viewMode === 'cinematic' ? (
        <CinematicFilmView
          onOpenProject={handleOpenProjectById}
          onOpenResume={() => setIsResumeModalOpen(true)}
          onOpenInterviewMode={() => setIsInterviewModeOpen(true)}
          onReplayWalkIntro={() => setShowCinematicIntro(true)}
          onSwitchToClassicView={() => setViewMode('technical')}
        />
      ) : (
        <main>
          {/* Full-Screen Cyber Hero */}
          <Hero
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            onOpenInterviewMode={() => setIsInterviewModeOpen(true)}
            onReplayIntro={() => setShowCinematicIntro(true)}
            onSelectProjectId={handleOpenProjectById}
          />

          {/* About / System Profile */}
          <AboutSection />

          {/* Technical Skills Matrix */}
          <SkillsSection />

          {/* Featured Projects Command Center */}
          <ProjectsSection />

          {/* System Architecture & Latency Simulator */}
          <SystemArchitectureSection />

          {/* Verified DSA Milestones & Certifications */}
          <AchievementsSection />

          {/* Dedicated Curriculum Vitae / Resume Area */}
          <ResumeSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />

          {/* Connection Request / Contact Terminal */}
          <ContactSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />

          {/* Technical View Footer */}
          <Footer
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            onReplayIntro={() => setShowCinematicIntro(true)}
          />
        </main>
      )}

      {/* Interviewer-Focused Dashboard Modal */}
      <InterviewDashboard
        isOpen={isInterviewModeOpen}
        onClose={() => setIsInterviewModeOpen(false)}
        onNavigateToSection={handleNavigateToSection}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Official Curriculum Vitae Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </div>
  );
}
