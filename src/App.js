import React from 'react';
import { Route } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Main from './pages/Main.js'
import Detail from './pages/Detail.js'


function App() {
  const container = {
    width: '60%',
    margin: '0 auto',
    border: 'solid gray 1px'
  }

  return <>
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>


    <Grid container style={container} >
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/detail/:id" component={Detail}>
        {/* <Detail /> */}
      </Route>
    </Grid>
  </>
}
export default App;
