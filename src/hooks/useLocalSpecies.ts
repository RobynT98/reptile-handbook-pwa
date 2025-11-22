import { useState, useEffect } from "react";
import { Species } from "../types/species";

export function useLocalSpecies() {
  const [species, setSpecies] = useState<Species[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("species-data");
    if (stored) {
      setSpecies(JSON.parse(stored));
    }
  }, []);

  const addSpecies = (newSpecies: Species) => {
    const updated = [...species, newSpecies];
    setSpecies(updated);
    localStorage.setItem("species-data", JSON.stringify(updated));
  };

  return { species, addSpecies };
}