const roles = ['admin', 'lecturer', 'student'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers', 'admin']);
roleRights.set(roles[1], ['lecturer']);
roleRights.set(roles[2], ['student']);

module.exports = {
  roles,
  roleRights,
};
