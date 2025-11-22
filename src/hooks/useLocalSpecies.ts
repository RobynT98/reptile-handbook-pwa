import { useEffect, useState } from 'react';
import type { SpeciesProfile } from '../types/species';

const STORAGE_KEY = 'reptile-handbook-species-v1';

export function useLocalSpecies() {
  const [localSpecies, setLocalSpecies] = useState<SpeciesProfile[]>([]);

  // Läser in från localStorage en gång vid start
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SpeciesProfile[];
        setLocalSpecies(parsed);
      }
    } catch (err) {
      console.error('Kunde inte läsa species från localStorage', err);
    }
  }, []);

  // Hjälpare som både uppdaterar state + sparar till localStorage
  const persist = (updater: (prev: SpeciesProfile[]) => SpeciesProfile[]) => {
    setLocalSpecies((prev) => {
      const next = updater(prev);

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (err) {
          console.error('Kunde inte spara species till localStorage', err);
        }
      }

      return next;
    });
  };

  // Lägg till (eller ersätt) artprofil
  const addSpecies = (sp: SpeciesProfile) => {
    persist((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === sp.id);
      if (existingIndex !== -1) {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], ...sp, updatedAt: sp.updatedAt };
        return copy;
      }
      return [...prev, sp];
    });
  };

  // Uppdatera befintlig artprofil (redo för framtida “redigera”-läge)
  const updateSpecies = (id: string, data: Partial<SpeciesProfile>) => {
    persist((prev) =>
      prev.map((sp) =>
        sp.id === id ? { ...sp, ...data, updatedAt: new Date().toISOString() } : sp
      )
    );
  };

  // Ta bort en artprofil
  const deleteSpecies = (id: string) => {
    persist((prev) => prev.filter((sp) => sp.id !== id));
  };

  // Töm allt lokalt
  const clearSpecies = () => {
    setLocalSpecies([]);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error('Kunde inte rensa localStorage', err);
      }
    }
  };

  return {
    localSpecies,
    addSpecies,
    updateSpecies,
    deleteSpecies,
    clearSpecies
  };
}