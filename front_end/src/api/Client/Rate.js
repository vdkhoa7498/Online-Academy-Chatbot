export function RateHttpService(options) {

  async function createRate(courseId, content) {
    const baseUrl = options.httpService.getUrl('rates/'+ courseId);
    return await options.httpService.post(baseUrl, content);
  }

  return {
    createRate
  }
}
