export function CourseHttpService(options) {
  function getCourses(query) {
    const baseUrl = options.httpService.getUrl("courses");
    return options.httpService.get(baseUrl, {
      params: { ...query },
    });
  }

  async function getAllCourses() {
    const baseUrl = options.httpService.getUrl("admin/courses");
    return await options.httpService.get(baseUrl);
  }

  function createCourse(form) {
    const baseUrl = options.httpService.getUrl("courses");
    return options.httpService.post(baseUrl, form);
  }

  function addView(form) {
    const baseUrl = options.httpService.getUrl("courses/addView");
    return options.httpService.post(baseUrl, form);
  }

  async function getCourseById(courseId) {
    const baseUrl = options.httpService.getUrl(`courses/${courseId}`);
    return await options.httpService.get(baseUrl);
  }

  async function updateCourseById(courseId, form) {
    const baseUrl = options.httpService.getUrl(`courses/${courseId}`);
    return await options.httpService.put(baseUrl, form);
  }

  function getCoursesByCategoryId(categoryId) {
    const baseUrl = options.httpService.getUrl(
      `courses/category/${categoryId}`
    );
    return options.httpService.get(baseUrl);
  }

  async function deleteCourse(courseId) {
    const baseUrl = options.httpService.getUrl(`courses/${courseId}`);
    return await options.httpService.del(baseUrl);
  }

  function getVideoOfCourse(courseId) {
    const baseUrl = options.httpService.getUrl(`courses/learning/${courseId}`);
    return options.httpService.get(baseUrl);
  }

  return {
    addView,
    getCourses,
    getAllCourses,
    createCourse,
    getCourseById,
    getCoursesByCategoryId,
    deleteCourse,
    getVideoOfCourse,
    updateCourseById,
  };
}
