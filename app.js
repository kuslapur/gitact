const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`
    DB USER: ${process.env.DB_USER} <br/>
    DB PASS: ${process.env.DB_PASS}
  `);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
