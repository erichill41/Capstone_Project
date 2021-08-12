const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


// ---- VALIDATION MIDDLEWARE ----

function hasData(req, res, next) {
  // console.log('REQ.BODY.DATA', req.body.data);
  if (req.body.data) {
    return next();
  }
  next({
    status: 400,
    message: "Body must have a data property.",
  })
}

function hasReservationID(req, res, next) {
  const reservation = req.body.data.reservation_id;
  if (reservation) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_id required",
  })
}

function hasTableName(req, res, next) {
  const name = req.body.data.table_name;
  if (name) {
    return next();
  }
  next({
    status: 400,
    message: "table_name property required",
  })
}

function validTableName(req, res, next) {
  const tableName = req.body.data.table_name;
  if (tableName.length >= 2) {
    return next();
  }
  next({
    status: 400,
    message: "table_name must be longer than 2 characters.",
  })
}

function hasTableCapacity(req, res, next) {
  const capacity = req.body.data.capacity;
  if (capacity) {
    return next();
  }
  next({
    status: 400,
    message: "table capacity property required",
  })
}

function validTableCapacity(req, res, next) {
  const capacity = req.body.data.capacity;
  if (capacity >= 1) {
    return next();
  }
  next({
    status: 400,
    message: "Table must seat at least 1 person.",
  })
}

async function tableExists(req, res, next) {
  const table_id = req.params.table_id;
  
  // console.log('TABLE ID', table_id);
  const table = await service.readTable(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 400,
    message: "table_id does not exist",
  })
}

async function reservationExists(req, res, next) {
  const reservation_id = req.body.data.reservation_id;
  console.log(reservation_id)
  const reservation = await service.readReservation(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation_id ${reservation_id} does not exist`,
  })
}

async function reservationSeated(req, res, next) {
  const { reservation_id } = req.body.data;
  const seated = await service.readTableByRes(reservation_id);
  if (!seated) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_id is already seated",
  })
}

async function tableOpen(req, res, next) {
  const table = res.locals.table;
  console.log(table);
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `table_id is occupied`,
  })
};

async function hasEnoughSeats(req, res, next) {
  const table = res.locals.table;
  const reservation = req.body.data;
  console.log(reservation, table);
  if (reservation.people > table.capacity) {
    next({
      status: 400,
      message: "table capacity is smaller than reservation size",
    })  
  }
  return next();  
}


// ----- CRUD FUNCTIONS ------
async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

function read(req, res) {
  const data = res.locals.table;
  res.json({ data });
}

async function create(req, res) {
  const newTable = req.body.data;
  const data = await service.create(newTable);
  res.status(201).json({ data });
}

async function updateSeatRes(req, res) {
  const { reservation_id } = req.body.data;
  const { table_id } = req.params;
  console.log('TABLE_ID', table_id);
  const data = await service.updateSeatRes(reservation_id, table_id);
  res.json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasTableName,
    validTableName,
    hasTableCapacity,
    validTableCapacity,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), read],
  updateSeatRes: [
    hasData,
    hasReservationID,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableOpen),
    asyncErrorBoundary(hasEnoughSeats),
    asyncErrorBoundary(reservationSeated),
    asyncErrorBoundary(updateSeatRes),
  ],
}