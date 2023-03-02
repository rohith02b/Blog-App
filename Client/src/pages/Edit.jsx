import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Edit = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    title: '',
    desc: '',
    cat: '',
  });

  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/posts/${id}`, post);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {currentUser ? (
        <div className='auth text-center'>
          <div className='display-6 m-4'>Update Post</div>
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
                Update Post
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className='auth display-6'>Not logged In!</div>
        </>
      )}
    </>
  );
};

export default Edit;