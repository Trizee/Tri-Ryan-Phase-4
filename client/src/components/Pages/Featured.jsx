import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.css';

function Featured() {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => {
        setEventData(data); 
      });
  }, []);

  return (
    <div style={{ marginTop: '150px', display:'block' }}>
      {/* <h4 className="text-center" style={{ marginTop: '100px' }}>Featured Events</h4> */}
      <Carousel>
        {eventData.map((event, index) => (
          <Carousel.Item key={index} interval={2500}>
            <img
              className="d-block mx-auto"
              src={event.picture}
              alt={`Event Image ${index + 1}`}
              style={{ maxHeight: '450px', maxWidth: '800px', objectFit: 'contain' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Featured;
