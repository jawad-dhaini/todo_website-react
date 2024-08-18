const mysql = require("mysql2/promise");
const config = require("../db/config");
const pool = mysql.createPool(config);

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

async function insertTask(tableName, record) {
  const sql = `INSERT INTO ${tableName} (taskText, userId, isComplete) VALUES ("${record.taskText}", "${record.userId}", 0)`;
  await executeQuery(sql);
}

async function insertUser(tableName, record) {
  const sql = `INSERT INTO ${tableName} (userId, email, password) VALUES ("${record.userId}", "${record.email}", "${record.password}")`;
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

async function editRecord(tableName, columnToUpdate, columnFilter, values) {
  const sql = `UPDATE ${tableName} SET ${columnToUpdate} = "${values[0]}" WHERE ${columnFilter} = ${values[1]}`;
  await executeQuery(sql);
}

async function toggleRecord(tableName, columnToUpdate, columnFilter, values) {
  const sql = `UPDATE ${tableName} SET ${columnToUpdate} = ${values[0]} WHERE ${columnFilter} = ${values[1]}`;
  await executeQuery(sql);
}

async function toggleAllRecords(
  tableName,
  columnToUpdate,
  columnFilter,
  values
) {
  const sql = `UPDATE ${tableName} SET ${columnToUpdate} = ${values[0]} WHERE ${columnFilter} = "${values[1]}"`;
  await executeQuery(sql);
}

module.exports = {
  // createTable,
  checkRecordExists,
  insertTask,
  insertUser,
  getRecords,
  deleteRecord,
  editRecord,
  toggleRecord,
  toggleAllRecords,
};
