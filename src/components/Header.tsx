import React, { useState } from 'react';
import { LogOut, BookOpen, Award, FileText, LayoutDashboard, Menu, X, Lock } from 'lucide-react';

interface HeaderProps {
  candidateName: string;
  activeView: 'dashboard' | 'chapters' | 'chapter-detail' | 'assessment' | 'final-assessment' | 'report';
  onNavigate: (view: 'dashboard' | 'chapters' | 'final-assessment' | 'report') => void;
  onLogout: () => void;
  hasReport: boolean;
  hasFinalScore: boolean;
  allChaptersCleared: boolean;
  chaptersPassedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  candidateName,
  activeView,
  onNavigate,
  onLogout,
  hasReport,
  hasFinalScore,
  allChaptersCleared,
  chaptersPassedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chapters', label: 'Chapters', icon: BookOpen },
    {
      id: 'final-assessment',
      label: 'Final Assessment',
      icon: allChaptersCleared ? Award : Lock,
      disabled: !allChaptersCleared,
      lockBadge: !allChaptersCleared ? `${chaptersPassedCount}/11` : undefined
    },
    { id: 'report', label: 'Assessment Report', icon: FileText, disabled: !hasReport && !hasFinalScore }
  ] as const;

  const handleNavClick = (viewId: 'dashboard' | 'chapters' | 'final-assessment' | 'report') => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  const isCurrentActive = (viewId: string) => {
    if (viewId === 'dashboard' && activeView === 'dashboard') return true;
    if (viewId === 'chapters' && (activeView === 'chapters' || activeView === 'chapter-detail' || activeView === 'assessment')) return true;
    if (viewId === 'final-assessment' && activeView === 'final-assessment') return true;
    if (viewId === 'report' && activeView === 'report') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Alt India Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
            <img
              src="/assets/aistudio/Alt_India_Logo_Badge_55f5ec60.png"
              alt="Alt India"
              className="h-8 w-auto object-contain"
            />
            <div>
              <div className="text-sm font-bold text-slate-900 tracking-tight leading-none">
                Alt India Sales Counselling
              </div>
              <div className="text-[11px] text-slate-500 font-normal tracking-wide mt-0.5">
                Training & Assessment
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isCurrentActive(item.id);
              const disabled = 'disabled' in item && item.disabled;
              const lockBadge = 'lockBadge' in item ? item.lockBadge : undefined;

              return (
                <button
                  key={item.id}
                  onClick={() => !disabled && handleNavClick(item.id)}
                  disabled={disabled}
                  title={disabled && item.id === 'final-assessment' ? `Clear all 11 chapters to unlock (${chaptersPassedCount}/11 cleared)` : undefined}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    active
                      ? 'text-slate-950 font-semibold bg-slate-100/90'
                      : disabled
                      ? 'text-slate-400 opacity-60 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {lockBadge && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-mono">
                      {lockBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User profile & Logout */}
          <div className="hidden md:flex items-center space-x-3 border-l border-slate-200/80 pl-4">
            <div className="text-right">
              <div className="text-xs font-medium text-slate-900">{candidateName}</div>
              <div className="text-[10px] text-slate-500">Counsellor</div>
            </div>

            <button
              onClick={onLogout}
              className="text-xs text-slate-600 hover:text-rose-600 font-medium px-2.5 py-1.5 rounded-md hover:bg-rose-50 transition-colors flex items-center gap-1"
              title="Logout session (data remains saved)"
              aria-label="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center space-x-2">
            <span className="text-xs font-medium text-slate-700 truncate max-w-[110px]">
              {candidateName}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const active = isCurrentActive(item.id);
            const disabled = 'disabled' in item && item.disabled;

            return (
              <button
                key={item.id}
                onClick={() => !disabled && handleNavClick(item.id)}
                disabled={disabled}
                className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md flex items-center gap-2 ${
                  active
                    ? 'text-slate-900 bg-slate-100 font-semibold'
                    : disabled
                    ? 'text-slate-400 opacity-40 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">{candidateName}</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLogout();
              }}
              className="text-xs text-rose-600 font-medium px-3 py-1.5 rounded hover:bg-rose-50 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
