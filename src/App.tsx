import React, { useState, useMemo, useState as useReactState } from 'react';
import { baseSpeciesList } from './data/species';
import type { SpeciesProfile } from './types/species';
import { useLocalSpecies } from './hooks/useLocalSpecies';

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
        Fokus ligger på <strong>vård, avel, rehabilitering &amp; rescue-tänk</strong>.
        Strukturen finns – innehållet fyller vi på steg för steg.
      </p>
    </Card>

    <Card title="Vad som kommer sen">
      <ul className="list-disc space-y-1 pl-5">
        <li>Artprofiler i JSON (ormar, spindlar, skorpioner m.m.)</li>
        <li>Formulär för att skapa nya artprofiler direkt i appen</li>
        <li>Rehab- och karantänprotokoll för rescue-verksamhet</li>
        <li>PWA-stöd: offline-läge &amp; installation på mobilen</li>
      </ul>
    </Card>
  </div>
);

const SpeciesPage: React.FC<{ species: SpeciesProfile[] }> = ({ species }) => {
  const hasSpecies = species.length > 0;

  return (
    <div className="space-y-4">
      <Card title="Artprofiler">
        <p>
          Här listas arter som finns inlagda i handboken. Senare kan vi lägga
          till filtrering (orm/spindel/skorpion, svårighetsgrad, gift osv.).
        </p>
        <p className="text-xs text-slate-400">
          Just nu finns grunddata (t.ex. Kungspyton) + det du själv lägger till via formuläret.
        </p>
      </Card>

      <Card title="Alla artprofiler">
        {!hasSpecies && <p>Inga artprofiler inlagda ännu.</p>}

        {hasSpecies && (
          <ul className="space-y-2">
            {species.map((sp: SpeciesProfile) => (
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

/* --- FORMULÄR-SIDA --- */

interface ToolsPageProps {
  onCreateSpecies: (sp: SpeciesProfile) => void;
  onClearLocal: () => void;
  localCount: number;
}

const ToolsPage: React.FC<ToolsPageProps> = ({
  onCreateSpecies,
  onClearLocal,
  localCount
}) => {
  return (
    <div className="space-y-4">
      <Card title="Formulär & Verktyg">
        <p>
          Här kan du lägga till nya artprofiler direkt i appen. De sparas
          lokalt i din webbläsare (localStorage), så du slipper öppna GitHub
          för vanlig användning.
        </p>
        <p className="text-xs text-slate-400">
          Vill du senare dela med världen kan du exportera datan manuellt och lägga in i repo – men det är inget tvång.
        </p>
        <p className="text-xs text-slate-400">
          Lokalt sparade artprofiler just nu: {localCount}
        </p>
        {localCount > 0 && (
          <button
            type="button"
            onClick={onClearLocal}
            className="mt-2 rounded border border-red-700 bg-red-900/30 px-2 py-1 text-[0.7rem] text-red-200 hover:bg-red-900/60"
          >
            Rensa alla lokalt skapade artprofiler
          </button>
        )}
      </Card>

      <Card title="Lägg till ny artprofil">
        <SpeciesForm onCreate={onCreateSpecies} />
      </Card>
    </div>
  );
};

interface SpeciesFormProps {
  onCreate: (sp: SpeciesProfile) => void;
}

const SpeciesForm: React.FC<SpeciesFormProps> = ({ onCreate }) => {
  const [id, setId] = useReactState('');
  const [commonName, setCommonName] = useReactState('');
  const [scientificName, setScientificName] = useReactState('');
  const [group, setGroup] = useReactState<SpeciesProfile['group']>('snake');
  const [careLevel, setCareLevel] =
    useReactState<SpeciesProfile['careLevel']>('beginner');
  const [venomous, setVenomous] = useReactState(false);
  const [potentiallyDangerous, setPotentiallyDangerous] = useReactState(false);
  const [activity, setActivity] =
    useReactState<SpeciesProfile['activity']>('nocturnal');

  const [origin, setOrigin] = useReactState('');
  const [sizeMin, setSizeMin] = useReactState('');
  const [sizeMax, setSizeMax] = useReactState('');
  const [lifeMin, setLifeMin] = useReactState('');
  const [lifeMax, setLifeMax] = useReactState('');
  const [temperament, setTemperament] =
    useReactState<SpeciesProfile['temperament']>('docile');

  const [enclosure, setEnclosure] = useReactState('');
  const [temperature, setTemperature] = useReactState('');
  const [humidity, setHumidity] = useReactState('');
  const [lighting, setLighting] = useReactState('');
  const [substrate, setSubstrate] = useReactState('');
  const [enrichments, setEnrichments] = useReactState('');

  const [preyType, setPreyType] = useReactState('');
  const [scheduleJuvenile, setScheduleJuvenile] = useReactState('');
  const [scheduleAdult, setScheduleAdult] = useReactState('');
  const [dietNotes, setDietNotes] = useReactState('');

  const [breedingSeason, setBreedingSeason] = useReactState('');
  const [breedingClutchSize, setBreedingClutchSize] = useReactState('');
  const [breedingIncubation, setBreedingIncubation] = useReactState('');
  const [breedingNotes, setBreedingNotes] = useReactState('');

  const [rehabIssues, setRehabIssues] = useReactState('');
  const [rehabRedFlags, setRehabRedFlags] = useReactState('');
  const [rehabQuarantine, setRehabQuarantine] = useReactState('');
  const [rehabStressSigns, setRehabStressSigns] = useReactState('');

  const [tags, setTags] = useReactState('');
  const [message, setMessage] = useReactState<string | null>(null);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    setMessage(null);

    if (!id.trim() || !commonName.trim() || !scientificName.trim()) {
      setMessage('Id, svenskt namn och latinskt namn är obligatoriska.');
      return;
    }

    const now = new Date().toISOString();

    const profile: SpeciesProfile = {
      id: id.trim(),
      commonName: commonName.trim(),
      scientificName: scientificName.trim(),
      group,
      origin: origin
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      careLevel,
      venomous,
      potentiallyDangerous,
      activity,
      sizeCm: {
        min: Number(sizeMin) || 0,
        max: Number(sizeMax) || 0
      },
      lifespanYears:
        lifeMin || lifeMax
          ? {
              min: Number(lifeMin) || 0,
              max: Number(lifeMax) || 0
            }
          : undefined,
      temperament,
      husbandry: {
        enclosure: enclosure.trim(),
        temperature: temperature.trim(),
        humidity: humidity.trim(),
        lighting: lighting.trim(),
        substrate: substrate.trim(),
        enrichments: enrichments
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      },
      diet: {
        preyType: preyType.trim(),
        scheduleJuvenile: scheduleJuvenile.trim(),
        scheduleAdult: scheduleAdult.trim(),
        notes: dietNotes.trim() || undefined
      },
      breeding:
        breedingSeason || breedingClutchSize || breedingIncubation || breedingNotes
          ? {
              difficulty: careLevel,
              season: breedingSeason.trim(),
              clutchSize: breedingClutchSize.trim(),
              incubation: breedingIncubation.trim(),
              notes: breedingNotes.trim() || undefined
            }
          : undefined,
      rehab:
        rehabIssues || rehabRedFlags || rehabQuarantine || rehabStressSigns
          ? {
              commonIssues: rehabIssues
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
              redFlags: rehabRedFlags.trim(),
              quarantineProtocol: rehabQuarantine.trim(),
              stressSigns: rehabStressSigns.trim()
            }
          : {
              commonIssues: [],
              redFlags: '',
              quarantineProtocol: '',
              stressSigns: ''
            },
      tags: tags
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      createdAt: now,
      updatedAt: now
    };

    onCreate(profile);
    setMessage(`Artprofil "${profile.commonName}" sparad lokalt.`);

    // Rensa bara vissa fält, inte alla om du vill.
    // Här låter vi t.ex. group, careLevel etc ligga kvar.
    setId('');
    setCommonName('');
    setScientificName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      {message && (
        <div className="rounded border border-emerald-600 bg-emerald-900/40 px-3 py-2 text-xs text-emerald-100">
          {message}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Id (unik nyckel, t.ex. <code>python_regius</code>)
          </label>
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Svenskt namn
          </label>
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={commonName}
            onChange={(e) => setCommonName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Latinskt namn
          </label>
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={scientificName}
            onChange={(e) => setScientificName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Grupp
          </label>
          <select
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={group}
            onChange={(e) =>
              setGroup(e.target.value as SpeciesProfile['group'])
            }
          >
            <option value="snake">Orm</option>
            <option value="lizard">Ödla</option>
            <option value="amphibian">Groddjur</option>
            <option value="spider">Spindel</option>
            <option value="scorpion">Skorpion</option>
            <option value="other">Annat</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Svårighetsgrad
          </label>
          <select
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={careLevel}
            onChange={(e) =>
              setCareLevel(e.target.value as SpeciesProfile['careLevel'])
            }
          >
            <option value="beginner">Nybörjare</option>
            <option value="intermediate">Medel</option>
            <option value="advanced">Avancerad</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Aktivitet
          </label>
          <select
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={activity}
            onChange={(e) =>
              setActivity(e.target.value as SpeciesProfile['activity'])
            }
          >
            <option value="diurnal">Dagaktiv</option>
            <option value="nocturnal">Nattaktiv</option>
            <option value="crepuscular">Skymningsaktiv</option>
            <option value="variable">Varierande</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Giftig?
          </label>
          <select
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={venomous ? 'yes' : 'no'}
            onChange={(e) => setVenomous(e.target.value === 'yes')}
          >
            <option value="no">Nej</option>
            <option value="yes">Ja</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Potentiellt farlig (storlek, temperament etc)?
          </label>
          <select
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={potentiallyDangerous ? 'yes' : 'no'}
            onChange={(e) => setPotentiallyDangerous(e.target.value === 'yes')}
          >
            <option value="no">Nej</option>
            <option value="yes">Ja</option>
          </select>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Ursprung (komma-separerat)
          </label>
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            placeholder="t.ex. Västafrika, Ghana, Togo"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Temperament
          </label>
          <select
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={temperament}
            onChange={(e) =>
              setTemperament(
                e.target.value as SpeciesProfile['temperament']
              )
            }
          >
            <option value="docile">Lugn</option>
            <option value="nervous">Nervös</option>
            <option value="defensive">Defensiv</option>
            <option value="aggressive">Aggressiv</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Storlek min (cm)
          </label>
          <input
            type="number"
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={sizeMin}
            onChange={(e) => setSizeMin(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Storlek max (cm)
          </label>
          <input
            type="number"
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={sizeMax}
            onChange={(e) => setSizeMax(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Livslängd min (år) (valfritt)
          </label>
          <input
            type="number"
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={lifeMin}
            onChange={(e) => setLifeMin(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Livslängd max (år) (valfritt)
          </label>
          <input
            type="number"
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={lifeMax}
            onChange={(e) => setLifeMax(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Terrarium / inredning (text)
          </label>
          <textarea
            className="h-20 w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={enclosure}
            onChange={(e) => setEnclosure(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Temperatur (text)
          </label>
          <textarea
            className="h-20 w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Luftfuktighet (text)
          </label>
          <textarea
            className="h-20 w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Belysning (text)
          </label>
          <textarea
            className="h-20 w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={lighting}
            onChange={(e) => setLighting(e.target.value)}
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-xs font-medium text-slate-300">
            Substrat
          </label>
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={substrate}
            onChange={(e) => setSubstrate(e.target.value)}
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-xs font-medium text-slate-300">
            Berikning (komma-separerat, t.ex. gömställen, grenar, stenar)
          </label>
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={enrichments}
            onChange={(e) => setEnrichments(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Föda (typ)
          </label>
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={preyType}
            onChange={(e) => setPreyType(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Utfodring juveniler
          </label>
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={scheduleJuvenile}
            onChange={(e) => setScheduleJuvenile(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Utfodring vuxen
          </label>
          <input
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={scheduleAdult}
            onChange={(e) => setScheduleAdult(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            Fodernoter (valfritt)
          </label>
          <textarea
            className="h-20 w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
            value={dietNotes}
            onChange={(e) => setDietNotes(e.target.value)}
          />
        </div>
      </div>

      <details className="rounded border border-slate-800 bg-slate-900/60 p-3 text-xs">
        <summary className="cursor-pointer font-semibold">
          Avel (valfritt)
        </summary>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-300">
              Säsong / period
            </label>
            <input
              className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
              value={breedingSeason}
              onChange={(e) => setBreedingSeason(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-300">
              Kullstorlek
            </label>
            <input
              className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
              value={breedingClutchSize}
              onChange={(e) => setBreedingClutchSize(e.target.value)}
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-medium text-slate-300">
              Inkubation (temperatur, dagar, fuktighet)
            </label>
            <textarea
              className="h-20 w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
              value={breedingIncubation}
              onChange={(e) => setBreedingIncubation(e.target.value)}
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-medium text-slate-300">
              Övriga avelsnoter
            </label>
            <textarea
              className="h-20 w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
              value={breedingNotes}
              onChange={(e) => setBreedingNotes(e.target.value)}
            />
          </div>
        </div>
      </details>

      <details className="rounded border border-slate-800 bg-slate-900/60 p-3 text-xs">
        <summary className="cursor-pointer font-semibold">
          Rehab &amp; rescue (valfritt)
        </summary>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-medium text-slate-300">
              Vanliga problem (komma-separerat)
            </label>
            <input
              className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
              value={rehabIssues}
              onChange={(e) => setRehabIssues(e.target.value)}
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-medium text-slate-300">
              Röda flaggor (text)
            </label>
            <textarea
              className="h-20 w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
              value={rehabRedFlags}
              onChange={(e) => setRehabRedFlags(e.target.value)}
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-medium text-slate-300">
              Karantänprotokoll (text)
            </label>
            <textarea
              className="h-20 w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
              value={rehabQuarantine}
              onChange={(e) => setRehabQuarantine(e.target.value)}
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-medium text-slate-300">
              Stress-signaler (text)
            </label>
            <textarea
              className="h-20 w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
              value={rehabStressSigns}
              onChange={(e) => setRehabStressSigns(e.target.value)}
            />
          </div>
        </div>
      </details>

      <div className="space-y-1">
        <label className="block text-xs font-medium text-slate-300">
          Taggar (komma-separerat, t.ex. orm, nybörjarart, torrmiljö)
        </label>
        <input
          className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center rounded bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-sm shadow-emerald-500/40 hover:bg-emerald-400"
        >
          Spara artprofil lokalt
        </button>
      </div>
    </form>
  );
};

const AboutPage: React.FC = () => (
  <Card title="Om projektet">
    <p>
      Det här är tänkt som en community-vänlig handbok för seriös skötsel,
      avel &amp; rehabilitering av reptiler och exotiska djur.
    </p>
    <p>
      Vision: bli “reptilvärldens katthem-wiki” – fast mer strukturerad,
      nördig och art-specifik.
    </p>
  </Card>
);

export default App;