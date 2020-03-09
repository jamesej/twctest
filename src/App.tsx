import React, { useState, ChangeEvent } from 'react';
import './App.css';
import { executePlan, parsePlan } from './data/plan';
import { displayRover, Area } from './data/area';

function App() {
  const [planDesc, setPlanDesc] = useState('');
  const [roverResult, setRoverResult] = useState('');
  const [error, setError] = useState('');

  const changePlanDesc = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setPlanDesc(target.value);
    if (error) setError('');
    if (roverResult) setRoverResult('');
  };

  const runPlan = () => {
    let newArea: Area | null = null;

    try {
      const plan = parsePlan(planDesc);
      newArea = executePlan(plan);
    } catch (err) {
      setError(err.toString());
    }

    if (newArea) {
      setRoverResult(newArea.rovers.map(rover => displayRover(rover)).join('\n'));
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="input-container">
          <textarea value={planDesc} className="input" onChange={changePlanDesc} />
          <div className="error">{error}</div>
        </div>
        <button type="button" onClick={runPlan}>RUN</button>
        <div className="output"><pre>{roverResult}</pre></div>
      </div>
    </div>
  );
}

export default App;
