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
    <>
      <header>
        <h1>Amplify Meetup</h1>
        <AmplifySignOut />
      </header>
      <main>
        <article>
          <aside>
            <form onSubmit={handleFormSubmit}>
              <fieldset>
                <h3>Acara Baru</h3>
                <label htmlFor="community">Nama Komunitas</label>
                <input
                  type="text"
                  name="community"
                  onChange={handleCommunityChange}
                />

                <label htmlFor="title">Judul Acara</label>
                <input type="text" name="title" onChange={handleTitleChange} />
                <button type="submit">Simpan</button>
              </fieldset>
            </form>
          </aside>
          <section>
            {meetups.map((meetup, index) => (
              <fieldset key={index}>
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
                      <button>detail</button>
                    </a>
                  </div>
                </div>
              </fieldset>
            ))}
          </section>
        </article>
      </main>
    </>
  );
}

export default withAuthenticator(App);
