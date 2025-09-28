import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import HelloPage from './components/HelloPage';
import './App.css';
import { Shape } from './components/Shape';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hello" element={<HelloPage />} />
          <Route path="/shape" element={<Shape />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
