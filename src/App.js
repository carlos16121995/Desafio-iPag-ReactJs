import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Game from '../src/jogo/Game.js';
import Inicio from '../src/Inicio.js';

function App() {
  return (

      <Router>
        <Route path="/" exact component={Inicio} />
        <Route path="/Game/" component={Game} />
     </Router>

  );
}

export default App; 