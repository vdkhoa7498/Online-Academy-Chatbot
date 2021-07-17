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

  function getStudents() {
    const baseUrl = options.httpService.getUrl("users?role=student");
    return options.httpService.get(baseUrl);
  }

  return {
    getWatchList,
    registerCourse,
    addToFavorite,
    getStudents
  };
}