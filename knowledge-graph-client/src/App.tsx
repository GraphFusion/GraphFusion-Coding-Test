import React, { useEffect } from 'react';
import GraphVisualization from './components/GraphVisualization';
import useGraphStore from './store/useGraphStore';
import { api } from './api/backendApi';

import './index.css';

const App: React.FC = () => {
  const setGraphData = useGraphStore((state) => state.setGraphData);

  useEffect(() => {
    fetch(`${api}graph`)
      .then((res) => res.json())
      .then((data) => {
        setGraphData(data.nodes, data.relationships);
      });
  }, [setGraphData]);

  return (
    <div className='my-2'>
      <div className="graph-container">
        <GraphVisualization />
      </div>
    </div>

  );
};

export default App;
