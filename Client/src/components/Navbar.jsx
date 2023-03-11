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
          <h5 className='mt-1 bg-dark text-light'>Blog App</h5>
        </Link>

        <div className='d-flex bg-dark'>
          {currentUser ? (
            <>
              <div className='nav-item dropdown bg-dark text-light mx-3 my-1'>
                <Link
                  className='nav-link dropdown-toggle bg-dark text-light'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  User
                </Link>
                <ul className='dropdown-menu bg-dark text-light'>
                  <li>
                    <Link
                      to={`/user/${currentUser.id}`}
                      className='dropdown-item bg-dark text-light'
                    >
                      {currentUser.username}
                    </Link>
                  </li>
                </ul>
              </div>
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
