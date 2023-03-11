import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useParams, Link } from 'react-router-dom';

const User = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const { currentUser } = useContext(AuthContext);
  let { id } = useParams();

  const getData = async () => {
    try {
      let userData = await axios.get(`http://localhost:4000/api/user/${id}`);
      let postsData = await axios.get(
        `http://localhost:4000/api/user/posts/${id}`
      );
      setUser(userData.data[0]);
      setPosts(postsData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const post = posts.map((each) => {
    return (
      <div className='card m-4' key={each.id}>
        <div className='card-body'>
          <h5 className='card-title'>
            <Link to={`/post/${each.id}`} className='link'>
              {each.title}
            </Link>
          </h5>
        </div>
      </div>
    );
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className='row m-5'>
        <div className='col-md-6 center'>
          <div className='h2 mb-5'>User Details</div>
          <div className='text-center m-2'>
            <h5 className='mx-3 d-inline-block'>Username : </h5>
            <h5 className='mx-3 d-inline-block'>{user.username}</h5>
          </div>
          <div className='text-center mb-5 mt-2'>
            <h5 className='mx-3 d-inline-block'>Email : </h5>
            <h5 className='mx-3 d-inline-block'>{user.email}</h5>
          </div>
          {currentUser?.username === user.username ? (
            <div className='text-center mb-5'>
              <Link to={`/user/edit/${id}`}>
                <button className='btn btn-primary'>Update</button>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='col-md-6 center'>
          <div className='h2'>Posted Blogs</div>
          <div className='m-3'>{post}</div>
        </div>
      </div>
    </>
  );
};

export default User;
