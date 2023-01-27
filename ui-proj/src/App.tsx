import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChess, faChessBoard } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import GamesList from './GamesList';

function App() {

  return (
    <div className="app">
      <header className="app-header">
        <FontAwesomeIcon className="header-padding" icon={faChessBoard} />
        <div>egates09's Chess App</div>
        <FontAwesomeIcon className="header-padding" icon={faChess} />
      </header>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GamesList />} />
      </Routes>

    </div>
  );
}

export default App;
