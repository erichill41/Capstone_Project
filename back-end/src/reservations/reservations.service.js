const { KnexTimeoutError } = require('knex');
const knex = require('../db/connection');

function list() {
  return knex('reservations')
    .select('*')
    .whereNot({ status: "finished" })
    .orderBy('reservation_time');
}

function listByDate(reservation_date) {
  return knex('reservations')
    .select('*')
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .orderBy('reservation_time')
}

function listByPhone(mobile_number) {
  return knex('reservations')
    .select('*')
    .where({ mobile_number })
    .whereNot({ status: "finished" })
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
    .insert({
      ...newReservation,
      "status": "booked",
    })
    .returning('*')
    .then((result) => result[0]);
}

async function updateStatus(reservation_id, status) {
  return knex('reservations')
    .where({ reservation_id })
    .update({status: status }, '*')
}

module.exports = {
  list,
  listByDate,
  listByPhone,
  read,
  create,
  updateStatus,
}