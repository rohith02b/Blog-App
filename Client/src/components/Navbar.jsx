import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      <nav className='d-flex navbar navbar-light bg-light py-3 shadow fixed-top rounded-bottom justify-content-evenly'>
        <Link to='/' className='link text-dark'>
          <h5 className='mt-2'>Blog App</h5>
        </Link>
        <div className='d-flex'>
          <h6 className='mx-3 mt-2 name'>{currentUser?.username}</h6>
          {currentUser ? (
            <>
              <button
                onClick={() => logout(currentUser)}
                className='btn btn-danger mx-2'
              >
                Logout
              </button>
              <Link to={'/add'}>
                <button className='btn btn-success mx-2'>+</button>
              </Link>
            </>
          ) : (
            <Link className='text-white' to='/login'>
              <button className='btn btn-success'> Login </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
