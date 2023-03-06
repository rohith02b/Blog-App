import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.listen(4000, () => {
  console.log('working');
});

// list of can do's
// user view
// comments
// display by category
