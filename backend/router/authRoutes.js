import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json({ message: "Check your email for confirmation!" });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json({ token: data.session.access_token });
});

export default router;