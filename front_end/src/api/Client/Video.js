export function VideosHttpService(options) {
  function getVideos(query) {
    const baseUrl = options.httpService.getUrl("videos");
    return options.httpService.get(baseUrl, {
      params: { ...query },
    });
  }

  function createVideos(form) {
    const baseUrl = options.httpService.getUrl("videos");
    return options.httpService.post(baseUrl, form);
  }

  function deleteVideo(id) {
    const baseUrl = options.httpService.getUrl(`videos/${id}`);
    return options.httpService.del(baseUrl);
  }

  function setCurrentTime(form) {
    const baseUrl = options.httpService.getUrl("videos");
    return options.httpService.put(baseUrl, form);
  }

  return {
    getVideos,
    createVideos,
    deleteVideo,
    setCurrentTime,
  };
}
