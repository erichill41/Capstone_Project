const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Validation Middleware
async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservationId} not found`,
  })
}

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

function validDate(req, res, next) {
  const date = Date.parse(req.body.data.reservation_date);
  if (date) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_date must be valid date",
  })
}

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

function validTime(req, res, next) {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  const valid = time.match(regex);
  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_time must be valid time",
  })
}

function hasValidPeople(req, res, next) {
  const people = req.body.data.people;
  const valid = Number.isInteger(people);
  console.log(typeof people, valid);
  if (people > 0 && valid === true) {
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
  const { date, currentDate, mobile_number } = req.query;
  if (date) {
    const data = await service.listByDate(date);
    res.json({ data });
  } else if (currentDate) {
    const data = await service.listByDate(currentDate);
    res.json({ data });
  } else if (mobile_number) {
    const data = await service.listByPhone(mobile_number);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

async function create(req, res) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData, 
    hasFirstName, 
    hasLastName, 
    hasMobileNumber, 
    hasReservationDate,
    validDate,
    hasReservationTime,
    validTime,
    hasValidPeople, 
    asyncErrorBoundary(create)
  ],
  read: [asyncErrorBoundary(reservationExists), read],
};
