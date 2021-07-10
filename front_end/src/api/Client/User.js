export function UserHttpService(options) {
  function editProfile(query) {
    const baseUrl = options.httpService.getUrl("users");
    return options.httpService.get(baseUrl, query);
  }
  return {
      editProfile
  };
}