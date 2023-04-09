import express from 'express';
import { getComments, setComments } from '../controllers/comments.js';

const router = express.Router();

router.get('/:id', getComments);
router.post('/:id', setComments);

export default router;
