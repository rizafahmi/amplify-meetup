import React, { useState, useEffect } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';

import './App.css';

function App() {
  const [meetups, setMeetup] = useState([]);
  const [title, setTitle] = useState('');
  const [community, setCommunity] = useState('');

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleCommunityChange(event) {
    setCommunity(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    await API.post('ampmeetupapi', '/meetups', {
      body: {
        title: title,
        community: community
      }
    });
    setTitle('');
    setCommunity('');
  }

  useEffect(function() {
    (async function() {
      const data = await API.get('ampmeetupapi', '/meetups/community');
      setMeetup(data);
    })();
  });
  return (
    <div className="container">
      <div className="nes-container">
        <AmplifySignOut />
      </div>
      <h1 className="title">Daftar Acara</h1>
      <div className="nes-container with-title">
        <h3 className="title">Acara Baru</h3>
        <form onSubmit={handleFormSubmit}>
          <div
            className="nes-field is-inline"
            style={{ marginBottom: '1.5rem' }}
          >
            <label htmlFor="community">Nama Komunitas</label>
            <input
              type="text"
              name="community"
              className="nes-input"
              onChange={handleCommunityChange}
            />
          </div>

          <div className="nes-field is-inline">
            <label htmlFor="title">Judul Acara</label>
            <input
              type="text"
              name="title"
              className="nes-input"
              onChange={handleTitleChange}
            />
          </div>
          <button type="submit" className="nes-btn is-success">
            Simpan
          </button>
        </form>
      </div>
      <div className="nes-container">
        {meetups.map((meetup, index) => (
          <div className="nes-container with-title" key={index}>
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

export default withAuthenticator(App);
