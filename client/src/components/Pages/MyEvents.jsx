import EventCard from "./EventCard"
import { Grid } from "@mui/material";

function Event({event,setEvent}){
    
    const eventList = event.map(indiEvent => <EventCard key={indiEvent.id} events={indiEvent} deleteEvent={deleteEvent}/>)

    function deleteEvent(id){
        fetch(`/api/events/${id}`,{
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
        .then(r => r.json())
        .then(data => data)
        const filteredEvents = event.filter(e => e.id !== id)
        setEvent(filteredEvents)
        }
    

    return(
        <>
      
        <Grid container spacing={2}
        style={{
            height: '90vh',
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