const httpStatus = require('http-status');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const config = require('../config/config');

const googleId = '1027836292196-23jb4mhdloh2pas4t8b7ab8fmfe60cdj.apps.googleusercontent.com';

const client = new OAuth2Client(googleId);

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const loginWithGoogle = catchAsync(async (req, res) => {
  const { tokenId } = req.body;

  const response = await client.verifyIdToken({ idToken: tokenId, audience: googleId });
  const { email_verified, name, email } = response.payload;
  if (email_verified) {
    const user = await userService.getUserByEmail(email);
    if (user) {
      const tokens = await tokenService.generateAuthTokens(user);
      return res.status(httpStatus.CREATED).send({ user, tokens });
    }
    const newUser = await userService.createUser({
      email,
      fullName: name,
      password: email + config.jwt.secret,
    });
    const tokens = await tokenService.generateAuthTokens(newUser);
    return res.status(httpStatus.CREATED).send({ user: newUser, tokens });
  }
});

const loginWithFacebook = catchAsync(async (req, res) => {
  const { accessToken, userId } = req.body.userInfoLogin;

  const urlGraphFacebook = `https://graph.facebook.com/${userId}?fields=id,name,email&access_token=${accessToken}`;

  // const urlGraphFacebook = `https://graph.facebook.com/me?access_token=${accessToken}`;
  // const { id, name } = await fetch(urlGraphFacebook, { method: 'GET' });
  const result = await fetch(urlGraphFacebook, { method: 'GET' });
  const { id, name } = await result.json();

  const email = id + '@gmail.com';
  const user = await userService.getUserByEmail(email);
  if (user) {
    const tokens = await tokenService.generateAuthTokens(user);
    return res.status(httpStatus.CREATED).send({ user, tokens });
  }
  const newUser = await userService.createUser({
    email,
    fullName: name,
    password: email + config.jwt.secret,
  });
  const tokens = await tokenService.generateAuthTokens(newUser);
  return res.status(httpStatus.CREATED).send({ user: newUser, tokens });
});

const getProfile = catchAsync(async (req, res) => {
  const user = await userService.getProfile(req.user.id);
  res.send(user);
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  loginWithGoogle,
  loginWithFacebook,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  getProfile,
};
