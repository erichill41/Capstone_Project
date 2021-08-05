// TODO add each table to drop function

module.exports.seed = function (knex) {
  return knex('reservations')
  .del();
};