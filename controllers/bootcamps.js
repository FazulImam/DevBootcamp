// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, data: "all bootcamp" });
};

// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({ success: true, data: "all bootcamp" });
};

// @desc    create new bootcamps
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, data: "all bootcamp" });
};

// @desc    update a bootcamps
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({ success: true, data: "all bootcamp" });
};

// @desc    delete a bootcamps
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  const id = req.params.id;
  console.log(req.originalUrl)
  res.status(200).json({ success: true, data: "all bootcamp" });
};
