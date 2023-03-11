import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: [process.env.ORIGIN],
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

app.listen(4000, () => {
  console.log('working');
});

// list of can do's
// user view done
// comments
// display by category done
// config file front-end api calls
