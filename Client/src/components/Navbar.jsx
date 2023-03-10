import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      <nav className='d-flex navbar navbar-light bg-dark py-3 shadow fixed-top rounded-bottom justify-content-evenly'>
        <Link to='/' className='link text-light bg-dark'>
          <h5 className='mt-2 bg-dark text-light'>Blog App</h5>
        </Link>
        <div className='d-flex bg-dark'>
          <h6 className='mx-3 mt-2 name bg-dark text-light'>
            {currentUser?.username}
          </h6>
          {currentUser ? (
            <>
              <button
                onClick={() => logout(currentUser)}
                className='btn btn-danger mx-2'
              >
                Logout
              </button>
              <Link to={'/add'} className='bg-dark'>
                <button className='btn btn-success mx-2'>+</button>
              </Link>
            </>
          ) : (
            <Link className='text-white bg-dark' to='/login'>
              <button className='btn btn-success'> Login </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
