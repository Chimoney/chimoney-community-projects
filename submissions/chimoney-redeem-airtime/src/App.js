import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Redeem from './components/Redeem';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/redeem-airtime/' element={<Redeem/>} />
          <Route path='/redeem-airtime/:id' element={<Redeem/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
