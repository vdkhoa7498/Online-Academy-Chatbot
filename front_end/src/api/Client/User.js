export function UserHttpService(options) {
  function getWatchList() {
    const baseUrl = options.httpService.getUrl("users/watch-list");
    return options.httpService.get(baseUrl);
  }
  function getMyCourses() {
    const baseUrl = options.httpService.getUrl("users/my-courses");
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

  async function editStudent(form) {
    const baseUrl = options.httpService.getUrl('users/student');
    return await options.httpService.put(baseUrl, form)
  }

  async function getInfoCourse(id) {
    const baseUrl = options.httpService.getUrl(`users/get-info-course/${id}`);
    return await options.httpService.get(baseUrl)

  }

  return {
    getWatchList,
    getMyCourses,
    registerCourse,
    addToFavorite,
    getStudents,
    editStudent,
    removeRegisterCourse,
    removeFavoriteCourse,
    getInfoCourse
  };
}