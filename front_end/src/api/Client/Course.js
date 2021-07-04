export function CourseHttpService(options) {
    function getCourses(query) {
      const baseUrl = options.httpService.getUrl("courses");
      return options.httpService.get(baseUrl, {
        params: {...query}
      });
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