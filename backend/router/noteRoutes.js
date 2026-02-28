import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();


router.get('/', async (req, res) => {
  // Only return notes that belong to the authenticated user
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});


router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const { data, error } = await supabase.from('notes').insert([{ title, description, user_id:req.user.id}]).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(201).json(data);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const { data, error } = await supabase
    .from('notes')
    .update({ title, description })
    .eq('id', id)
    .eq('user_id', req.user.id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // If no rows were updated, either the note doesn't exist or doesn't belong to this user
  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.status(200).json(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', req.user.id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.status(204).send();
});

export default router;
