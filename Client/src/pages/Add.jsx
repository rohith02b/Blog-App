import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config.json';

const Add = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  let user;

  try {
    if (currentUser.username) {
      user = currentUser.username;
    }
  } catch (err) {
    console.log('not logged in');
  }

  const [post, setPost] = useState({
    title: '',
    desc: '',
    cat: '',
    username: user,
  });

  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.SERVER_URL}/api/posts/create`, post);
      navigate('/');
    } catch (err) {
      user = '';
      console.log(err);
    }
  };

  return (
    <>
      {currentUser ? (
        <div className='auth text-center'>
          <div className='display-6 m-4'>Create a Blog</div>
          <form>
            <div>
              <input
                type='text'
                className='m-4 p-2 rounded-4'
                placeholder='Title'
                name='title'
                onChange={handleChange}
              />
            </div>
            <div>
              <textarea
                type='text'
                className='m-4 p-2 rounded-4'
                placeholder='Description'
                name='desc'
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type='text'
                className='m-4 p-2 rounded-4'
                placeholder='Category'
                name='cat'
                onChange={handleChange}
              />
            </div>
            <div className='text-center m-4'>
              <button className='btn btn-primary' onClick={handleSubmit}>
                Post
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className='display-6 auth'>Not logged In!</div>
        </>
      )}
    </>
  );
};

export default Add;
