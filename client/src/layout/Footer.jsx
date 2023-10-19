import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
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

// ... (Previous code remains unchanged)

// ... (Previous code remains unchanged)

export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '20vh',
          position:'relative',
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 4, // Increase the padding vertically to make the footer thicker
            px: 2,
            backgroundColor: '#2e9bd6', // Change the background color to your preference
            borderRadius: 0, // Set the border radius to 0 for square corners
            marginTop: 'auto', // Use flexbox to ensure the footer stays at the bottom
            width: '100%', // Ensure the footer spans the entire width of the page
            textAlign: 'left', // Align the text content to the left
            position:'absolute',
            bottom:'0',
          }}
        >
          <Container>
            <Typography variant="body1" sx={{ color: '#ffffff' }}> {/* Change text color to white */}
              My sticky footer can be found here.
            </Typography>
            <Typography variant="body2" sx={{ color: '#ffffff' }}> {/* Change text color to white */}
              Some additional information here.
            </Typography>
            <Typography variant="body2" sx={{ color: '#ffffff' }}> {/* Change text color to white */}
              Contact us: example@example.com
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
