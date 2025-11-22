import React from 'react';
import Card from '../components/Card';
import SpeciesList from '../components/SpeciesList';
import type { SpeciesProfile } from '../types/species';

interface Props {
  species: SpeciesProfile[];
}

const SpeciesPage: React.FC<Props> = ({ species }) => (
  <div className="space-y-4">
    <Card title="Artprofiler">
      <p>Här listas arter du har lagt in.</p>
    </Card>

    <Card title="Lista">
      <SpeciesList species={species} />
    </Card>
  </div>
);

export default SpeciesPage;