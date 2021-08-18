const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { as } = require('../db/connection');

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
  const date = req.body.data.reservation_date;
  const valid = Date.parse(date);

  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_date must be valid date",
  })
}

function noTuesday(req, res, next) {
  const date = req.body.data.reservation_date;
  const weekday = new Date(date).getUTCDay();
  if (weekday !== 2) {
    return next();
  }
  next({
    status: 400,
    message: "Restaurant is closed on Tuesdays.",
  })
}

function noPastReservations(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const now = Date.now();
  const proposedReservation = new Date(`${reservation_date} ${reservation_time}`).valueOf();

  if (proposedReservation > now) {
    return next();
  }
  next({
    status: 400,
    message: "Reservation must be in future.",
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

function reservationDuringHours(req, res, next) {
  const time = req.body.data.reservation_time;
  console.log(time);
  const open = "10:30";
  const close = "21:30";
  if (time >= open && time <= close) {
    return next();
  }
  next({
    status: 400,
    message: "Reservation must be between 10:30AM and 9:30PM.",
  })
}

function hasValidPeople(req, res, next) {
  const people = req.body.data.people;
  const valid = Number(people);
  console.log(valid, typeof valid);
  if (people > 0 && typeof valid === 'number') {
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
  console.log(newReservation);
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}


// TODO finish update status functionality
/* 
check reservation exists
update reservation status where reservation_id matches
return all columns

*/
async function updateStatus(req, res) {
  const status = req.body.data.status;
  console.log("STATUS", status)
  console.log("REQ.PARAMS", req.params)
  console.log("RESERVATION", res.locals.reservation)

  const reservation = res.locals.reservation;
  const {reservation_id} = reservation;
  
  const data = await service.updateStatus(reservation_id, status);
  res.json({ data })
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
    noTuesday,
    noPastReservations,
    hasReservationTime,
    validTime,
    reservationDuringHours,
    hasValidPeople, 
    asyncErrorBoundary(create)
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  updateStatus: [
    asyncErrorBoundary(reservationExists), 
    asyncErrorBoundary(updateStatus),
  ]
};
