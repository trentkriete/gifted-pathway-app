
import React from 'react';

function HomePage({ onStart }) {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to Gifted Pathways</h1>
        <p>This tool helps determine the appropriate gifted and talented pathway for a student based on a series of questions.</p>
        <button className="start-btn" onClick={onStart}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HomePage;
