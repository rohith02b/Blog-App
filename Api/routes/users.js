import express from 'express';
import {
  getUser,
  setUser,
  getUserPosts,
  deleteUser,
} from '../controllers/users.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/posts/:id', getUserPosts);
router.put('/:id', setUser);
router.delete('/:id', deleteUser);

export default router;
