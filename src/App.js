import React, { useState, useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { API } from 'aws-amplify';

import './App.css';

function App() {
  const [meetups, setMeetup] = useState([]);

  useEffect(function() {
    (async function() {
      const data = await API.get('ampmeetupapi', '/meetups/community');
      setMeetup(data);
    })();
  });
  return (
    <div className="container">
      <h1 className="title">Daftar Acara</h1>
      <div className="nes-container">
        {meetups.map((meetup) => (
          <div className="nes-container with-title">
            <h3 className="title">{meetup.community}</h3>
            <div className="event">
              <div className="dates">
                <span className="date">19</span>
                <span className="month">Maret</span>
                <span className="year">2020</span>
              </div>
              <div className="event-detail">
                <h4>{meetup.title}</h4>
                <div className="location">📍 Jakarta</div>
              </div>
              <div className="cta">
                <a href="#" className="nes-btn is-primary">
                  detail
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
