import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="title">Daftar Acara</h1>
      <div className="nes-container">
        <div className="nes-container with-title">
          <h3 className="title">JakartaJS</h3>
          <div className="event">
            <div className="dates">
              <span className="date">19</span>
              <span className="month">Maret</span>
              <span className="year">2020</span>
            </div>
            <div className="event-detail">
              <h4>Doing awesome stuff with JavaScript</h4>
              <div className="location">📍 Jakarta</div>
            </div>
            <div className="cta">
              <a href="#" className="nes-btn is-primary">
                detail
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
