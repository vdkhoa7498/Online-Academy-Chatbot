const roles = ['admin', 'teacher', 'student'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers']);
roleRights.set(roles[1], []);
roleRights.set(roles[2], []);

module.exports = {
  roles,
  roleRights,
};
