const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const courseService = require("./course.service")

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};


const getProfile = async (id) => {
  return await User.findOne({ _id: id });
};

const editProfile = async ({ email, fullName }) => {
  const user = await User.findOne({ email });

  user.fullName = fullName;
  await user.save();

  return user;

}

const changePassword = async (email, oldPassword, newPassword) => {
  const user = await User.findOne({ email: email });
  if (!user || !(await user.isPasswordMatch(oldPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Vui lòng nhập đúng mật khẩu cũ');
  }

  user.password = newPassword;
  await user.save();

  return user;
}

const registerCourse = async(id, user) => {
  const result = user.registeredCourses.find(x => x===id);
  if (!result){
    user.registeredCourses.push(id); 
  
    await user.save();
  }

  return true;
}

const addToFavorite = async(id, user) => {
  const result = user.favoriteCourses.find(x => x===id);
  if (!result){
    user.favoriteCourses.push(id);
    await user.save();  
  }

  return true;
}

const removeRegister = async(id, user) => {
  user.registeredCourses = user.registeredCourses.filter(c => c !== id);
  await user.save();

  const newCourses = await courseService.findWithListId(user.registeredCourses);

  return newCourses;
}

const removeFavorite= async(id, user) => {
  user.favoriteCourses = user.favoriteCourses.filter(c => c !== id);
  await user.save();
  return await courseService.findWithListId(user.favoriteCourses);

}

const getInfoCourse = async(id, user) => {
  const isLike = await user.favoriteCourses.find(c => c === id);
  const isRegister = await user.registeredCourses.find(c => c === id);

  return { isLike: !!isLike, isRegister: !!isRegister}
}


/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return 'success';
};

const editUser = async (userId, body) => {
  const user = await User.findOne({ _id: userId });
  user.fullName = body.fullName;
  user.save();
  return user;
}

const editStudent = async (studentBody) => {
  const student = await User.findOne({ _id: studentBody.id });
  student.fullName = studentBody.fullName;
  student.save();
  return student;
}

const countStudentsByCourseId = async (courseId) => {
  return await User.countDocuments({ registeredCourses: courseId });
}

module.exports = {
  createUser,
  getProfile,
  editProfile,
  changePassword,
  registerCourse,
  addToFavorite,
  removeRegister,
  removeFavorite,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  editUser,
  editStudent,
  getInfoCourse,
  countStudentsByCourseId
};
