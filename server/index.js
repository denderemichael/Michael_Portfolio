require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const port = 5000;

// Supabase configuration - Use Service Role Key for Admin actions
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Please update server/.env with your Supabase credentials!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// API Routes - Projects
app.get('/api/projects', async (req, res) => {
  try {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: true });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { data, error } = await supabase.from('projects').insert([req.body]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('projects').update(req.body).eq('id', req.params.id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  console.log(`🗑️ Attempting to delete project: ${req.params.id}`);
  try {
    const { error } = await supabase.from('projects').delete().eq('id', req.params.id);
    if (error) throw error;
    console.log("✅ Project deleted successfully");
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error("❌ Delete failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// API Routes - Site Config (Hero)
app.get('/api/config', async (req, res) => {
  try {
    const { data, error } = await supabase.from('site_config').select('*');
    if (error) throw error;
    const config = data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/config', async (req, res) => {
  try {
    const { key, value } = req.body;
    const { data, error } = await supabase.from('site_config').upsert({ key, value }).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Routes - About
app.get('/api/about', async (req, res) => {
  try {
    const { data, error } = await supabase.from('about_content').select('*').single();
    if (error && error.code !== 'PGRST116') throw error;
    res.json(data || { bio: '', image_url: '' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/about', async (req, res) => {
  try {
    const { data, error } = await supabase.from('about_content').upsert({ id: 1, ...req.body }).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
