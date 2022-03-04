import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import axios from 'axios'
import Post from './components/Post.js'


function App() {
  const container = {
    width: '60%',
    margin: '0 auto',
    border: 'solid gray 1px'
  }
  let [post, setPost] = useState([]);
  let [user, setUser] = useState([]);
  let [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    axios
      .all([
        axios.get("https://dummyapi.io/data/v1/post", {
          headers: { "app-id": process.env.REACT_APP_API_KEY }
        }),
        axios.get("https://dummyapi.io/data/v1/user", {
          headers: { "app-id": process.env.REACT_APP_API_KEY }
        })
      ])
      .then(
        axios.spread((post_rs, user_rs) => {
          setPost([...post_rs.data.data])
          setUser([...user_rs.data.data])
        })
      )
      .catch(
        axios.spread((post_err, user_err) => {
          console.error(post_err);
          console.error(user_err);
        })
      );
  }, [])  // created

  const postByUser = (user) => {
    axios
      .get(`https://dummyapi.io/data/v1/user/${user}/post`, {
        headers: { "app-id": process.env.REACT_APP_API_KEY }
      })
      .then(response => {
        setPost([...response.data.data])
      })
      .catch(error => {
        console.error(error);
      });
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
      <Grid item xs={3}>
        {user.map(user => {
          return <div onClick={() => postByUser(user.id)} key={user.id} style={{ display: 'flex', marginBottom: '5px' }}>
            <img src={`${user.picture}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <div>
              {user.firstName}, {user.lastName}
            </div>
          </div>
        })}
      </Grid>
      <Grid item xs={9}>
        {selectedTag ? <Chip label={selectedTag} onDelete={() => setSelectedTag('')} /> : null}
        {post.map((post, idx) => {
          return <Post post={post} key={idx} />
        })}
      </Grid>
    </Grid>
  </>
}
export default App;
