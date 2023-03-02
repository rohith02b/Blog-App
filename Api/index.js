import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.listen(4000, () => {
  console.log('working');
});
