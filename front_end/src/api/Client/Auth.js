export function AuthHttpService(options) {
  function register(form) {
    const baseUrl = options.httpService.getUrl("auth/register");
    return options.httpService.post(baseUrl, form);
  }

  function login({ email, password }) {
    const baseUrl = options.httpService.getUrl("auth/login");
    return options.httpService.post(baseUrl, { email, password });
  }
  function getProfile() {
    const baseUrl = options.httpService.getUrl("/auth/me");
    return options.httpService.get(baseUrl);
  }

  function loginWithGoogle(tokenId) {
    const baseUrl = options.httpService.getUrl("auth/loginwithgoogle");

    return options.httpService.post(baseUrl, { tokenId });
  }

  return {
    register,
    login,
    loginWithGoogle,
    getProfile,
  };
}
