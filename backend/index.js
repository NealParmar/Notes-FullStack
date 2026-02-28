import express from 'express';
import cors from 'cors';
import noteRoutes from './router/noteRoutes.js';
import authRoutes from './router/authRoutes.js';
import { authenticateUser } from './authmiddleWare.js';

const app = express();
app.use(express.json());

// No trailing slash – browsers send Origin without it
const allowedOrigins = [
  'https://notes-full-stack-gamma.vercel.app',
];
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
}));
app.use('/auth', authRoutes);
app.use('/notes', authenticateUser, noteRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});