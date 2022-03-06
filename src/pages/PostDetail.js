import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import '../App.css';


const dateFilter = (v) => {
  if (v) {
    return v.replace(/[T]/, " ").slice(0, 16);
  }
}

const PostDetail = () => {
  const mainImg = {
    width: 'auto',
    height: '50vh'
  }
  const subImg = {
    width: '100px',
    height: '100px'
  }
  const justifySpaceBetween = {
    display: 'flex',
    jusitfyContent: 'space-between',
    width: '100%'
  }
  const flexGap5 = {
    display: 'flex',
    gap: '5px'
  }
  const dFlex = {
    display: 'flex'
  }
  const { id } = useParams();
  let [item, setItem] = useState({});
  let [comments, setComments] = useState([]);


  useEffect(async () => {
    await axios
      .all([
        axios.get(`https://dummyapi.io/data/v1/post/${id}`, {
          headers: { "app-id": process.env.REACT_APP_API_KEY }
        }),
        axios.get(`https://dummyapi.io/data/v1/post/${id}/comment`, {
          headers: { "app-id": process.env.REACT_APP_API_KEY }
        })
      ])
      .then(
        axios.spread((detail, comment) => {
          setItem({ ...detail.data })
          setComments([...comment.data.data])
        })
      )
      .catch((detail_err, comment_err) => {
        console.error(detail_err);
        console.error(comment_err);
      });
  }, []);

  return (
    <div className="detail-container">
      <img src={`${item.image}`} className="detail-main-img" />
      <div className="detail-content">
        <div>
          <h1>
            {item.text}
            {comments.length > 0 ? <Chip label={comments.length} /> : null}
          </h1>
          <div className="detail-tags">
            {item.tags?.map((tag, index) => {
              return <Chip label={tag} key={index} />
            })}
            <span>💖{item.likes}</span>
          </div>
          <p>{dateFilter(item.publishDate)}</p>
          <a href={`${item.link}`} />
        </div>
        <div>
          {
            item.owner
              ? <div className="detail-owner">
                <img src={`${item.owner.picture}`} className="detail-owner-img" />
                <div>{item.owner.firstName}, {item.owner.lastName}</div>
              </div>
              : null
          }
        </div>
      </div>
      <div className="comment-wrapper">
        {comments.map((comment, idx) => {
          return <div key={comment.id} className="comment" >
            <div className="comment-content">
              <Chip label={idx} />
              <span>{comment.message}</span>
            </div>
            <div className="comment-info">
              <img src={`${comment.owner.picture}`} className="comment-img" />
              <div className="comment-name">
                <span>{comment.owner.title}.{comment.owner.firstName}, {comment.owner.lastName}</span>
                <span> {dateFilter(comment.publishDate)}</span>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  );
};

export default PostDetail;

