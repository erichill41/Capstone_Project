const { KnexTimeoutError } = require('knex');
const knex = require('../db/connection');

function list() {
  return knex('reservations').select('*');
}

function listByDate(reservation_date) {
  return knex('reservations')
    .select('*')
    .where({ reservation_date })
    .orderBy('reservation_time')
}

function listByPhone(mobile_number) {
  return knex('reservations')
    .select('*')
    .where({ mobile_number })
    .orderBy('reservation_time')
}

function read(reservation_id) {
  return knex('reservations')
    .select('*')
    .where({ reservation_id })
    .then((result) => result[0]);
}

function create(newReservation) {
  return knex('reservations')
    .insert(newReservation)
    .returning('*')
    .then((result) => result[0]);
}

module.exports = {
  list,
  listByDate,
  listByPhone,
  read,
  create,
}