const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Disable all caching globally
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'campuscare',
  port: 3307
});

db.connect(err => {
  if (err) console.log('DB ERROR:', err);
  else console.log('MySQL Connected');
});

// ================= USERS =================

app.post('/register', (req, res) => {
  const { fullName, email, password, course, year } = req.body;
  db.query(
    "INSERT INTO users (fullName, email, password, role, course, year) VALUES (?, ?, ?, 'student', ?, ?)",
    [fullName, email, password, course || null, year || null],
    (err) => {
      if (err) return res.json({ success: false, message: err.sqlMessage });
      res.json({ success: true });
    }
  );
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.json({ success: false });
      if (result.length > 0) {
        res.json({ success: true, user: result[0] });
      } else {
        res.json({ success: false });
      }
    }
  );
});

app.put('/users/:id', (req, res) => {
  const { fullName, password, course, year } = req.body;
  db.query(
    "UPDATE users SET fullName=?, password=?, course=?, year=? WHERE id=?",
    [fullName, password, course || null, year || null, req.params.id],
    (err) => {
      if (err) return res.json({ success: false, message: err.sqlMessage });
      res.json({ success: true });
    }
  );
});

// ================= REPORTS =================

app.post('/reports', (req, res) => {
  const r = req.body;
  console.log('INCOMING REPORT:', r);
  db.query(
    `INSERT INTO reports (headline, category, location, description, postedBy, userId, status)
     VALUES (?, ?, ?, ?, ?, ?, 'Pending')`,
    [r.headline, r.category, r.location, r.description, r.postedBy, r.userId],
    (err, result) => {
      if (err) { console.log('INSERT ERROR:', err); return res.json({ success: false, message: err.sqlMessage }); }
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.get('/reports', (req, res) => {
  db.query("SELECT * FROM reports ORDER BY id DESC", (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

app.get('/reports/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  console.log('FETCHING REPORTS FOR USER:', userId);
  db.query(
    "SELECT * FROM reports WHERE userId=? ORDER BY id DESC",
    [userId],
    (err, result) => {
      if (err) { console.log('FETCH ERROR:', err); return res.json([]); }
      console.log('REPORTS FOUND:', result.length);
      res.json(result);
    }
  );
});
// ================= SINGLE REPORT =================

// MUST be before app.put('/reports/edit/:id')
app.get('/reports/:id', (req, res) => {
  const id = parseInt(req.params.id);

  console.log('FETCHING SINGLE REPORT:', id);

  db.query(
    "SELECT * FROM reports WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        console.log('FETCH ERROR:', err);
        return res.json(null);
      }

      if (result.length === 0) {
        console.log('NO REPORT FOUND');
        return res.json(null);
      }

      console.log('FOUND REPORT:', result[0]);
      res.json(result[0]);
    }
  );
});
app.get('/reports/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('FETCHING SINGLE REPORT ID:', id);
  db.query("SELECT * FROM reports WHERE id=?", [id], (err, result) => {
    if (err) { console.log('ERROR:', err); return res.json({ error: true }); }
    if (result.length === 0) { return res.json({ error: true, message: 'not found' }); }
    console.log('FOUND:', result[0].headline);
    res.json(result[0]);
  });
});

app.put('/reports/edit/:id', (req, res) => {
  const r = req.body;
  db.query(
    `UPDATE reports SET headline=?, category=?, location=?, description=? WHERE id=?`,
    [r.headline, r.category, r.location, r.description, req.params.id],
    (err) => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    }
  );
});

app.put('/reports/status/:id', (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE reports SET status=? WHERE id=?",
    [status, req.params.id],
    (err) => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    }
  );
});

app.delete('/reports/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('DELETING REPORT:', id);
  db.query("DELETE FROM reports WHERE id=?", [id], (err, result) => {
    if (err) { console.log('DELETE ERROR:', err); return res.json({ success: false }); }
    res.json({ success: true, affected: result.affectedRows });
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));