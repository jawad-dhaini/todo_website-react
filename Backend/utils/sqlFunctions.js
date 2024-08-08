const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config);

// function createTable(schema) {
//   return new Promise((resolve, reject) => {
//     pool.query(schema, (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }

function checkRecordExists(tableName, column, value) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
}

function insertRecord(tableName, record) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function getRecords(tableName, column, value) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results : null);
      }
    });
  });
}

function deleteRecord(tableName, column, value) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results : null);
      }
    });
  });
}

function editRecord(tableName, column_to_update, column_filter, values) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${tableName} SET ${column_to_update} = ? WHERE ${column_filter} = ?`;

    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results : null);
      }
    });
  });
}

module.exports = {
  // createTable,
  checkRecordExists,
  insertRecord,
  getRecords,
  deleteRecord,
  editRecord,
};
