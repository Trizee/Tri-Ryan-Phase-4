import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import './Signup.css'
import { useNavigate } from "react-router-dom";
import {useState} from 'react'

function Signup({setUser}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e){
    e.preventDefault()
    fetch("/api/users",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response error");
        }
        return response.json();
    })
    .then(data => {
      setUser(data)
      navigate('/')
    })
    .catch(error => {
        console.log("error", error.message);
    });
}

  const navigate = useNavigate()

        return (
          <Container component="main" sx={{
            height: '80vh',
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            }}>
            <Box
              sx={{
                marginTop: 8,
                width:'90vw'
              }}
            >
              <Grid container>
              <CssBaseline />
              <Grid
                  item
                  xs={12}
                  sm={8}
                  md={5}
                  component={Paper}
                  elevation={6}
                  square
                >
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" variant="h5">
                      Sign Up
                    </Typography>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(e)=>setUsername(e.target.value)}

                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e)=>setPassword(e.target.value)}

                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                      </Button>
                      <Grid container display={'flex'} justifyContent={'space-between'} margin={'0 auto'}>
                        <Grid item > 
                          <Button onClick={()=>{navigate('/login')}}>Have An account?</Button>
                        </Grid>
                        <Grid item>
                          <Button onClick={()=>{navigate('/')}}>Continue As Guest</Button>
                        </Grid>
                      </Grid>
                      
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                    backgroundImage: "url(https://www.fastneonsigns.com/cdn/shop/products/purple_de7454f7-a178-4c8d-a71e-a8bb5c022027.jpg?v=1656660698&width=2000)",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                      t.palette.mode === "light"
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </Grid>
            </Box>
          </Container>
        );
      }

export default Signup