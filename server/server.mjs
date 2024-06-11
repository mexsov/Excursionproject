import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

app.use(bodyParser.json());

const checkAdmin = async (req, res, next) => {
  const userId = req.headers['user-id'];
  const { rows } = await pool.query('SELECT role FROM users WHERE id = $1', [userId]);
  if (rows[0]?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

// CRUD for tours
app.post('/api/tours', checkAdmin, async (req, res) => {
  const { title, image_url, duration, price } = req.body;
  const result = await pool.query(
    'INSERT INTO tours (title, image_url, duration, price) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, image_url, duration, price]
  );
  res.json(result.rows[0]);
});

app.put('/api/tours/:id', checkAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, image_url, duration, price } = req.body;
  const result = await pool.query(
    'UPDATE tours SET title = $1, image_url = $2, duration = $3, price = $4 WHERE id = $5 RETURNING *',
    [title, image_url, duration, price, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/tours/:id', checkAdmin, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tours WHERE id = $1', [id]);
  res.json({ message: 'Tour deleted' });
});

// Manage tour dates
app.post('/api/tours/:id/dates', checkAdmin, async (req, res) => {
  const { id } = req.params;
  const { tour_date } = req.body;
  const result = await pool.query(
    'INSERT INTO tour_dates (tour_id, tour_date) VALUES ($1, $2) RETURNING *',
    [id, tour_date]
  );
  res.json(result.rows[0]);
});

app.delete('/api/tours/:id/dates/:dateId', checkAdmin, async (req, res) => {
  const { dateId } = req.params;
  await pool.query('DELETE FROM tour_dates WHERE id = $1', [dateId]);
  res.json({ message: 'Tour date deleted' });
});

// Manage participants
app.get('/api/tours/:id/participants', checkAdmin, async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM participants WHERE tour_id = $1',
    [id]
  );
  res.json(result.rows);
});

app.put('/api/participants/:id/confirm', checkAdmin, async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE participants SET is_confirmed = TRUE WHERE id = $1 RETURNING *',
    [id]
  );
  res.json(result.rows[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
