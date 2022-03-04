import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import axios from 'axios'

const Post = (props) => {
  let [post, setPost] = useState([]);
  let [selectedTag, setSelectedTag] = useState('');
  const postByTag = tag => {
    axios
      .get(`https://dummyapi.io/data/v1/tag/${tag}/post`, {
        headers: { "app-id": process.env.REACT_APP_API_KEY }
      })
      .then(response => {
        setSelectedTag(tag)
        setPost([...response.data.data])
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <div key={props.post.id} style={{ display: 'flex', gap: '8px', padding: '8px' }}>
      <img src={`${props.post.image}`} style={{ width: "80px", height: "80px" }} />
      <div>
        <div>{props.post.text}</div>
        <div style={{ display: 'flex', gap: '5px' }}>
          {props.post.tags.map((tag, idx) => {
            return <Chip onClick={() => postByTag(tag)} key={idx} label={tag} variant="outlined" size="small" />
          })}
        </div>
        <span>
          {(() => {
            if (props.post.likes > 50) return <span>🧡</span>
            else if (props.post.likes > 20) return <span>💛</span>
            else if (props.post.likes > 10) return <span>💚</span>
            else return <span>💙</span>
          })()}
          <span>{props.post.likes}</span>
        </span>
      </div>
      <div style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>
        {props.post.owner.firstName}, {props.post.owner.lastName}
      </div>
    </div>
  );
};

export default Post;