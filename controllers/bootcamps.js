const Bootcamp = require("../models/Bootcamp");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const data = await Bootcamp.find();

    const count = data.length;

    if (!data) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true,count,data });
  } catch (error) {}
};

// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Bootcamp.findById(id);

    if (!data) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {}
};

// @desc    create new bootcamps
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    update a bootcamps
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if(!data) {
      return res.status(400).json({
        success:false
      })
    }

    res.status(200).json({ success: true, data });
  } catch (error) {}
};

// @desc    delete a bootcamps
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Bootcamp.findByIdAndDelete(id);

    if(!data) {
      return res.status(400).json({
        success : false
      })
    }

    res.status(200).json({ success: true, data });
  } catch (error) {}
};
