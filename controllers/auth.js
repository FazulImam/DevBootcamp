const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate Email
  if (!email || !password) {
    return next(new ErrorResponse("Please add a valid email or password", 400));
  }

  // Check for user

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("invalid credentals",401))
}



  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
