import * as React from 'react';
import { useState ,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SvgIcon from '@mui/material/SvgIcon'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Import for backdrop dialog
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import UploadWidget from '../components/cloudinary/UploadWidget';


const theme = createTheme({
    palette: {
      primary: {
        main: '#2e9bd6',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#f0ead6',
        light: '#9b45b5',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
    },
  });

function Navbar({handleLogout, user }) {

    const navigate = useNavigate()

    const [pages,setPages] = useState(['My Events', 'Calender', 'Featured'])
    const [settings,setSettings] = useState(['Profile', 'Create Event', 'Logout'])  

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(()=>{
        if (!user){
            setPages(['Create Account','Login'])
            setSettings([])
        }
        else{
            setPages(['My Events', 'Featured'])
            setSettings(['Profile', 'Create Event', 'Logout'])
        }
    },[user])

    function settingOnClick(setting){
        if(setting === 'Create Event'){
          handleClickOpen()
          setAnchorElUser(null);
        }
        else if (setting === 'Profile'){
            setAnchorElUser(null);
        }
        else if(setting === 'Logout'){
            handleLogout()
            setAnchorElUser(null);
        }
    }

    function pagesOnClick(pages){
        if( pages === 'Create Account'){
            navigate('/signup')
        }
        else if (pages === 'Login'){
            navigate('/login')
        }
        else if(pages === 'My Events'){
          navigate('/event')
        }
        else if(pages === 'Featured'){
          navigate('/featured')
        }
    }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

//////////////////////////////////////////////////////////////////////////////

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [picture,setPicture] = useState('')

    function handleSubmit(e){
      e.preventDefault()
      fetch("/api/events",{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name,
              location,
              time,
              description,
              picture
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response error");
          }
          return response.json();
      })
      .then(data => {
        postEventHost(data)
        handleClose()
      })
      .catch(error => {
          console.log("error", error.message);
      });
  }

  function postEventHost(data){
      fetch("/api/event_hosts",{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              user_id: user.id,
              event_id: data.id
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
      })
      .catch(error => {
          console.log("error", error.message);
      });
  }

//////////////////////////////////////////////////////////////////////////////

  return (
    
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle style={{textAlign:'center'}}>🎉Create Your Own Event🎉</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Party Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setName(e.target.value)}

          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
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
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setDescription(e.target.value)}

          />
          <UploadWidget setPicture={setPicture}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>handleSubmit(e)}>Let's Party</Button>
        </DialogActions>
      </Dialog>
    <AppBar position="fixed" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={()=>{navigate('/')}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.4rem',
              color: 'black',
              textDecoration: 'none',
              paddingRight : '10px',
            }}
          >
          <SvgIcon sx={{ marginTop: '3px'}}>
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#fefcfb"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round"></g><g id="SVGRepo_iconCarrier"> <g id="layer1"> <path d="M 13.837891 0 L 13.517578 0.025390625 L 13.199219 0.076171875 L 12.886719 0.15429688 L 12.580078 0.25585938 L 12.285156 0.38085938 L 12 0.53125 L 11.728516 0.703125 L 11.470703 0.89648438 L 11.228516 1.109375 L 11.005859 1.3417969 L 10.800781 1.5898438 L 10.619141 1.8554688 L 10.458984 2.1328125 L 10.320312 2.4238281 L 10.205078 2.7246094 L 10.115234 3.0332031 L 10.050781 3.3496094 L 10.011719 3.6679688 L 10 3.9902344 L 10.011719 4.4414062 L 10.050781 4.8925781 L 10.115234 5.3417969 L 10.205078 5.7851562 L 10.318359 6.2246094 L 10.458984 6.65625 L 10.621094 7.078125 L 10.810547 7.4902344 L 11.019531 7.8925781 L 11.253906 8.28125 L 11.507812 8.65625 L 11.783203 9.015625 L 12.080078 9.359375 L 12.394531 9.6855469 L 12.726562 9.9941406 L 13.076172 10.283203 L 13.240234 10.394531 L 13.419922 10.482422 L 13.605469 10.546875 L 13.800781 10.585938 L 14 10.599609 L 14.197266 10.585938 L 14.392578 10.546875 L 14.582031 10.482422 L 14.757812 10.394531 L 14.923828 10.283203 L 15.273438 9.9941406 L 15.605469 9.6855469 L 15.919922 9.359375 L 16.214844 9.015625 L 16.490234 8.65625 L 16.746094 8.28125 L 16.978516 7.8925781 L 17.189453 7.4902344 L 17.376953 7.078125 L 17.541016 6.65625 L 17.679688 6.2246094 L 17.794922 5.7851562 L 17.884766 5.3417969 L 17.947266 4.8925781 L 17.986328 4.4414062 L 18 3.9902344 L 17.986328 3.6679688 L 17.947266 3.3496094 L 17.882812 3.0332031 L 17.792969 2.7246094 L 17.679688 2.4238281 L 17.541016 2.1328125 L 17.380859 1.8554688 L 17.197266 1.5898438 L 16.994141 1.3417969 L 16.771484 1.109375 L 16.529297 0.89648438 L 16.271484 0.703125 L 16 0.53125 L 15.712891 0.38085938 L 15.417969 0.25585938 L 15.113281 0.15429688 L 14.800781 0.076171875 L 14.482422 0.025390625 L 14.160156 0 L 13.837891 0 z M 14 0.99609375 L 14.277344 1.0078125 L 14.550781 1.0449219 L 14.820312 1.109375 L 15.083984 1.1972656 L 15.335938 1.3085938 L 15.580078 1.4433594 L 15.808594 1.5996094 L 16.021484 1.7753906 L 16.216797 1.9726562 L 16.392578 2.1835938 L 16.548828 2.4121094 L 16.685547 2.6542969 L 16.796875 2.9082031 L 16.884766 3.1699219 L 16.947266 3.4394531 L 16.986328 3.7128906 L 17 3.9902344 L 16.986328 4.4121094 L 16.947266 4.8339844 L 16.884766 5.25 L 16.794922 5.6640625 L 16.681641 6.0703125 L 16.542969 6.4707031 L 16.380859 6.8613281 L 16.195312 7.2402344 L 15.986328 7.609375 L 15.755859 7.9648438 L 15.505859 8.3046875 L 15.232422 8.6289062 L 14.941406 8.9355469 L 14.632812 9.2265625 L 14.306641 9.4960938 L 14.212891 9.5527344 L 14.109375 9.5898438 L 14 9.6015625 L 13.888672 9.5898438 L 13.785156 9.5527344 L 13.691406 9.4960938 L 13.367188 9.2265625 L 13.056641 8.9355469 L 12.765625 8.6289062 L 12.496094 8.3046875 L 12.244141 7.9648438 L 12.011719 7.609375 L 11.804688 7.2402344 L 11.619141 6.8613281 L 11.457031 6.4707031 L 11.316406 6.0703125 L 11.203125 5.6640625 L 11.115234 5.25 L 11.050781 4.8339844 L 11.013672 4.4121094 L 11 3.9902344 L 11.013672 3.7128906 L 11.050781 3.4394531 L 11.115234 3.1699219 L 11.203125 2.9082031 L 11.314453 2.6542969 L 11.449219 2.4121094 L 11.605469 2.1835938 L 11.783203 1.9726562 L 11.978516 1.7753906 L 12.191406 1.5996094 L 12.419922 1.4433594 L 12.662109 1.3085938 L 12.916016 1.1972656 L 13.177734 1.109375 L 13.449219 1.0449219 L 13.722656 1.0078125 L 14 0.99609375 z M 9.4980469 1 L 8.671875 1.0371094 L 7.8515625 1.1425781 L 7.0410156 1.3242188 L 6.2519531 1.5742188 L 5.484375 1.890625 L 4.75 2.2695312 L 4.0507812 2.7167969 L 3.3945312 3.2207031 L 2.7832031 3.78125 L 2.2246094 4.3945312 L 1.7167969 5.0507812 L 1.2734375 5.7480469 L 0.890625 6.484375 L 0.57421875 7.2480469 L 0.32421875 8.0429688 L 0.14257812 8.8496094 L 0.037109375 9.6738281 L 0 10.5 L 0.037109375 11.326172 L 0.14257812 12.150391 L 0.32421875 12.957031 L 0.57421875 13.748047 L 0.890625 14.515625 L 1.2734375 15.251953 L 1.7167969 15.949219 L 2.2246094 16.605469 L 2.7832031 17.21875 L 3.3945312 17.779297 L 4.0507812 18.283203 L 4.75 18.726562 L 5.484375 19.109375 L 6.2519531 19.425781 L 7.0410156 19.675781 L 7.8515625 19.857422 L 8.671875 19.962891 L 9.4980469 20 L 10.328125 19.962891 L 11.148438 19.857422 L 11.958984 19.675781 L 12.748047 19.425781 L 13.515625 19.109375 L 14.25 18.726562 L 14.949219 18.283203 L 15.605469 17.779297 L 16.216797 17.21875 L 16.775391 16.605469 L 17.279297 15.949219 L 17.726562 15.251953 L 18.109375 14.515625 L 18.425781 13.748047 L 18.673828 12.957031 L 18.853516 12.150391 L 18.962891 11.326172 L 19 10.5 L 18.962891 9.6738281 L 18.853516 8.8496094 L 18.673828 8.0429688 L 18.425781 7.2480469 L 18.404297 7.1953125 L 18.298828 7.4667969 L 18.087891 7.9296875 L 17.851562 8.3808594 L 17.679688 8.6699219 L 17.679688 8.671875 L 17.802734 9.3632812 L 17.869141 10.066406 L 16.763672 10.3125 L 16.304688 10.400391 L 15.933594 10.746094 L 15.521484 11.085938 L 15.261719 11.259766 L 14.96875 11.408203 L 14.652344 11.513672 L 14.330078 11.578125 L 14 11.601562 L 13.667969 11.580078 L 13.341797 11.513672 L 13.035156 11.408203 L 12.736328 11.261719 L 12.474609 11.083984 L 12.302734 10.943359 L 11.921875 10.976562 L 10.435547 11.046875 L 8.9453125 11.052734 L 8.9453125 9.9355469 L 8.9824219 8.8203125 L 9.0507812 7.703125 L 9.8046875 7.6972656 L 9.6992188 7.4667969 L 9.515625 6.9902344 L 9.3828125 6.5839844 L 9.1542969 6.5859375 L 9.2304688 6.0097656 L 9.2304688 6.0078125 L 9.1289062 5.5117188 L 9.0566406 5.0058594 L 9.0136719 4.4980469 L 9 3.984375 L 9.0136719 3.5878906 L 9.0625 3.1894531 L 9.1445312 2.7929688 L 9.2558594 2.40625 L 9.4003906 2.0292969 L 9.5722656 1.6660156 L 9.7714844 1.3222656 L 9.9785156 1.0214844 L 9.4980469 1 z M 13.882812 1.9960938 L 13.652344 2.0234375 L 13.425781 2.0761719 L 13.207031 2.15625 L 13 2.2597656 L 12.804688 2.3886719 L 12.626953 2.5371094 L 12.466797 2.7070312 L 12.328125 2.8925781 L 12.212891 3.09375 L 12.119141 3.3066406 L 12.054688 3.5292969 L 12.013672 3.7578125 L 11.998047 3.9902344 L 12.013672 4.2207031 L 12.054688 4.4492188 L 12.119141 4.671875 L 12.212891 4.8847656 L 12.328125 5.0859375 L 12.466797 5.2734375 L 12.626953 5.4414062 L 12.804688 5.5917969 L 13 5.7167969 L 13.207031 5.8222656 L 13.425781 5.9023438 L 13.652344 5.9550781 L 13.882812 5.9824219 L 14.115234 5.9824219 L 14.345703 5.9550781 L 14.574219 5.9023438 L 14.791016 5.8222656 L 15 5.7167969 L 15.195312 5.5917969 L 15.371094 5.4414062 L 15.53125 5.2734375 L 15.671875 5.0859375 L 15.787109 4.8847656 L 15.878906 4.671875 L 15.945312 4.4492188 L 15.986328 4.2207031 L 16 3.9902344 L 15.986328 3.7578125 L 15.945312 3.5292969 L 15.878906 3.3066406 L 15.787109 3.09375 L 15.671875 2.8925781 L 15.53125 2.7070312 L 15.371094 2.5371094 L 15.195312 2.3886719 L 15 2.2597656 L 14.791016 2.15625 L 14.574219 2.0761719 L 14.345703 2.0234375 L 14.115234 1.9960938 L 13.882812 1.9960938 z M 8.6914062 2.5410156 L 8.4257812 3.8671875 L 8.2050781 5.2050781 L 8.0351562 6.5488281 L 7.0175781 6.4726562 L 6.0078125 6.359375 L 4.9980469 6.2089844 L 5.3847656 5.5585938 L 5.8242188 4.9472656 L 6.3144531 4.3710938 L 6.8476562 3.8417969 L 7.4238281 3.3535156 L 8.0410156 2.9199219 L 8.6914062 2.5410156 z M 6.4804688 2.6796875 L 5.8476562 3.2480469 L 5.2636719 3.8671875 L 4.7382812 4.5351562 L 4.2636719 5.2421875 L 3.8535156 5.9882812 L 2.6347656 5.6953125 L 3.0644531 5.1308594 L 3.5410156 4.6054688 L 4.0566406 4.125 L 4.6171875 3.6875 L 5.2070312 3.296875 L 5.8300781 2.9609375 L 6.4804688 2.6796875 z M 13.958984 2.9921875 L 14.121094 2.9980469 L 14.277344 3.03125 L 14.427734 3.0859375 L 14.568359 3.1679688 L 14.691406 3.2695312 L 14.798828 3.3886719 L 14.884766 3.5253906 L 14.947266 3.6738281 L 14.986328 3.828125 L 15 3.9902344 L 14.986328 4.1484375 L 14.947266 4.3046875 L 14.884766 4.453125 L 14.798828 4.5878906 L 14.691406 4.7089844 L 14.568359 4.8105469 L 14.427734 4.890625 L 14.277344 4.9472656 L 14.121094 4.9804688 L 13.958984 4.9863281 L 13.798828 4.9667969 L 13.644531 4.921875 L 13.5 4.8535156 L 13.367188 4.7617188 L 13.251953 4.6503906 L 13.154297 4.5214844 L 13.080078 4.3808594 L 13.029297 4.2285156 L 13.001953 4.0703125 L 13.001953 3.9082031 L 13.029297 3.75 L 13.080078 3.5976562 L 13.154297 3.4550781 L 13.251953 3.328125 L 13.367188 3.2167969 L 13.5 3.125 L 13.644531 3.0566406 L 13.798828 3.0117188 L 13.958984 2.9921875 z M 2.0332031 6.6894531 L 3.4082031 7.03125 L 3.1445312 7.859375 L 2.953125 8.703125 L 2.8378906 9.5605469 L 2.7929688 10.423828 L 1.9609375 10.253906 L 1.1308594 10.066406 L 1.1972656 9.3632812 L 1.3203125 8.671875 L 1.5039062 7.9921875 L 1.7402344 7.328125 L 2.0332031 6.6894531 z M 4.5136719 7.2597656 L 5.6484375 7.4394531 L 6.7871094 7.5722656 L 7.9316406 7.6621094 L 7.8652344 8.7792969 L 7.828125 9.9003906 L 7.828125 11.019531 L 6.5175781 10.933594 L 5.2109375 10.800781 L 3.9140625 10.619141 L 3.9316406 9.9335938 L 4 9.25 L 4.1210938 8.5722656 L 4.2949219 7.90625 L 4.5136719 7.2597656 z M 1.1503906 11.216797 L 1.9960938 11.404297 L 2.8496094 11.574219 L 2.9511719 12.263672 L 3.09375 12.947266 L 3.2871094 13.621094 L 3.5234375 14.277344 L 3.8066406 14.917969 L 2.9667969 14.720703 L 2.1328125 14.498047 L 1.8300781 13.876953 L 1.5761719 13.238281 L 1.3808594 12.578125 L 1.2363281 11.904297 L 1.1503906 11.216797 z M 17.849609 11.216797 L 17.763672 11.904297 L 17.619141 12.578125 L 17.423828 13.238281 L 17.169922 13.876953 L 16.867188 14.498047 L 15.765625 14.789062 L 14.65625 15.027344 L 13.535156 15.224609 L 13.859375 14.408203 L 14.119141 13.568359 L 14.318359 12.710938 L 14.453125 11.84375 L 15.589844 11.669922 L 16.722656 11.460938 L 17.849609 11.216797 z M 4 11.763672 L 5.2851562 11.933594 L 6.5683594 12.060547 L 7.8613281 12.140625 L 7.9277344 13.261719 L 8.0273438 14.380859 L 8.1640625 15.494141 L 7.1816406 15.427734 L 6.2011719 15.324219 L 5.2246094 15.1875 L 4.8710938 14.548828 L 4.5703125 13.880859 L 4.3242188 13.191406 L 4.1347656 12.484375 L 4 11.763672 z M 13.308594 11.980469 L 13.181641 12.6875 L 13.011719 13.388672 L 12.792969 14.070312 L 12.525391 14.742188 L 12.21875 15.392578 L 11.246094 15.472656 L 10.271484 15.517578 L 9.2949219 15.529297 L 9.1542969 14.414062 L 9.0507812 13.294922 L 8.9824219 12.173828 L 10.425781 12.164062 L 11.869141 12.099609 L 13.308594 11.980469 z M 3.0898438 15.902344 L 3.8203125 16.064453 L 4.5546875 16.205078 L 4.9785156 16.785156 L 5.4414062 17.332031 L 5.9453125 17.845703 L 6.4804688 18.320312 L 5.8378906 18.042969 L 5.2207031 17.708984 L 4.6347656 17.326172 L 4.0800781 16.896484 L 3.5644531 16.417969 L 3.0898438 15.902344 z M 15.910156 15.902344 L 15.435547 16.417969 L 14.919922 16.896484 L 14.365234 17.326172 L 13.779297 17.705078 L 13.162109 18.039062 L 12.519531 18.320312 L 11.855469 18.546875 L 11.175781 18.712891 L 11.662109 18.185547 L 12.115234 17.628906 L 12.535156 17.044922 L 12.916016 16.439453 L 13.919922 16.294922 L 14.919922 16.115234 L 15.910156 15.902344 z M 6.1484375 16.445312 L 7.2421875 16.554688 L 8.3339844 16.623047 L 8.5019531 17.544922 L 8.6914062 18.458984 L 7.9921875 18.046875 L 7.328125 17.568359 L 6.7148438 17.033203 L 6.1484375 16.445312 z M 11.501953 16.576172 L 10.996094 17.242188 L 10.439453 17.869141 L 9.8359375 18.445312 L 9.6425781 17.548828 L 9.4726562 16.648438 L 10.488281 16.628906 L 11.501953 16.576172 z "></path> </g> </g></svg>
          </SvgIcon>
            PlanIT
          </Typography>
            
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>pagesOnClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={()=>navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <SvgIcon>
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round"></g><g id="SVGRepo_iconCarrier"> <g id="layer1"> <path d="M 13.837891 0 L 13.517578 0.025390625 L 13.199219 0.076171875 L 12.886719 0.15429688 L 12.580078 0.25585938 L 12.285156 0.38085938 L 12 0.53125 L 11.728516 0.703125 L 11.470703 0.89648438 L 11.228516 1.109375 L 11.005859 1.3417969 L 10.800781 1.5898438 L 10.619141 1.8554688 L 10.458984 2.1328125 L 10.320312 2.4238281 L 10.205078 2.7246094 L 10.115234 3.0332031 L 10.050781 3.3496094 L 10.011719 3.6679688 L 10 3.9902344 L 10.011719 4.4414062 L 10.050781 4.8925781 L 10.115234 5.3417969 L 10.205078 5.7851562 L 10.318359 6.2246094 L 10.458984 6.65625 L 10.621094 7.078125 L 10.810547 7.4902344 L 11.019531 7.8925781 L 11.253906 8.28125 L 11.507812 8.65625 L 11.783203 9.015625 L 12.080078 9.359375 L 12.394531 9.6855469 L 12.726562 9.9941406 L 13.076172 10.283203 L 13.240234 10.394531 L 13.419922 10.482422 L 13.605469 10.546875 L 13.800781 10.585938 L 14 10.599609 L 14.197266 10.585938 L 14.392578 10.546875 L 14.582031 10.482422 L 14.757812 10.394531 L 14.923828 10.283203 L 15.273438 9.9941406 L 15.605469 9.6855469 L 15.919922 9.359375 L 16.214844 9.015625 L 16.490234 8.65625 L 16.746094 8.28125 L 16.978516 7.8925781 L 17.189453 7.4902344 L 17.376953 7.078125 L 17.541016 6.65625 L 17.679688 6.2246094 L 17.794922 5.7851562 L 17.884766 5.3417969 L 17.947266 4.8925781 L 17.986328 4.4414062 L 18 3.9902344 L 17.986328 3.6679688 L 17.947266 3.3496094 L 17.882812 3.0332031 L 17.792969 2.7246094 L 17.679688 2.4238281 L 17.541016 2.1328125 L 17.380859 1.8554688 L 17.197266 1.5898438 L 16.994141 1.3417969 L 16.771484 1.109375 L 16.529297 0.89648438 L 16.271484 0.703125 L 16 0.53125 L 15.712891 0.38085938 L 15.417969 0.25585938 L 15.113281 0.15429688 L 14.800781 0.076171875 L 14.482422 0.025390625 L 14.160156 0 L 13.837891 0 z M 14 0.99609375 L 14.277344 1.0078125 L 14.550781 1.0449219 L 14.820312 1.109375 L 15.083984 1.1972656 L 15.335938 1.3085938 L 15.580078 1.4433594 L 15.808594 1.5996094 L 16.021484 1.7753906 L 16.216797 1.9726562 L 16.392578 2.1835938 L 16.548828 2.4121094 L 16.685547 2.6542969 L 16.796875 2.9082031 L 16.884766 3.1699219 L 16.947266 3.4394531 L 16.986328 3.7128906 L 17 3.9902344 L 16.986328 4.4121094 L 16.947266 4.8339844 L 16.884766 5.25 L 16.794922 5.6640625 L 16.681641 6.0703125 L 16.542969 6.4707031 L 16.380859 6.8613281 L 16.195312 7.2402344 L 15.986328 7.609375 L 15.755859 7.9648438 L 15.505859 8.3046875 L 15.232422 8.6289062 L 14.941406 8.9355469 L 14.632812 9.2265625 L 14.306641 9.4960938 L 14.212891 9.5527344 L 14.109375 9.5898438 L 14 9.6015625 L 13.888672 9.5898438 L 13.785156 9.5527344 L 13.691406 9.4960938 L 13.367188 9.2265625 L 13.056641 8.9355469 L 12.765625 8.6289062 L 12.496094 8.3046875 L 12.244141 7.9648438 L 12.011719 7.609375 L 11.804688 7.2402344 L 11.619141 6.8613281 L 11.457031 6.4707031 L 11.316406 6.0703125 L 11.203125 5.6640625 L 11.115234 5.25 L 11.050781 4.8339844 L 11.013672 4.4121094 L 11 3.9902344 L 11.013672 3.7128906 L 11.050781 3.4394531 L 11.115234 3.1699219 L 11.203125 2.9082031 L 11.314453 2.6542969 L 11.449219 2.4121094 L 11.605469 2.1835938 L 11.783203 1.9726562 L 11.978516 1.7753906 L 12.191406 1.5996094 L 12.419922 1.4433594 L 12.662109 1.3085938 L 12.916016 1.1972656 L 13.177734 1.109375 L 13.449219 1.0449219 L 13.722656 1.0078125 L 14 0.99609375 z M 9.4980469 1 L 8.671875 1.0371094 L 7.8515625 1.1425781 L 7.0410156 1.3242188 L 6.2519531 1.5742188 L 5.484375 1.890625 L 4.75 2.2695312 L 4.0507812 2.7167969 L 3.3945312 3.2207031 L 2.7832031 3.78125 L 2.2246094 4.3945312 L 1.7167969 5.0507812 L 1.2734375 5.7480469 L 0.890625 6.484375 L 0.57421875 7.2480469 L 0.32421875 8.0429688 L 0.14257812 8.8496094 L 0.037109375 9.6738281 L 0 10.5 L 0.037109375 11.326172 L 0.14257812 12.150391 L 0.32421875 12.957031 L 0.57421875 13.748047 L 0.890625 14.515625 L 1.2734375 15.251953 L 1.7167969 15.949219 L 2.2246094 16.605469 L 2.7832031 17.21875 L 3.3945312 17.779297 L 4.0507812 18.283203 L 4.75 18.726562 L 5.484375 19.109375 L 6.2519531 19.425781 L 7.0410156 19.675781 L 7.8515625 19.857422 L 8.671875 19.962891 L 9.4980469 20 L 10.328125 19.962891 L 11.148438 19.857422 L 11.958984 19.675781 L 12.748047 19.425781 L 13.515625 19.109375 L 14.25 18.726562 L 14.949219 18.283203 L 15.605469 17.779297 L 16.216797 17.21875 L 16.775391 16.605469 L 17.279297 15.949219 L 17.726562 15.251953 L 18.109375 14.515625 L 18.425781 13.748047 L 18.673828 12.957031 L 18.853516 12.150391 L 18.962891 11.326172 L 19 10.5 L 18.962891 9.6738281 L 18.853516 8.8496094 L 18.673828 8.0429688 L 18.425781 7.2480469 L 18.404297 7.1953125 L 18.298828 7.4667969 L 18.087891 7.9296875 L 17.851562 8.3808594 L 17.679688 8.6699219 L 17.679688 8.671875 L 17.802734 9.3632812 L 17.869141 10.066406 L 16.763672 10.3125 L 16.304688 10.400391 L 15.933594 10.746094 L 15.521484 11.085938 L 15.261719 11.259766 L 14.96875 11.408203 L 14.652344 11.513672 L 14.330078 11.578125 L 14 11.601562 L 13.667969 11.580078 L 13.341797 11.513672 L 13.035156 11.408203 L 12.736328 11.261719 L 12.474609 11.083984 L 12.302734 10.943359 L 11.921875 10.976562 L 10.435547 11.046875 L 8.9453125 11.052734 L 8.9453125 9.9355469 L 8.9824219 8.8203125 L 9.0507812 7.703125 L 9.8046875 7.6972656 L 9.6992188 7.4667969 L 9.515625 6.9902344 L 9.3828125 6.5839844 L 9.1542969 6.5859375 L 9.2304688 6.0097656 L 9.2304688 6.0078125 L 9.1289062 5.5117188 L 9.0566406 5.0058594 L 9.0136719 4.4980469 L 9 3.984375 L 9.0136719 3.5878906 L 9.0625 3.1894531 L 9.1445312 2.7929688 L 9.2558594 2.40625 L 9.4003906 2.0292969 L 9.5722656 1.6660156 L 9.7714844 1.3222656 L 9.9785156 1.0214844 L 9.4980469 1 z M 13.882812 1.9960938 L 13.652344 2.0234375 L 13.425781 2.0761719 L 13.207031 2.15625 L 13 2.2597656 L 12.804688 2.3886719 L 12.626953 2.5371094 L 12.466797 2.7070312 L 12.328125 2.8925781 L 12.212891 3.09375 L 12.119141 3.3066406 L 12.054688 3.5292969 L 12.013672 3.7578125 L 11.998047 3.9902344 L 12.013672 4.2207031 L 12.054688 4.4492188 L 12.119141 4.671875 L 12.212891 4.8847656 L 12.328125 5.0859375 L 12.466797 5.2734375 L 12.626953 5.4414062 L 12.804688 5.5917969 L 13 5.7167969 L 13.207031 5.8222656 L 13.425781 5.9023438 L 13.652344 5.9550781 L 13.882812 5.9824219 L 14.115234 5.9824219 L 14.345703 5.9550781 L 14.574219 5.9023438 L 14.791016 5.8222656 L 15 5.7167969 L 15.195312 5.5917969 L 15.371094 5.4414062 L 15.53125 5.2734375 L 15.671875 5.0859375 L 15.787109 4.8847656 L 15.878906 4.671875 L 15.945312 4.4492188 L 15.986328 4.2207031 L 16 3.9902344 L 15.986328 3.7578125 L 15.945312 3.5292969 L 15.878906 3.3066406 L 15.787109 3.09375 L 15.671875 2.8925781 L 15.53125 2.7070312 L 15.371094 2.5371094 L 15.195312 2.3886719 L 15 2.2597656 L 14.791016 2.15625 L 14.574219 2.0761719 L 14.345703 2.0234375 L 14.115234 1.9960938 L 13.882812 1.9960938 z M 8.6914062 2.5410156 L 8.4257812 3.8671875 L 8.2050781 5.2050781 L 8.0351562 6.5488281 L 7.0175781 6.4726562 L 6.0078125 6.359375 L 4.9980469 6.2089844 L 5.3847656 5.5585938 L 5.8242188 4.9472656 L 6.3144531 4.3710938 L 6.8476562 3.8417969 L 7.4238281 3.3535156 L 8.0410156 2.9199219 L 8.6914062 2.5410156 z M 6.4804688 2.6796875 L 5.8476562 3.2480469 L 5.2636719 3.8671875 L 4.7382812 4.5351562 L 4.2636719 5.2421875 L 3.8535156 5.9882812 L 2.6347656 5.6953125 L 3.0644531 5.1308594 L 3.5410156 4.6054688 L 4.0566406 4.125 L 4.6171875 3.6875 L 5.2070312 3.296875 L 5.8300781 2.9609375 L 6.4804688 2.6796875 z M 13.958984 2.9921875 L 14.121094 2.9980469 L 14.277344 3.03125 L 14.427734 3.0859375 L 14.568359 3.1679688 L 14.691406 3.2695312 L 14.798828 3.3886719 L 14.884766 3.5253906 L 14.947266 3.6738281 L 14.986328 3.828125 L 15 3.9902344 L 14.986328 4.1484375 L 14.947266 4.3046875 L 14.884766 4.453125 L 14.798828 4.5878906 L 14.691406 4.7089844 L 14.568359 4.8105469 L 14.427734 4.890625 L 14.277344 4.9472656 L 14.121094 4.9804688 L 13.958984 4.9863281 L 13.798828 4.9667969 L 13.644531 4.921875 L 13.5 4.8535156 L 13.367188 4.7617188 L 13.251953 4.6503906 L 13.154297 4.5214844 L 13.080078 4.3808594 L 13.029297 4.2285156 L 13.001953 4.0703125 L 13.001953 3.9082031 L 13.029297 3.75 L 13.080078 3.5976562 L 13.154297 3.4550781 L 13.251953 3.328125 L 13.367188 3.2167969 L 13.5 3.125 L 13.644531 3.0566406 L 13.798828 3.0117188 L 13.958984 2.9921875 z M 2.0332031 6.6894531 L 3.4082031 7.03125 L 3.1445312 7.859375 L 2.953125 8.703125 L 2.8378906 9.5605469 L 2.7929688 10.423828 L 1.9609375 10.253906 L 1.1308594 10.066406 L 1.1972656 9.3632812 L 1.3203125 8.671875 L 1.5039062 7.9921875 L 1.7402344 7.328125 L 2.0332031 6.6894531 z M 4.5136719 7.2597656 L 5.6484375 7.4394531 L 6.7871094 7.5722656 L 7.9316406 7.6621094 L 7.8652344 8.7792969 L 7.828125 9.9003906 L 7.828125 11.019531 L 6.5175781 10.933594 L 5.2109375 10.800781 L 3.9140625 10.619141 L 3.9316406 9.9335938 L 4 9.25 L 4.1210938 8.5722656 L 4.2949219 7.90625 L 4.5136719 7.2597656 z M 1.1503906 11.216797 L 1.9960938 11.404297 L 2.8496094 11.574219 L 2.9511719 12.263672 L 3.09375 12.947266 L 3.2871094 13.621094 L 3.5234375 14.277344 L 3.8066406 14.917969 L 2.9667969 14.720703 L 2.1328125 14.498047 L 1.8300781 13.876953 L 1.5761719 13.238281 L 1.3808594 12.578125 L 1.2363281 11.904297 L 1.1503906 11.216797 z M 17.849609 11.216797 L 17.763672 11.904297 L 17.619141 12.578125 L 17.423828 13.238281 L 17.169922 13.876953 L 16.867188 14.498047 L 15.765625 14.789062 L 14.65625 15.027344 L 13.535156 15.224609 L 13.859375 14.408203 L 14.119141 13.568359 L 14.318359 12.710938 L 14.453125 11.84375 L 15.589844 11.669922 L 16.722656 11.460938 L 17.849609 11.216797 z M 4 11.763672 L 5.2851562 11.933594 L 6.5683594 12.060547 L 7.8613281 12.140625 L 7.9277344 13.261719 L 8.0273438 14.380859 L 8.1640625 15.494141 L 7.1816406 15.427734 L 6.2011719 15.324219 L 5.2246094 15.1875 L 4.8710938 14.548828 L 4.5703125 13.880859 L 4.3242188 13.191406 L 4.1347656 12.484375 L 4 11.763672 z M 13.308594 11.980469 L 13.181641 12.6875 L 13.011719 13.388672 L 12.792969 14.070312 L 12.525391 14.742188 L 12.21875 15.392578 L 11.246094 15.472656 L 10.271484 15.517578 L 9.2949219 15.529297 L 9.1542969 14.414062 L 9.0507812 13.294922 L 8.9824219 12.173828 L 10.425781 12.164062 L 11.869141 12.099609 L 13.308594 11.980469 z M 3.0898438 15.902344 L 3.8203125 16.064453 L 4.5546875 16.205078 L 4.9785156 16.785156 L 5.4414062 17.332031 L 5.9453125 17.845703 L 6.4804688 18.320312 L 5.8378906 18.042969 L 5.2207031 17.708984 L 4.6347656 17.326172 L 4.0800781 16.896484 L 3.5644531 16.417969 L 3.0898438 15.902344 z M 15.910156 15.902344 L 15.435547 16.417969 L 14.919922 16.896484 L 14.365234 17.326172 L 13.779297 17.705078 L 13.162109 18.039062 L 12.519531 18.320312 L 11.855469 18.546875 L 11.175781 18.712891 L 11.662109 18.185547 L 12.115234 17.628906 L 12.535156 17.044922 L 12.916016 16.439453 L 13.919922 16.294922 L 14.919922 16.115234 L 15.910156 15.902344 z M 6.1484375 16.445312 L 7.2421875 16.554688 L 8.3339844 16.623047 L 8.5019531 17.544922 L 8.6914062 18.458984 L 7.9921875 18.046875 L 7.328125 17.568359 L 6.7148438 17.033203 L 6.1484375 16.445312 z M 11.501953 16.576172 L 10.996094 17.242188 L 10.439453 17.869141 L 9.8359375 18.445312 L 9.6425781 17.548828 L 9.4726562 16.648438 L 10.488281 16.628906 L 11.501953 16.576172 z "></path> </g> </g></svg>
          </SvgIcon>
          PlanIT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>pagesOnClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {user ? <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.username} src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>settingOnClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>:null}
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}

export default Navbar