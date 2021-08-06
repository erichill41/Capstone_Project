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

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}


async function create(req, res) {
  const newTable = req.body.data;
  const data = await service.create(newTable);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    validTableName,
    validTableCapacity,
    asyncErrorBoundary(create),
  ],
}