const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');
const { time } = require('console');

const db = new sqlite3.Database('connections.db');

dbSQL = `
  CREATE TABLE IF NOT EXISTS followers (
    title TEXT,
    link TEXT,
    name TEXT,
    timestamp INTEGER
  )
`

insertDataSQL = `
    INSERT INTO followers (title, link, name, timestamp)
    VALUES (?, ?, ?, ?)
`

db.serialize(() => {
  db.run(dbSQL);
});

const jsonData = JSON.parse(fs.readFileSync('followers_1.json', 'utf8'));

jsonData.forEach(item => {
  const { title, string_list_data } = item;

  string_list_data.forEach(data => {
    const { href, value, timestamp } = data;

    db.run(insertDataSQL, [title, href, value, timestamp]);
  });
});

db.close();