export function CourseHttpService(options) {
    function getCourses() {
      const baseUrl = options.httpService.getUrl("courses");
      return options.httpService.get(baseUrl);
    }
  
    function createCourse(form) {
      const baseUrl = options.httpService.getUrl("courses");
      return options.httpService.post(baseUrl, form);
    }
    return {
        getCourses,
        createCourse,
    };
}