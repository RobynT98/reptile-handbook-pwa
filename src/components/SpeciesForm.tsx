import React, { useState } from 'react';
import type { SpeciesProfile } from '../types/species';

interface SpeciesFormProps {
  onCreate: (sp: SpeciesProfile) => void;
}

const SpeciesForm: React.FC<SpeciesFormProps> = ({ onCreate }) => {
  const [id, setId] = useState('');
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [group, setGroup] = useState<SpeciesProfile['group']>('snake');
  const [careLevel, setCareLevel] =
    useState<SpeciesProfile['careLevel']>('beginner');
  const [venomous, setVenomous] = useState(false);
  const [potentiallyDangerous, setPotentiallyDangerous] = useState(false);
  const [activity, setActivity] =
    useState<SpeciesProfile['activity']>('nocturnal');

  const [origin, setOrigin] = useState('');
  const [sizeMin, setSizeMin] = useState('');
  const [sizeMax, setSizeMax] = useState('');
  const [lifeMin, setLifeMin] = useState('');
  const [lifeMax, setLifeMax] = useState('');
  const [temperament, setTemperament] =
    useState<SpeciesProfile['temperament']>('docile');

  const [enclosure, setEnclosure] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [lighting, setLighting] = useState('');
  const [substrate, setSubstrate] = useState('');
  const [enrichments, setEnrichments] = useState('');

  const [preyType, setPreyType] = useState('');
  const [scheduleJuvenile, setScheduleJuvenile] = useState('');
  const [scheduleAdult, setScheduleAdult] = useState('');
  const [dietNotes, setDietNotes] = useState('');

  const [breedingSeason, setBreedingSeason] = useState('');
  const [breedingClutchSize, setBreedingClutchSize] = useState('');
  const [breedingIncubation, setBreedingIncubation] = useState('');
  const [breedingNotes, setBreedingNotes] = useState('');

  const [rehabIssues, setRehabIssues] = useState('');
  const [rehabRedFlags, setRehabRedFlags] = useState('');
  const [rehabQuarantine, setRehabQuarantine] = useState('');
  const [rehabStressSigns, setRehabStressSigns] = useState('');

  const [tags, setTags] = useState('');
  const [message, setMessage] = useState<string | null>(null);

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
        breedingSeason ||
        breedingClutchSize ||
        breedingIncubation ||
        breedingNotes
          ? {
              difficulty: careLevel,
              season: breedingSeason.trim(),
              clutchSize: breedingClutchSize.trim(),
              incubation: breedingIncubation.trim(),
              notes: breedingNotes.trim() || undefined
            }
          : undefined,
      rehab:
        rehabIssues ||
        rehabRedFlags ||
        rehabQuarantine ||
        rehabStressSigns
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

    // Rensa bara vissa fält
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

      {/* Grunddata */}
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

      {/* Storlek, livslängd, ursprung, temperament */}
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

      {/* Husbandry */}
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

      {/* Diet */}
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

      {/* Breeding */}
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

      {/* Rehab */}
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

      {/* Taggar */}
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

export default SpeciesForm;