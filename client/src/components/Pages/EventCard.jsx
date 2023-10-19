import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box, Grid } from '@mui/material';


function EventCard({ events, deleteEvent }) {


  return (
    <>
      <Grid item s={12} sm={6} md={4}>
        <Card
          raised
          sx={{
            maxWidth: '30vw',
            minWidth: '300px',
            margin: "0 auto",
            padding: "0.1em",
            backgroundColor: '#f0ead6'
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              image={events.picture}
              sx={{ padding: "1em 1em 0 1em", objectFit: "cover" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {events.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {events.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {events.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {events.time}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {location.pathname !== '/event' ?
              <div>
                <Button size="small" color="primary" onClick={() => deleteEvent(events.id)}> RSVP</Button>

              </div>
              :
              <div>
                <Button>
                  Delete
                </Button>
                <Button size="small" color="primary">
                  Edit
                </Button>
              </div>
            }
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}

export default EventCard