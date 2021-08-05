const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Validation Middleware
function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({
    status: 400,
    message: "Body must have data property."
  })
}

function hasFirstName(req, res, next) {
  const name = req.body.data.first_name;
  if (name) {
    return next();
  }
  next({
    status: 400,
    message: "first_name property required",
  })
}

function hasLastName(req, res, next) {
  const name = req.body.data.last_name;
  if (name) {
    return next();
  }
  next({
    status: 400,
    message: "last_name property required",
  })
}

function hasMobileNumber(req, res, next) {
  const phone = req.body.data.mobile_number;
  if (phone) {
    return next();
  }
  next({
    status: 400,
    message: "mobile_number property required",
  })
}

function hasReservationDate(req, res, next) {
  const date = req.body.data.reservation_date;
  if (date) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_date property required",
  })
}

// function validDate(req, res, next) {
//   const date = req.body.data.reservation_date;
//   if (typeof date === 'string') {
//     return next();
//   }
//   next({
//     status: 400,
//     message: "reservation_date must be valid date",
//   })
// }

function hasReservationTime(req, res, next) {
  const time = req.body.data.reservation_time;
  if (time && typeof time === 'string') {
    return next();
  }
  next({
    status: 400,
    message: "valid reservation_time property required",
  })
}

function hasValidPeople(req, res, next) {
  const people = req.body.data.people;
  if (people && typeof people === 'number') {
    return next();
  }
  next({
    status: 400,
    message: "valid people property required"
  })
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: await service.list()
  });
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data);
  
  res.status(201).json({
    data: newReservation,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData, 
    hasFirstName, 
    hasLastName, 
    hasMobileNumber, 
    hasReservationDate,
    // validDate,
    hasReservationTime,
    hasValidPeople, 
    asyncErrorBoundary(create)
  ],
};
