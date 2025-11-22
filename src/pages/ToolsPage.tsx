import React from 'react';
import Card from '../components/Card';
import SpeciesForm from '../components/SpeciesForm';
import type { SpeciesProfile } from '../types/species';

interface ToolsPageProps {
  onCreateSpecies: (sp: SpeciesProfile) => void;
  onClearLocal: () => void;
  localCount: number;
}

const ToolsPage: React.FC<ToolsPageProps> = ({
  onCreateSpecies,
  onClearLocal,
  localCount
}) => (
  <div className="space-y-4">
    <Card title="Formulär &amp; Verktyg">
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

export default ToolsPage;