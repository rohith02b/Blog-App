import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config.json';

const Register = () => {
  const [auth, setAuth] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAuth((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.SERVER_URL}/api/auth/register`, auth);
      navigate('/login');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='auth'>
      <div className='display-5 m-5'>Register</div>
      <form>
        <div>
          <input
            type='text'
            className='m-4 p-2 rounded-4'
            placeholder='Username'
            name='username'
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type='email'
            className='m-4 p-2 rounded-4'
            placeholder='email'
            name='email'
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type='password'
            className='m-4 p-2 rounded-4'
            placeholder='Password'
            name='password'
            onChange={handleChange}
          />
        </div>
        <div className='text-center m-4'>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      <div className='text-center m-5'>
        Already a user? <Link to='/login'>Login</Link>
      </div>
      {error && <div className='m-5 text-center text-danger'>{error}</div>}
    </div>
  );
};

export default Register;
