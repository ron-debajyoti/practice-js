import React, { useState } from 'react';
import { HelloResponse } from '../types/api';
import './HelloPage.css';

const HelloPage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleButtonClick = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/hello');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: HelloResponse = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = error instanceof Error 
        ? `Error: ${error.message}` 
        : 'Error: Could not connect to server';
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hello-page">
      <div className="container">
        <h1>Hello Page</h1>
        <button 
          className="hi-button" 
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Hi'}
        </button>
        {message && (
          <div className="message">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelloPage;
