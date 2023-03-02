import express from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/create', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
