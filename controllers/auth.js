const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  console.log(name, email, password, role);
  const user = await User.create({ name, email, password, role });

  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password, req.body);
  // Validate Email
  if (!email || !password) {
    return next(new ErrorResponse("Please add a valid email or password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("invalid credentals", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    Expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
