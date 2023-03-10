import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Add from './pages/Add';
import Post from './pages/Post';
import Edit from './pages/Edit';
import User from './pages/User';
import UserEdit from './pages/UserEdit';
import axios from 'axios';

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add' element={<Add />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/post/edit/:id' element={<Edit />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/user/edit/:id' element={<UserEdit />} />
      </Routes>
    </>
  );
};

export default App;
