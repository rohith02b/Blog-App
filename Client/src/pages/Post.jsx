import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Post = () => {
  const [post, setPost] = useState([]);
  const { currentUser, logout } = useContext(AuthContext);
  let username = '';
  const navigate = useNavigate();

  try {
    if (currentUser.username) {
      username = currentUser.username;
    }
  } catch (err) {
    console.log('No editing Priveleges');
  }

  const { id } = useParams();

  const getPost = async () => {
    try {
      let data = await axios.get(`http://localhost:4000/api/posts/${id}`);
      console.log(data.data[0]);
      setPost(data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleClick = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${id}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='text-center'>
        <div className='m-5 display-6 d-flex justify-content-evenly'>
          <div>{post.title}</div>
          {username === post.username ? (
            <div>
              <Link to={`/post/edit/${id}`} className='text-primary mx-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  fill='currentColor'
                  className='bi bi-pencil'
                  viewBox='0 0 16 16'
                >
                  <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                </svg>
              </Link>
              <button
                className='text-danger mx-3 buttonBorder'
                onClick={handleClick}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  fill='currentColor'
                  className='bi bi-trash'
                  viewBox='0 0 16 16'
                >
                  <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                  <path
                    fillRule='evenodd'
                    d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                  />
                </svg>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='row mx-5 mb-5 home'>
          <div className='col-md-6 center'>
            <img src='https://picsum.photos/300' alt='error' />
          </div>
          <div className='col-md-6 center my-5 my-md-0'>
            <p className='p-4'>{post.desc}</p>
          </div>
        </div>
        <div className='m-5'>Written by {post.username}</div>
      </div>
    </>
  );
};

export default Post;
