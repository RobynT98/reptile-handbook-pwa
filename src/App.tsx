import React, { useState, useMemo } from 'react';
import { baseSpeciesList } from './data/species';
import type { SpeciesProfile } from './types/species';
import { useLocalSpecies } from './hooks/useLocalSpecies';

import HomePage from './pages/HomePage';
import SpeciesPage from './pages/SpeciesPage';
import CarePage from './pages/CarePage';
import BreedingPage from './pages/BreedingPage';
import RehabPage from './pages/RehabPage';
import ToolsPage from './pages/ToolsPage';
import AboutPage from './pages/AboutPage';

type TabKey =
  | 'home'
  | 'species'
  | 'care'
  | 'breeding'
  | 'rehab'
  | 'tools'
  | 'about';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Hem' },
  { key: 'species', label: 'Artprofiler' },
  { key: 'care', label: 'Vård & Miljö' },
  { key: 'breeding', label: 'Avel' },
  { key: 'rehab', label: 'Rehab & Rescue' },
  { key: 'tools', label: 'Formulär & Verktyg' },
  { key: 'about', label: 'Om projektet' }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const { localSpecies, addSpecies, clearSpecies } = useLocalSpecies();

  const combinedSpecies: SpeciesProfile[] = useMemo(
    () => [...baseSpeciesList, ...localSpecies],
    [localSpecies]
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/95 bg-[radial-gradient(circle_at_top_left,#10b98133,transparent_60%)] px-4 py-3">
        <div className="mx-auto flex max-w-5xl flex-col gap-1">
          <h1 className="text-lg font-semibold tracking-tight">
            Reptile Handbook PWA
          </h1>
          <p className="text-xs text-slate-400">
            Vård, avel &amp; rehabilitering – reptiler, spindlar &amp; skorpioner
          </p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-2 py-1">
          {TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={[
                  'whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition',
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/30'
                    : 'bg-transparent text-slate-300 hover:bg-slate-800/70'
                ].join(' ')}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-4">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'species' && <SpeciesPage species={combinedSpecies} />}
        {activeTab === 'care' && <CarePage />}
        {activeTab === 'breeding' && <BreedingPage />}
        {activeTab === 'rehab' && <RehabPage />}
        {activeTab === 'tools' && (
          <ToolsPage
            onCreateSpecies={addSpecies}
            onClearLocal={clearSpecies}
            localCount={localSpecies.length}
          />
        )}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/95 px-4 py-2 text-center text-[0.7rem] text-slate-500">
        Reptile Handbook – byggd för nördar, räddare &amp; reptiler 🐍🕷️🦂
      </footer>
    </div>
  );
};

export default App;