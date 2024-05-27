import { createConnection } from 'mysql';

const connection = createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'Jepkeitany@1999', // Your MySQL password
  database: 'restaurant_review', // Your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

export default connection;
