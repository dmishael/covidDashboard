import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Summary } from './features/counter/globalSummary/Summary'
import './App.css';

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
