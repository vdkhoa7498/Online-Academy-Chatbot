const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, courseService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
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
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getWatchList = catchAsync(async (req, res) => {
  const coursesId = req.user.favoriteCourses;
  const watchList = await courseService.findWithListId(coursesId);
  res.status(200).send(watchList)
})

const registerCourse = catchAsync(async (req, res) => {
  console.log(req.params.id, req.user);
  const result = await userService.registerCourse(req.params.id, req.user);

  res.status(httpStatus.CREATED).send(result);
})

const addToFavorite = catchAsync(async (req, res) => {
  const result = await userService.addToFavorite(req.params.id, req.user);

  res.status(httpStatus.CREATED).send(result);

})

const editStudent = catchAsync(async (req, res) => {
  const result = await userService.editStudent(req.body);
  res.status(httpStatus.OK).send(result);
})

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getWatchList,
  registerCourse,
  addToFavorite,
  editStudent
};
