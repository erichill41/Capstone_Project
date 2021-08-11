const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({
    status: 400,
    message: "Body must have a data property.",
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
  const { tableId } = req.params;
  const table = await service.read(tableId);
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
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 400,
    message: "reservation_id does not exist",
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

function tableOpen(req, res, next) {
  const table = res.locals.table;
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `table_id is occupied by ${table.reservation_id}`
  })
};

async function hasEnoughSeats(req, res, next) {
  const { reservation, table } = res.locals;
  if (table.capacity > reservation.people) {
    return next();
  }
  next({
    status: 400,
    message: "table capacity is smaller than reservation size",
  })
}


// ----- CRUD FUNCTIONS ------
async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function read(req, res) {
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
  const table_id = req.params.tableId;
  const data = await service.updateSeatRes(reservation_id, table_id);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    validTableName,
    validTableCapacity,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), read],
  updateSeatRes: [
    hasData,
    asyncErrorBoundary(tableExists),
    tableOpen,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(hasEnoughSeats),
    asyncErrorBoundary(reservationSeated),
    asyncErrorBoundary(updateSeatRes)],
}