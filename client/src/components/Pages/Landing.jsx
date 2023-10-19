import React from 'react';
import './Landing.css';

function Landing() {
  return (
    <div>
      <div className="page-container">
        <div className="grid-container">
          <div className="text">
            <p id="text">
              This website has been created for you to find and add events to your area.
              There is the capability to add these events to your calender and you are also
              able to see nearby events.
            </p>
            <button>Get Started!</button>
          </div>
          <div className="image">
            <img id="danceImage" src="" />
          </div>
        </div>
      </div>
      <div className="background-image">
      <img
  src="https://p7.hiclipart.com/preview/113/187/741/music-download-concert-art-concert-crowd.jpg"
  alt="Background Party Image"
  style={{ background: 'none' }}
/>
</div>
</div>
  );
}

export default Landing;