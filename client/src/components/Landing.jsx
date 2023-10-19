import React from 'react';
import './Landing.css';
import Footer from './Footer';

function Landing() {
  return (
    <div>
      <div className="page-container">
        <div className="grid-container">
          <div className="text">
            <p id="text" style={{ marginTop: '100px' }} className="text-center">
              ANJDNJANNDKJFNKSJ
              DNFKJSNDNKDJNFKJS
              DNKDSNFK
            </p>
            <div className="text-center"> {/* Add text-center class to center the button */}
              <button>Get Started!</button>
            </div>
          </div>
          <div className="image">
            <img id="danceImage" src="" />
          </div>
        </div>
      </div>
      <div className="background-image">
        <img
          src="https://media.istockphoto.com/id/930374686/vector/crowd-of-people-silhouette-sports-banner-hands-up-fans-cheerful-life-party.jpg?s=170667a&w=0&k=20&c=POfXyhcRmR0JbkDigEEF6Nb6ZeyN5kLNOChdez-ghrg="
          alt="Background Party Image"
        //   style={{ background: 'black', display: 'block', opacity: 0.5 }}
        />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Landing;
