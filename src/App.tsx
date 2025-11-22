import React, { useState } from 'react';
import { speciesList } from './data/species';
import type { SpeciesProfile } from './types/species';

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

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/95 bg-[radial-gradient(circle_at_top_left,#10b98133,transparent_60%)] px-4 py-3">
        <div className="mx-auto flex max-w-5xl flex-col gap-1">
          <h1 className="text-lg font-semibold tracking-tight">
            Reptile Handbook PWA
          </h1>
          <p className="text-xs text-slate-400">
            Vård, avel & rehabilitering – reptiler, spindlar & skorpioner
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
        {activeTab === 'species' && <SpeciesPage />}
        {activeTab === 'care' && <CarePage />}
        {activeTab === 'breeding' && <BreedingPage />}
        {activeTab === 'rehab' && <RehabPage />}
        {activeTab === 'tools' && <ToolsPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/95 px-4 py-2 text-center text-[0.7rem] text-slate-500">
        Reptile Handbook – byggd för nördar, räddare & reptiler 🐍🕷️🦂
      </footer>
    </div>
  );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-black/40">
    <h2 className="mb-2 text-base font-semibold tracking-tight">{title}</h2>
    <div className="space-y-2 text-sm text-slate-200">{children}</div>
  </section>
);

/* --- Sidor --- */

const HomePage: React.FC = () => (
  <div className="space-y-4">
    <Card title="Välkommen till reptilhandboken">
      <p>
        Här bygger vi en PWA-handbok för reptiler & exotiska djur: ormar,
        ödlor, groddjur, spindlar, skorpioner och fler.
      </p>
      <p>
        Fokus ligger på <strong>vård, avel, rehabilitering & rescue-tänk</strong>.
        Strukturen finns – innehållet fyller vi på steg för steg.
      </p>
    </Card>

    <Card title="Vad som kommer sen">
      <ul className="list-disc space-y-1 pl-5">
        <li>Artprofiler i JSON (ormar, spindlar, skorpioner m.m.)</li>
        <li>Formulär för att skapa nya artprofiler direkt i appen</li>
        <li>Rehab- och karantänprotokoll för rescue-verksamhet</li>
        <li>PWA-stöd: offline-läge & installation på mobilen</li>
      </ul>
    </Card>
  </div>
);

const SpeciesPage: React.FC = () => {
  const hasSpecies = speciesList.length > 0;

  return (
    <div className="space-y-4">
      <Card title="Artprofiler">
        <p>
          Här listas arter som finns inlagda i handboken. Senare kan vi lägga
          till filtrering (orm/spindel/skorpion, svårighetsgrad, gift osv.).
        </p>
        <p className="text-xs text-slate-400">
          Just nu ligger bara Kungspyton inne som demo-data.
        </p>
      </Card>

      <Card title="Alla artprofiler (demo)">
        {!hasSpecies && <p>Inga artprofiler inlagda ännu.</p>}

        {hasSpecies && (
          <ul className="space-y-2">
            {speciesList.map((sp: SpeciesProfile) => (
              <li
                key={sp.id}
                className="flex flex-col gap-1 rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">
                      {sp.commonName}{' '}
                      <span className="text-xs italic text-slate-400">
                        ({sp.scientificName})
                      </span>
                    </p>
                    <p className="text-xs capitalize text-slate-400">
                      Grupp: {sp.group} • Svårighetsgrad: {sp.careLevel}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[0.65rem]">
                    {sp.venomous && (
                      <span className="rounded-full bg-red-600/80 px-2 py-0.5 text-[0.65rem]">
                        Giftig
                      </span>
                    )}
                    {sp.potentiallyDangerous && !sp.venomous && (
                      <span className="rounded-full bg-amber-500/80 px-2 py-0.5 text-[0.65rem]">
                        Potentiellt farlig
                      </span>
                    )}
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5">
                      {sp.activity}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300">
                  Ursprung: {sp.origin.join(', ')}
                </p>

                <div className="flex flex-wrap gap-1 text-[0.65rem] text-slate-300">
                  {sp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-800 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

const CarePage: React.FC = () => (
  <Card title="Vård & Miljö">
    <p>
      Här hamnar guider om temperatur, luftfuktighet, terrariumupplägg,
      karantän och generellt husbandry för reptiler & exotiska djur.
    </p>
  </Card>
);

const BreedingPage: React.FC = () => (
  <Card title="Avel">
    <p>
      Här kommer avelssektionen: generella avelsguider, art-specifika
      avelstips och struktur för att dokumentera kullar.
    </p>
  </Card>
);

const RehabPage: React.FC = () => (
  <Card title="Rehab & Rescue">
    <p>
      Här bygger vi protokoll för intag, karantän, vanliga skador/sjukdomar
      och hur man arbetar med räddade reptiler på ett etiskt och
      strukturerat sätt.
    </p>
  </Card>
);

const ToolsPage: React.FC = () => (
  <Card title="Formulär & Verktyg">
    <p>
      Här kommer formulär för att skapa nya artprofiler, rehabjournaler och
      avelsloggar. Tanken är att appen ska kunna generera JSON som du kan
      lägga in i GitHub-repot.
    </p>
  </Card>
);

const AboutPage: React.FC = () => (
  <Card title="Om projektet">
    <p>
      Det här är tänkt som en community-vänlig handbok för seriös skötsel,
      avel & rehabilitering av reptiler och exotiska djur.
    </p>
    <p>
      Vision: bli “reptilvärldens katthem-wiki” – fast mer strukturerad,
      nördig och art-specifik.
    </p>
  </Card>
);

export default App;