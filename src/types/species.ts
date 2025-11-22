export type CareLevel = 'beginner' | 'intermediate' | 'advanced';

export type SpeciesGroup =
  | 'snake'
  | 'lizard'
  | 'amphibian'
  | 'spider'
  | 'scorpion'
  | 'other';

export interface SpeciesProfile {
  id: string; // t.ex. "python_regius"
  commonName: string; // "Kungspyton"
  scientificName: string; // "Python regius"
  group: SpeciesGroup;

  origin: string[]; // t.ex. ["Västafrika"]
  careLevel: CareLevel;
  venomous: boolean;
  potentiallyDangerous: boolean; // t.ex. stora ormar

  activity: 'diurnal' | 'nocturnal' | 'crepuscular' | 'variable';

  sizeCm: {
    min: number;
    max: number;
  };

  lifespanYears?: {
    min: number;
    max: number;
  };

  temperament: 'docile' | 'nervous' | 'defensive' | 'aggressive';

  husbandry: {
    enclosure: string; // mått / typ
    temperature: string; // gradient
    humidity: string;
    lighting: string;
    substrate: string;
    enrichments: string[]; // gömställen, grenar osv
  };

  diet: {
    preyType: string; // "gnagare", "insekter", etc
    scheduleJuvenile: string;
    scheduleAdult: string;
    notes?: string;
  };

  breeding?: {
    difficulty: CareLevel;
    season: string;
    clutchSize: string;
    incubation: string;
    notes?: string;
  };

  rehab?: {
    commonIssues: string[];
    redFlags: string;
    quarantineProtocol: string;
    stressSigns: string;
  };

  tags: string[];

  createdAt: string;
  updatedAt: string;
}