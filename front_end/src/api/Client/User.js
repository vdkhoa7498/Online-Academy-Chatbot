export function UserHttpService(options) {
  function getWatchList() {
    const baseUrl = options.httpService.getUrl("users/watch-list");
    return options.httpService.get(baseUrl);
  }


  function registerCourse(courseId) {
    const baseUrl = options.httpService.getUrl(`users/register-course/${courseId}`);
    return options.httpService.post(baseUrl);

  }

  function addToFavorite(courseId){
    const baseUrl = options.httpService.getUrl(`users/add-favorite/${courseId}`);
    return options.httpService.post(baseUrl);
  }

  function removeRegisterCourse(courseId){
    const baseUrl = options.httpService.getUrl(`users/remove-register-course/${courseId}`);
    return options.httpService.post(baseUrl);
  }

  function removeFavoriteCourse(courseId){
    const baseUrl = options.httpService.getUrl(`users/remove-favorite-course/${courseId}`);
    return options.httpService.post(baseUrl);

  }

  async function getStudents() {
    const baseUrl = options.httpService.getUrl('users?role=student');
    return await options.httpService.get(baseUrl);
  }

  async function editUser(form) {
    const baseUrl = options.httpService.getUrl('admin/users/' + form.id);
    return await options.httpService.put(baseUrl, form);
  }

  async function deleteUser(userId) {
    const baseUrl = options.httpService.getUrl('admin/users/' + userId);
    return await options.httpService.del(baseUrl);
  }

  async function createLecturer(form) {
    const baseUrl = options.httpService.getUrl('users');
    const body = {
      email: form.email,
      fullName: form.fullName,
      password: form.password,
      role: 'lecturer'
    }
    return await options.httpService.post(baseUrl, body);
  }

  async function getLecturers() {
    const baseUrl = options.httpService.getUrl('users?role=lecturer');
    return await options.httpService.get(baseUrl);
  }

  return {
    getWatchList,
    registerCourse,
    addToFavorite,
    getStudents,
    editUser,
    deleteUser,
    removeRegisterCourse,
    removeFavoriteCourse,
    createLecturer,
    getLecturers
  };
}