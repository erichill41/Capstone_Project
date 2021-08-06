const { KnexTimeoutError } = require('knex');
const knex = require('../db/connection');

function create(newTable) {
  return knex('tables')
    .insert(newTable)
    .returning('*')
    .then((result) => result[0]);
}

function list() {
  return knex("tables")
    .select('*')
    .orderBy('table_name');
}

module.exports = {
  create,
  list,
}