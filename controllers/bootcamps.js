const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const data = await Bootcamp.find();

  const count = data.length;

  if (!data) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, count, data });
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
