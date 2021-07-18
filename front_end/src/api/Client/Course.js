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

    function getCourseById(courseId) {
      const baseUrl = options.httpService.getUrl(`courses/${courseId}`);
      return options.httpService.get(baseUrl);
    }

    function getCoursesByCategoryId(categoryId) {
      const baseUrl = options.httpService.getUrl(`courses/category/${categoryId}`);
      return options.httpService.get(baseUrl);
    }

    function getVideoOfCourse(courseId) {
      const baseUrl = options.httpService.getUrl(`courses/learning/${courseId}`);
      return options.httpService.get(baseUrl)
    }

    return {
      getCourses,
      createCourse,
      getCourseById,
      getCoursesByCategoryId,
      getVideoOfCourse
    };
}