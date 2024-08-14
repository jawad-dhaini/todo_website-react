const mysql = require("mysql2/promise");
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

async function executeQuery(sql) {
  const connection = await pool.getConnection();
  const [results, fields] = await connection.execute(sql);
  return results;
}

async function checkRecordExists(tableName, column, value) {
  const sql = `SELECT * FROM ${tableName} WHERE ${column} = "${value}"`;
  const results = await executeQuery(sql);
  return results[0] ?? null;
}

async function insertRecord(tableName, record) {
  const sql = `INSERT INTO ${tableName} (task_text, user_id, is_complete) VALUES ("${record.task_text}", "${record.user_id}", 0)`;
  await executeQuery(sql);
}

async function getRecords(tableName, column, value) {
  const sql = `SELECT * FROM ${tableName} WHERE ${column} = "${value}"`;
  const results = await executeQuery(sql);
  return results ?? null;
}

async function deleteRecord(tableName, column, value) {
  const sql = `DELETE FROM ${tableName} WHERE ${column} = "${value}"`;
  await executeQuery(sql);
}

async function editRecord(tableName, column_to_update, column_filter, values) {
  const sql = `UPDATE ${tableName} SET ${column_to_update} = "${values[0]}" WHERE ${column_filter} = ${values[1]}`;
  await executeQuery(sql);
}

async function toggleRecord(
  tableName,
  column_to_update,
  column_filter,
  values
) {
  const sql = `UPDATE ${tableName} SET ${column_to_update} = ${values[0]} WHERE ${column_filter} = ${values[1]}`;
  await executeQuery(sql);
}

module.exports = {
  // createTable,
  checkRecordExists,
  insertRecord,
  getRecords,
  deleteRecord,
  editRecord,
  toggleRecord,
};
