import React, { useEffect, useState } from 'react';
import EventCard from "./EventCard"
import { Grid } from "@mui/material";

function AllEvents() {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => {
        setEventData(data);
      });
  }, []);

  return (
    <Grid container spacing={2}
        style={{
            height: '90vh',
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:'50px 50px 50px 50px',
            marginTop:'50px',
        }}>
      {eventData.map((event) => (
          <EventCard key={event.id} events={event} />
      ))}
    </Grid>
  );
}

export default AllEvents;