import React from 'react';
import type { SpeciesProfile } from '../types/species';

interface Props {
  species: SpeciesProfile[];
}

const SpeciesList: React.FC<Props> = ({ species }) => {
  if (!species || species.length === 0) {
    return <p>Inga artprofiler inlagda ännu.</p>;
  }

  return (
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
              <p className="text-xs text-slate-400">
                Grupp: {sp.group} • Svårighet: {sp.careLevel}
              </p>
            </div>
            <div className="flex flex-wrap gap-1 text-[0.65rem]">
              {sp.venomous && (
                <span className="rounded-full bg-red-600/80 px-2 py-0.5">
                  Giftig
                </span>
              )}
              {sp.potentiallyDangerous && !sp.venomous && (
                <span className="rounded-full bg-amber-500/80 px-2 py-0.5">
                  Potentiellt farlig
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-300">
            Ursprung: {sp.origin.join(', ')}
          </p>

          <div className="flex flex-wrap gap-1 text-[0.65rem] text-slate-300">
            {sp.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-800 px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SpeciesList;