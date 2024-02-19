const sqlite3 = require('sqlite3');
const fs = require('fs');

const db = new sqlite3.Database('connections.db');

const query = `
  SELECT flwng.name AS following_name
  FROM following AS flwng
  LEFT JOIN followers AS flwrs ON flwng.name = flwrs.name
  WHERE flwrs.name IS NULL;
`;

db.all(query, [], (err, rows) => {
  if (err) {
    throw err;
  }

  const result = rows.map(row => row.following_name).join('\n');

  fs.writeFile('result.txt', result, 'utf8', (writeErr) => {
    if (writeErr) {
      throw writeErr;
    }

    console.log('Results saved to result.txt');
  });
});

db.close();
