import { useEffect,useState } from "react"
import EventCard from "./EventCard"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';


function Event(){

    const [event,setEvent] = useState([])

    useEffect(()=>{
        fetch('/api/events')
        .then(response => response.json())
        .then(data => setEvent(data))
      },[])
    
    const eventList = event.map(indiEvent => <EventCard key={indiEvent.key} events={indiEvent}/>)


    return(
        <>
        <h1 style={{marginTop:'50px'}}>My Events</h1>        
        <Grid container spacing={2}
        style={{
            height: '90vh',
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:'50px 50px 50px 50px'
        }}>
            {eventList}
        </Grid>
      </>
    )
}

export default Event