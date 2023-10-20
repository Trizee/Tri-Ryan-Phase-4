import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/featured');
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0',
          height: '80vh',
          marginTop:'-25vh'
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginTop: '200px', // Adjust the margin-top to move the text lower
            fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
            fontSize: '40px',
          }}
        >
          <p id="text">
            This website has been created for you.<br/>
            We help find you events to go to.<br/>
            We give you the capability to add and RSVP events.
          </p>
          <button onClick={handleGetStarted} style={{borderRadius:'100px', backgroundColor:'#2e9bd6', color:'#white',padding:'10px'}}>Get Started</button>
        </div>
      </div>
      <div className="background-image">
        <img
          src="https://miro.medium.com/v2/resize:fit:1358/1*Dmw3hv_CHbZEPyFTayw8Yw.png"
          alt="Background Party Image"
          style={{ width: '100%', height: 'auto', marginTop:'-40vh'}}
        />
      </div>
      </>
  );
}

export default Landing;