import express from 'express';
import cors from 'cors';
import noteRoutes from './router/noteRoutes.js';
import authRoutes from './router/authRoutes.js';
import { authenticateUser } from './authmiddleWare.js';

const app = express();
app.use(express.json());

app.use(cors({origin: 'https://notes-full-stack-gamma.vercel.app/',}),);
app.use('/auth', authRoutes);
app.use('/notes', authenticateUser, noteRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});