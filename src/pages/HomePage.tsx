import React from 'react';
import Card from '../components/Card';

const HomePage: React.FC = () => (
  <div className="space-y-4">
    <Card title="Välkommen till reptilhandboken">
      <p>
        Här bygger vi en PWA-handbok för reptiler &amp; exotiska djur: ormar,
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

export default HomePage;