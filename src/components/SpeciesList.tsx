import React from 'react';
import type { SpeciesProfile } from '../types/species';
import Card from './Card';

interface SpeciesListProps {
  species: SpeciesProfile[];
  /** Klick på hela kortet (t.ex. öppna detaljvy eller edit) */
  onSelect?: (sp: SpeciesProfile) => void;
  /** Visa och använd "Redigera"-knapp om satt */
  onEdit?: (sp: SpeciesProfile) => void;
  /** Visa och använd "Ta bort"-knapp om satt */
  onDelete?: (id: string) => void;
}

const SpeciesList: React.FC<SpeciesListProps> = ({
  species,
  onSelect,
  onEdit,
  onDelete
}) => {
  if (!species || species.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        Inga artprofiler inlagda ännu.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {species.map((sp) => {
        const subtitleParts: string[] = [];
        subtitleParts.push(sp.scientificName);
        subtitleParts.push(sp.group);
        subtitleParts.push(`svårighetsgrad: ${sp.careLevel}`);

        const subtitle = subtitleParts.join(' • ');

        return (
          <Card
            key={sp.id}
            title={sp.commonName}
            subtitle={subtitle}
            onClick={onSelect ? () => onSelect(sp) : undefined}
            onEdit={onEdit ? () => onEdit(sp) : undefined}
            onDelete={onDelete ? () => onDelete(sp.id) : undefined}
          >
            {/* Ursprung */}
            {sp.origin && sp.origin.length > 0 && (
              <p className="text-xs text-slate-300">
                Ursprung: {sp.origin.join(', ')}
              </p>
            )}

            {/* Storlek / aktivitet / risk-taggar */}
            <div className="flex flex-wrap items-center gap-1 text-[0.65rem] text-slate-200">
              {sp.sizeCm && (sp.sizeCm.min || sp.sizeCm.max) && (
                <span className="rounded-full bg-slate-800 px-2 py-0.5">
                  Storlek: {sp.sizeCm.min}–{sp.sizeCm.max} cm
                </span>
              )}

              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5">
                Aktivitet: {sp.activity}
              </span>

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

            {/* Taggar */}
            {sp.tags && sp.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1 text-[0.65rem] text-slate-300">
                {sp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-800 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default SpeciesList;