import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import config from '../config.json';

const UserEdit = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState({
    username: '',
    email: '',
  });

  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.SERVER_URL}/api/user/${id}`, post);
      logout(currentUser);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const data = await axios.get(`${config.SERVER_URL}/api/user/${id}`);
      setPost(data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {currentUser.username === post.username ? (
        <div className='auth text-center'>
          <div className='display-6 m-4'>Update User Details</div>
          <form>
            <div>
              <input
                type='text'
                className='m-4 p-2 rounded-4'
                placeholder='Username'
                value={post.username}
                name='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type='text'
                className='m-4 p-2 rounded-4'
                placeholder='Email'
                value={post.email}
                name='email'
                onChange={handleChange}
              />
            </div>
            <div className='text-center m-4'>
              <button className='btn btn-primary' onClick={handleSubmit}>
                Update Post
              </button>
            </div>
            <h5 className='m-5'>
              Note : You must login once again after updating details
            </h5>
          </form>
        </div>
      ) : (
        <>
          <div className='auth display-6'>Cannot Edit</div>
        </>
      )}
    </>
  );
};

export default UserEdit;
