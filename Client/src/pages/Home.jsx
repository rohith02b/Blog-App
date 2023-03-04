import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      let data = await axios.get('http://localhost:4000/api/posts/');
      console.log(data.data);
      setPosts(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

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
        <div className='display-6 text-center mb-5'>Latest Posts</div>
        <div className='m-5'>{post}</div>
      </div>
    </>
  );
};

export default Home;
