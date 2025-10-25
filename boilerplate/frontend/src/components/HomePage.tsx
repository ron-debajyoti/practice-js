import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="container">
        <h1>Welcome to React Express Boilerplate</h1>
        <p>This is a full-stack TypeScript application with React and Express.</p>
        <div className="navigation">
          <Link to="/hello" className="nav-button">
            Go to Hello Page
          </Link>
          <Link to="/shape" className="nav-button">
            Go to Shape Page
          </Link>
          <Link to="/modals" className="nav-button">
            Go to Modal Demo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
