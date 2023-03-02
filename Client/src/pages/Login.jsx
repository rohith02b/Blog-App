import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const { login } = useContext(AuthContext);

  const [auth, setAuth] = useState({
    username: '',
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
      await login(auth);
      navigate('/');
    } catch (err) {
      setError(
        'No such user , please try again with the correct username/password'
      );
    }
  };

  return (
    <div className='auth'>
      <div className='display-5 m-5'>Login</div>
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
        Not a user? <Link to='/register'>Register</Link>
      </div>
      {error && <div className='m-5 text-center text-danger'>{error}</div>}
    </div>
  );
};

export default Login;
