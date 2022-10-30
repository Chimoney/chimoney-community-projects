import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import PayChimoney from './PayChimoney';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<PayChimoney/>} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
