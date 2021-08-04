const sqlite3 = require('sqlite3').verbose();

module.exports = {
  getDataFromTable: function (table, fields, callback) {
    let db = new sqlite3.Database('src/db/vsgame.db', (err) => {
      if (err) {
        return console.error('onCreate: Execution ERROR' + err.message);
      }
      console.log('Connected to the in-memory SQlite database for Create.');
    });

    let sqlReq = 'SELECT ' + fields + " FROM " + table;
    db.all(sqlReq, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
      });
      callback(err, rows);
    });

    db.close((err) => {
      if (err) {
        return console.error('Insert: Closing ERROR' + err.message);
      }
      console.log('Close the database connection.');
    });
  }
};