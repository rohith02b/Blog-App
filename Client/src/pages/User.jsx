import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useParams } from 'react-router-dom';

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
          <h5 className='card-title'>{each.title}</h5>
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
        {currentUser?.username == user.username ? (
          <div className='col-md-6 center'>
            <div className='display-6 m-5'>User Details</div>
            <div className='text-center'>
              <div className='d-inline-block'>Username : </div>
              <input
                type='text'
                name='username'
                value={user.username}
                className='my-3 mx-4 rounded-4 p-2'
              />
            </div>
            <div className='text-center'>
              <div className=' d-inline-block'>Email : </div>
              <input
                type='text'
                name='email'
                value={user.email}
                className='my-3 mx-4 rounded-4 p-2'
              />
            </div>
            <div className='text-center'>
              <button className='btn btn-primary m-4'>Update</button>
            </div>
          </div>
        ) : (
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
          </div>
        )}
        <div className='col-md-6 center'>
          <div className='h2'>Posted Blogs</div>
          <div className='m-3'>{post}</div>
        </div>
      </div>
    </>
  );
};

export default User;
