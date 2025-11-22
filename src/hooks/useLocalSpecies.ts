import { useEffect, useState } from 'react';
import type { SpeciesProfile } from '../types/species';

const STORAGE_KEY = 'reptileHandbook.localSpecies';

export function useLocalSpecies() {
  const [localSpecies, setLocalSpecies] = useState<SpeciesProfile[]>([]);

  // Läs in lokalt sparade arter vid start
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as SpeciesProfile[];
      if (Array.isArray(parsed)) {
        setLocalSpecies(parsed);
      }
    } catch (error) {
      console.error('Kunde inte läsa lokala artprofiler:', error);
    }
  }, []);

  // Spara automatiskt när listan ändras
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(localSpecies));
    } catch (error) {
      console.error('Kunde inte spara lokala artprofiler:', error);
    }
  }, [localSpecies]);

  const addSpecies = (sp: SpeciesProfile) => {
    setLocalSpecies((prev) => [...prev, sp]);
  };

  const clearSpecies = () => {
    setLocalSpecies([]);
  };

  return { localSpecies, addSpecies, clearSpecies };
}