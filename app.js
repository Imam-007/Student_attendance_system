const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Salman@121',
  database: 'my_sql'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Student Attendance Management System');
});

// Render the markAttendance.ejs file
app.get('/markAttendance', (req, res) => {
  res.render('marks.ejs');
});

// API endpoint to mark attendance
app.post('/markAttendance', (req, res) => {
  const { studentId, date } = req.body;

  // Insert attendance record into the database
  db.query(
    'INSERT INTO attendance (student_id, date) VALUES (?, ?)',
    [studentId, date],
    (err, result) => {
      if (err) {
        console.error('Error marking attendance: ' + err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Attendance marked successfully' });
      }
    }
  );
});


app.get('/attendanceList', (req, res) => {
    // Fetch attendance records from the database
    db.query('SELECT * FROM attendance', (err, results) => {
      if (err) {
        console.error('Error fetching attendance records: ' + err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Render the attendanceList.ejs file with the fetched records
        res.render('list.ejs', { attendance: results });
      }
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
