import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import HelloPage from './components/HelloPage';
import ModalDemoPage from './components/ModalDemoPage';
import './App.css';
import { ModalProvider } from './components/ModalProvider';
import { ModalHost } from './components/ModalHost';
import { Shape } from './components/Shape';

const App: React.FC = () => {
  return (
    <Router>
      <ModalProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hello" element={<HelloPage />} />
            <Route path="/shape" element={<Shape />} />
            <Route path="/modals" element={<ModalDemoPage />} />
          </Routes>
          <ModalHost />
        </div>
      </ModalProvider>
    </Router>
  );
};

export default App;
