const sqlite3 = require('sqlite3');
const fs = require('fs');

const db = new sqlite3.Database('connections.db');

const dbSQL = `
  CREATE TABLE IF NOT EXISTS following (
    title TEXT,
    link TEXT,
    name TEXT,
    timestamp INTEGER
  )
`;

const insertDataSQL = `
    INSERT INTO following (title, link, name, timestamp)
    VALUES (?, ?, ?, ?)
`;

db.serialize(() => {
  db.run(dbSQL);
});

const jsonData = JSON.parse(fs.readFileSync('following.json', 'utf8'));
console.log(jsonData.relationships_following)

jsonData.relationships_following.forEach(item => {
  const { title, string_list_data } = item;

  string_list_data.forEach(data => {
    const { href, value, timestamp } = data;

    db.run(insertDataSQL, [title, href, value, timestamp]);
  });
});

db.close();
