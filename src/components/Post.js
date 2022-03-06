import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import axios from 'axios'
import '../App.css';

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
    <div key={props.post.id} className="post-wrapper">
      <img src={`${props.post.image}`} className="post-thumbnail" />
      <div>
        <Link to={`/detail/${props.post.id}`}>{props.post.text}</Link>
        <div className="post-tags">
          {props.post.tags.map((tag, idx) => {
            return <Chip onClick={() => postByTag(tag)} key={idx} label={tag} variant="outlined" size="small" />
          })}
        </div>
        <span class="post-like">
          {(() => {
            if (props.post.likes > 50) return <span>🧡</span>
            else if (props.post.likes > 20) return <span>💛</span>
            else if (props.post.likes > 10) return <span>💚</span>
            else return <span>💙</span>
          })()}
          <span>{props.post.likes}</span>
        </span>
      </div>
      <div className="post-owner">
        <img src={`${props.post.owner.picture}`} className="post-owner-img" />
        <div>{props.post.owner.firstName}, {props.post.owner.lastName}</div>
      </div>
    </div>
  );
};

export default Post;