import EventCard from "./EventCard"
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

function Event({eventData,setEventData,user,event,setEvent}){

    useEffect(()=>{
        setEventData(eventData.filter(events => {return events.event_hosts[0].user_id === user.id}))
    },[])

    const eventList = eventData.map(indiEvent => <EventCard key={indiEvent.id} events={indiEvent} deleteEvent={deleteEvent}/>)

    function deleteEvent(id){
        fetch(`/api/events/${id}`,{
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
        .then(r => r.json())
        .then(data => data)
        const filteredEvents = eventData.filter(e => e.id !== id)
        setEventData(filteredEvents)
        const filteredEvents2 = event.filter(e => e.id !== id)
        setEvent(filteredEvents2)
        }
    

    return(
        <>
      
        <Grid container spacing={2}
        style={{
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:'50px 50px 50px 50px',
            marginTop:'50px',
        }}>
            {eventList}
        </Grid>
      </>
    )
}

export default Event