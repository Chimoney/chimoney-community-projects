import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import PayOut from './PayOut';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<PayOut />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
