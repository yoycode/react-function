import React from 'react';
import { Route } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Main from './pages/Main.js'
import PostDetail from './pages/PostDetail.js'


function App() {
  const container = {
    width: '60%',
    margin: '0 auto',
  }

  return <>
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <Grid container style={container} >
      <Route exact path="/" component={Main} />
      <Route path="/detail/:id" component={PostDetail} />
    </Grid>
  </>
}
export default App;
