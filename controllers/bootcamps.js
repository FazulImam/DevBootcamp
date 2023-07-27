const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require("../utils/geocoder");


// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  let reqQuery = { ...req.query };

  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete from reqQuery

  removeFields.map((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => {
    return `$${match}`;
  });

  query = Bootcamp.find(JSON.parse(queryStr));

  // select fields

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();


  // Query
  query = query.skip(startIndex).limit(limit);
  const data = await query;
  const count = data.length;


  if (!data) {
    return res.status(400).json({ success: false });
  }
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page : page - 1,
      limit
    }
  }
  res.status(200).json({ success: true,pagination, count, data });
});

// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const data = await Bootcamp.findById(id);

  if (!data) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data });
});

// @desc    create new bootcamps
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.create(req.body);

  if (!data) {
    return res.status(400).json({ success: false });
  }

  res.status(201).json({ success: true, data });
});

// @desc    update a bootcamps
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Bootcamp.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!data) {
    return res.status(400).json({
      success: false,
    });
  }

  res.status(200).json({ success: true, data });
});

// @desc    delete a bootcamps
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Bootcamp.findByIdAndDelete(id);

  if (!data) {
    return res.status(400).json({
      success: false,
    });
  }

  res.status(200).json({ success: true, data });
});

// @desc    get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // lat/long with geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const long = loc[0].longitude;

  // calc radius using radian
  // divide distance by radius of earth
  // Earth radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;
  const bootcamp = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[long, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamp.length,
    data: bootcamp,
  });
});
