const express = require("express");
const path = require("path");
const app = express();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "persona",
  password: "admin",
  port: 5432,
});

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join("index.html", __dirname));
});

const port = 3000;
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
