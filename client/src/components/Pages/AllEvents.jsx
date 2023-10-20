import React, { useEffect, useState } from 'react';
import EventCard from "./EventCard"
import { Grid } from "@mui/material";

function AllEvents({event,user}) {

  return (
    <Grid container spacing={2}
        style={{
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:'50px 50px 50px 50px',
            marginTop:'50px',
        }}>
      {event.map((event) => (
          <EventCard key={event.id} events={event} user={user}/>
      ))}
    </Grid>
  );
}

export default AllEvents;