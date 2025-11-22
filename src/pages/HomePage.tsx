import React from 'react';
import Card from '../components/Card';

const HomePage: React.FC = () => (
  <div className="space-y-4">
    <Card title="Välkommen till reptilhandboken">
      <p>
        Här bygger vi en PWA-handbok för reptiler & exotiska djur: ormar,
        ödlor, groddjur, spindlar, skorpioner och fler.
      </p>
      <p>Fokus: vård, avel, rehabilitering & rescue-tänk.</p>
    </Card>
  </div>
);

export default HomePage;