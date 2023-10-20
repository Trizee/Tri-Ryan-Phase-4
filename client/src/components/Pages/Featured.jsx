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
    <>
      <Carousel style={{ width: '100vw', height:'80vh' }}>
        {eventData.map((event, index) => (
          <Carousel.Item key={index} interval={1000}>
            <img
              className="d-block w-100"
              src={event.picture}
              style={{maxHeight:'80vh', objectFit: 'cover', margin: '0 auto' }}
            />
            <Carousel.Caption>{event.name}</Carousel.Caption>
          </Carousel.Item>
          
        ))}
      </Carousel>
    </>
  );
}

export default Featured;
