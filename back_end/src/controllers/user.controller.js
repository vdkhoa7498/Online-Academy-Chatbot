const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, courseService, rateService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const response = await userService.createUser(req.body);
  console.log(response.message);
  res.status(httpStatus.CREATED).send(response);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  const message = await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.OK).send(message);
});

const lockUser = catchAsync(async (req, res) => {
  const message = await userService.lockUser(req.params.userId);
  res.status(httpStatus.OK).send(message);
});

const unlockUser = catchAsync(async (req, res) => {
  const message = await userService.unlockUser(req.params.userId);
  res.status(httpStatus.OK).send(message);
});

const getWatchList = catchAsync(async (req, res) => {
  const coursesId = req.user.favoriteCourses;
  const watchList = await courseService.findWithListId(coursesId);

  for (let i = 0; i < watchList.length; i++) {
    // Rates
    let rates = await rateService.getRateListByCourseId(watchList[i].id);
    watchList[i].rates = rates;
    let rateScore = 0;
    rates.forEach((rate) => {
      rateScore += rate.point;
    });
    rateScore /= rates.length;
    watchList[i].rateScore = rateScore;
    watchList[i].ratings = rates.length;
  }

  res.status(200).send(watchList);
});

const getMyCourses = catchAsync(async (req, res) => {
  const coursesId = req.user.registeredCourses;
  const registeredCourses = await courseService.findWithListId(coursesId);

  for (let i = 0; i < registeredCourses.length; i++) {
    // Rates
    let rates = await rateService.getRateListByCourseId(registeredCourses[i].id);
    registeredCourses[i].rates = rates;
    let rateScore = 0;
    rates.forEach((rate) => {
      rateScore += rate.point;
    });
    rateScore /= rates.length;
    registeredCourses[i].rateScore = rateScore;
    registeredCourses[i].ratings = rates.length;
  }

  res.status(200).send(registeredCourses);
});

const registerCourse = catchAsync(async (req, res) => {
  const result = await userService.registerCourse(req.params.id, req.user);

  res.status(httpStatus.CREATED).send(result);
});

const addToFavorite = catchAsync(async (req, res) => {
  const result = await userService.addToFavorite(req.params.id, req.user);

  res.status(httpStatus.CREATED).send(result);
});

const removeRegisterCourse = catchAsync(async (req, res) => {
  const result = await userService.removeRegister(req.params.id, req.user);

  res.status(200).send(result);
});

const removeFavoriteCourse = catchAsync(async (req, res) => {
  const result = await userService.removeFavorite(req.params.id, req.user);

  res.status(200).send(result);
});

const editUserAdmin = catchAsync(async (req, res) => {
  const result = await userService.editUser(req.params.userId, req.body);
  res.status(httpStatus.OK).send(result);
});

const getInfoCourse = catchAsync(async (req, res) => {
  const result = await userService.getInfoCourse(req.params.id, req.user);

  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  lockUser,
  unlockUser,
  getWatchList,
  getMyCourses,
  registerCourse,
  addToFavorite,
  editUserAdmin,
  removeRegisterCourse,
  removeFavoriteCourse,
  getInfoCourse,
};
