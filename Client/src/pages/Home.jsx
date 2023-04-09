import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import config from '../config.json';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  const getPosts = async () => {
    try {
      const url = `${config.SERVER_URL}/api/posts/${cat}`;
      let data = await axios.get(url);
      setPosts(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, [cat]);

  const post = posts.map((each, index) => {
    return (
      <div key={each.id} className='m-3 col'>
        <div className='card'>
          <img
            src={`https://picsum.photos/400/200?random=${index}`}
            className='card-img-top'
            alt='...'
          />
          <div className='card-body'>
            <h5 className='card-title text-center m-4'>{each.title}</h5>
            <div className='text-center m-4'>
              <div className='mb-5 text-center'>Posted by {each.username}</div>
              <Link to={`/post/${each.id}`}>
                <button className='btn btn-primary'>Read</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Navbar />
      <div className='home'>
        <div className='d-flex justify-content-evenly'>
          <div className='display-6 text-center mb-5'>Latest Posts</div>
          <div className='dropdown mt-1'>
            <button
              className='btn btn-secondary dropdown-toggle'
              type='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Sort Category
            </button>
            <ul className='dropdown-menu text-center bg-light'>
              <li>
                <button
                  className='p-1'
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Link to={'/'} className='link'>
                    None
                  </Link>
                </button>
              </li>
              <li>
                <button
                  className='p-1'
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Link to={'/?cat=Art'} className='link'>
                    Art
                  </Link>
                </button>
              </li>
              <li>
                <button
                  className='p-1'
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Link to={'/?cat=Food'} className='link'>
                    Food
                  </Link>
                </button>
              </li>
              <li>
                <button
                  className='p-1'
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Link to={'/?cat=Technology'} className='link'>
                    Technology
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className='m-3 structure'>{post}</div>
      </div>
    </>
  );
};

export default Home;
