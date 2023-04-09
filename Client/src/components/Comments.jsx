import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import config from '../config.json';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState({
    comment: '',
    uid: currentUser?.id,
  });

  const [err, setErr] = useState('');
  const { id } = useParams();

  const handleChange = (e) => {
    setNewComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const comment = comments.map((each) => {
    return (
      <div
        className='d-flex justify-content-between comment m-4 rounded-4'
        key={each.id}
      >
        <div className='m-3'>{each.comment}</div>
        <div className='m-3'>By {each.username}</div>
      </div>
    );
  });

  const getComments = async () => {
    try {
      let cData = await axios.get(`${config.SERVER_URL}/api/comments/${id}`);
      setComments(cData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
  }, [comments]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (Object.is(currentUser, null)) {
      setErr('Not Logged In, Log in to Comment');
      return;
    }
    try {
      await axios.post(`${config.SERVER_URL}/api/comments/${id}`, newComment);
      document.getElementById('comment').value = '';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='my-5 display-6 text-center'>Comments</div>
      <form className='my-5 text-center d-block d-lg-flex justify-content-evenly'>
        <textarea
          name='comment'
          id='comment'
          className='w-75 p-3 rounded-4'
          placeholder='Add Your Comment'
          onChange={handleChange}
        ></textarea>
        <div className='my-5 '>
          <button className='btn btn-success' onClick={handleClick}>
            Comment
          </button>
        </div>
      </form>
      <div className='text-center text-danger '>{err}</div>
      {comments.length > 0 ? (
        <div className='m-4'>{comment}</div>
      ) : (
        <>
          <div className='m-5 text-center'>No comment's for this post</div>
        </>
      )}
    </>
  );
};

export default Comments;
