import * as React from 'react';
import { useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import UploadWidget from '../cloudinary/UploadWidget';


function EventCard({events,deleteEvent,user}) {

  const location2 = useLocation()

  const [even,setEven] = useState(events)
  const [name, setName] = useState(even.name);
  const [location, setLocation] = useState(even.location);
  const [time, setTime] = useState(even.time);
  const [description, setDescription] = useState(even.description);
  const [picture,setPicture] = useState(even.picture)

  const [rName,setRName] = useState('')
  const [phone,setPhone] = useState('')

  const [rsvp,setRsvp] = useState('RSVP')
  const [rCount,setRCount] = useState(even.rsvps ? even.rsvps.length : '0')

  function postRSVP(){
    fetch("/api/rsvps",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_id: even.id,
            user_id: user.id,
            name: rName,
            phone: phone,
            status: 'Going'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response error");
        }
        return response.json();
    })
    .then(data => {
      console.log(data)
      setRCount(rCount + 1)
      handleClose2()
    })
    .catch(error => {
        console.log("error", error.message);
    });
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
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
  
  return (
    <>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign:'center'}}>Edit {even.name} Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={even.name}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setName(e.target.value)}

          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label={even.location}
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
            label={even.description}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setDescription(e.target.value)}

          />
        <UploadWidget setPicture={setPicture}/>
        </DialogContent> 
        <DialogActions>
          <Button onClick={()=>updateEvent(even.id)}>Commit Changes</Button>
        </DialogActions>
    </Dialog>

      <Dialog open={open1} onClose={handleClose1}>
          <DialogTitle style={{textAlign:'center'}}><strong>{even.name} Event</strong></DialogTitle>
          <DialogContent>
            <img src={even.picture} style={{width:'300px',height:'250px'}}/>
            <p style={{paddingTop:'15px'}}><strong>Location</strong></p>
            <p>{even.location}</p>
            <p><strong>Time</strong></p>
            <p>{even.time}</p>
            <p><strong>Description</strong></p>
            <p>{even.location}</p>
            <p><strong>RSVPs</strong></p>
            <p>{rCount}</p>
          </DialogContent> 
      </Dialog>

      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle style={{textAlign:'center'}}>RSVP</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label='Name'
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setRName(e.target.value)}

          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label='Phone Number'
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setPhone(e.target.value)}
          />
        </DialogContent> 
        <DialogActions>
          <Button onClick={()=>postRSVP()}>Reserve</Button>
        </DialogActions>
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
        {
          location2.pathname !== '/event' ?
          <>
        <Button size="small" color="primary" onClick={handleClickOpen2}>
        {rsvp}
        </Button>
          </>
          :
          <>
        <Button size="small" color="primary" onClick={()=>deleteEvent(even.id)}>
          Delete
        </Button>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          Edit
        </Button>
        </>
        }
      </CardActions>
    </Card>
    </Grid>
    </>
  );
}

export default EventCard