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
    const baseUrl = options.httpService.getUrl("auth/me");
    return options.httpService.get(baseUrl);
  }

  function editProfile(user) {
    const baseUrl = options.httpService.getUrl("auth/edit-profile");
    return options.httpService.post(baseUrl, user);
  }

  function loginWithGoogle(tokenId) {
    const baseUrl = options.httpService.getUrl("auth/loginwithgoogle");

    return options.httpService.post(baseUrl, { tokenId });
  }

  function loginWithFacebook(userInfoLogin) {
    const baseUrl = options.httpService.getUrl("auth/loginwithfacebook");

    return options.httpService.post(baseUrl, { userInfoLogin });
  }

  function sendOtp(form) {
    const baseUrl = options.httpService.getUrl("auth/send-otp");
    return options.httpService.post(baseUrl, form);
  }

  function validateOtp(form) {
    const baseUrl = options.httpService.getUrl("auth/validate-otp");
    return options.httpService.post(baseUrl, form);
  }

  return {
    register,
    login,
    loginWithGoogle,
    loginWithFacebook,
    getProfile,
    editProfile,
    sendOtp,
    validateOtp
  };
}
