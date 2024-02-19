const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database('connections.db');

app.get('/followings', (req, res) => {
  let sql = ` 
    SELECT flwng.name AS following_name
    FROM following AS flwng
    LEFT JOIN followers AS flwrs ON flwng.name = flwrs.name
    WHERE flwrs.name IS NULL;           
  `;
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});