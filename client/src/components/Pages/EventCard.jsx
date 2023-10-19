import * as React from 'react';
import { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box, Grid } from '@mui/material';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import UploadWidget from '../cloudinary/UploadWidget';


function EventCard({events,deleteEvent}) {

  const [even,setEven] = useState(events)
  const [name, setName] = useState(even.name);
  const [location, setLocation] = useState(even.location);
  const [time, setTime] = useState(even.time);
  const [description, setDescription] = useState(even.description);
  const [picture,setPicture] = useState(even.picture)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  function updateEvent(id){
    fetch(`/api/events/${id}`,{
      
      Accept: "application/json",
      headers: {
        "Content-Type": "application/json",
      },
      method: 'PATCH',

      body: JSON.stringify({
        name: name,
        location: location,
        time : time,
        description: description,
        picture: picture
      })
      })
      .then(r => r.json())
      .then(data => setEven(data))
      handleClose()
    }


  console.log(even)
  return (
    <>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign:'center'}}>Edit {even.name} Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={events.name}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setName(e.target.value)}

          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label={events.location}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setLocation(e.target.value)}

          />
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label="             "
            type="datetime-local"
            fullWidth
            variant="standard"
            onChange={(e)=>setTime(e.target.value)}

          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label={events.description}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setDescription(e.target.value)}

          />
        <UploadWidget setPicture={setPicture}/>
        </DialogContent> 
        <DialogActions>
          <Button onClick={()=>updateEvent(events.id)}>Commit Changes</Button>
        </DialogActions>
    </Dialog>

      <Dialog open={open1} onClose={handleClose1}>
          <DialogTitle style={{textAlign:'center'}}><strong>{even.name} Event</strong></DialogTitle>
          <DialogContent>
            <img src={even.picture} style={{width:'400px',height:'300px'}}/>
            <p style={{paddingTop:'15px'}}><strong>Location</strong></p>
            <p>{even.location}</p>
            <p><strong>Time</strong></p>
            <p>{even.time}</p>
            <p><strong>Description</strong></p>
            <p>{even.location}</p>
            <p><strong>RSVPs</strong></p>
            <p>{even.rsvps.length}</p>
          </DialogContent> 
      </Dialog>

    <Grid item s={12} sm={6} md={4}>
    <Card
     raised
     sx={{
       maxWidth: '30vw',
       minWidth:'300px',
       margin: "0 auto",
       padding: "0.1em",
       backgroundColor:'#f0ead6'
     }}
    >
      <CardActionArea onClick={()=>handleClickOpen1()}>
        <CardMedia
          component="img"
          height="250"
          image={even.picture}
          sx={{ padding: "1em 1em 0 1em", objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          <strong>{even.name}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {even.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {even.time}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>deleteEvent(events.id)}>
          Delete
        </Button>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          Edit
        </Button>
      </CardActions>
    </Card>
    </Grid>
    </>
  );
}

export default EventCard