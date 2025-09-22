import React from 'react';
import { GameProvider } from './contexts/GameContext';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  console.log('App component rendering...');
  
  return (
    <GameProvider>
      <div className="App">
        <h1>英検3級カードバトル - テスト</h1>
        <GameBoard />
      </div>
    </GameProvider>
  );
}

export default App;

