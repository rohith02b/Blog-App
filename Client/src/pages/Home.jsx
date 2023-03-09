import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  const getPosts = async () => {
    try {
      const url = `http://localhost:4000/api/posts/${cat}`;
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
              <Link to={`/post/${each.id}`}>
                <button className='btn btn-primary'>Read</button>
              </Link>
            </div>
          </div>
          <div className='mb-5 text-center'>Posted by {each.username}</div>
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
            <ul className='dropdown-menu text-center'>
              <li>
                <button
                  className='p-1'
                  onClick={(e) => {
                    e.preventDefault();
                    getPosts();
                  }}
                >
                  <Link to={'/?cat=Art'}>Art</Link>
                </button>
              </li>
              <li>
                <button
                  className='p-1'
                  onClick={(e) => {
                    e.preventDefault();
                    getPosts();
                  }}
                >
                  <Link to={'/?cat=Food'}>Food</Link>
                </button>
              </li>
              <li>
                <button
                  className='p-1'
                  onClick={(e) => {
                    e.preventDefault();
                    getPosts();
                  }}
                >
                  <Link to={'/?cat=Technology'}>Technology</Link>
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
