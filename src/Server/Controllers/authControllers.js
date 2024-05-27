const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db').default;

const SECRET_KEY = 'your_secret_key'; // Change this to a secure secret key

exports.signup = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error signing up:', err);
      res.status(500).json({ message: 'Error signing up' });
      return;
    }
    res.status(201).json({ message: 'User signed up successfully' });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Error logging in' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).json({ token });
  });
};
