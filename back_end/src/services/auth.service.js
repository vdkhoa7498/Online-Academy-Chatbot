const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const Otp = require('../models/otp.model')
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const config= require('../config/config')
const otpGenerator = require('otp-generator');
const { sendOtpEmail } = require('./email.service')
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};


const sendOtp = async ({email}) => {
  await Otp.deleteMany({ email: email });

  const currentTime = Date.now()
  const expires = new Date( currentTime + config.otpExpirationSeconds*1000 );

  const newOtp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

  const otp = await Otp.create({
    email: email,
    otp: newOtp,
    expires: expires
  })

  await sendOtpEmail(otp)
  return otp;
};

/**
* Send reset password email
* @param {string} otp
* @param {string} authenticationKey
* @returns {Promise}
*/

const validateOtp = async ({email, otp}) =>{
  const validOtp = await Otp.findOne({otp: otp, email: email})
  if (!validOtp){
    throw new ApiError(httpStatus.NOT_FOUND, 'Email or OTP not valid!')
  }
  console.log(new Date(validOtp.expires).getTime() ,Date.now())
  if (new Date(validOtp.expires).getTime() < Date.now()){
    throw new ApiError(httpStatus.BAD_REQUEST, 'This Otp has expired!')
  }
  await Otp.deleteMany({ email: email })
  return true
}

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  sendOtp,
  validateOtp,
};
