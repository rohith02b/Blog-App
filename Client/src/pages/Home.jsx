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
      <div key={each.id} className='m-5'>
        <div className='card mb-3'>
          <div className='row g-0'>
            <div className='col-md-4'>
              <img
                src={`https://picsum.photos/400/300?random=${index}`}
                className='img-fluid rounded-start'
                alt='...'
              />
            </div>
            <div className='col-md-8 my-auto text-center'>
              <div className='card-body'>
                <h5 className='card-title'>{each.title}</h5>
                <Link to={`/post/${each.id}`}>
                  <button className='btn btn-primary m-3'>Read</button>
                </Link>
                <div className='card-text m-md-5'>
                  <small className='text-muted'>
                    Posted by {each.username}
                  </small>
                </div>
              </div>
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
        <div className='m-5'>{post}</div>
      </div>
    </>
  );
};

export default Home;
