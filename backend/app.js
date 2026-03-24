const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error("DB error:", err);
  } else {
    console.log("Connected to DB ✅");
  }
});

// health check
app.get("/health", (req, res) => res.send("OK"));

// create table
app.get("/init", (req, res) => {
  db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
  )`, err => {
    if (err) return res.send(err);
    res.send("Table ready ✅");
  });
});

// add user
app.post("/users", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO users(name) VALUES(?)", [name], (err, result) => {
    if (err) return res.send(err);
    res.send({ id: result.insertId, name });
  });
});

// get users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, data) => {
    if (err) return res.send(err);
    res.send(data);
  });
});

app.listen(3000, () => console.log("Backend running 🚀"));
