export function AuthHttpService(options) {
  
  function register(form) {
    const baseUrl = options.httpService.getUrl('/auth/register');
    return options.httpService.post(baseUrl, form)
  }

  function login({email, password}) {
    const baseUrl = options.httpService.getUrl('/auth/login');
    return options.httpService.post(baseUrl, {email, password})
  }
  function getProfile() {
    const baseUrl = options.httpService.getUrl('/auth/me');
    return options.httpService.get(baseUrl)
  }

  return {
    register,
    login,
    getProfile
  }
}