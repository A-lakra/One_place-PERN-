const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Endpoint to get all notes
app.get('/notes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Endpoint to create a new note
app.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Endpoint to delete a note
app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).send('Note not found');
      }
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  
// Get all to-do items
app.get('/todos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM todo_items');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Add a new to-do item
app.post('/todos', async (req, res) => {
    const { text } = req.body;
    try {
      const result = await pool.query('INSERT INTO todo_items (text) VALUES ($1) RETURNING *', [text]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // Delete a to-do item by ID
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM todo_items WHERE id = $1', [id]);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // Delete all to-do items
app.delete('/todos', async (req, res) => {
    try {
      await pool.query('DELETE FROM todo_items');
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
