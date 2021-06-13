import Axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export function HttpService(options) {

  // Function that will be called to refresh authorization
  const serverUrl = process.env.REACT_APP_BASE_API;
  const refreshAuthLogic = failedRequest => Axios.post(`${serverUrl}/auth/refresh-tokens`).then(tokenRefreshResponse => {
    localStorage.setItem('access_token', tokenRefreshResponse.access.token);
    localStorage.setItem('refresh_token', tokenRefreshResponse.refresh.token);
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
    return Promise.resolve();
  });

  const HTTP = Axios.create({
    headers: {
      'Content-Type': 'application/json'
    },
  });

  createAuthRefreshInterceptor(HTTP, refreshAuthLogic);

  function getUrl(url, mock) {
    const baseURL = mock ? options.mockBaseURL : options.baseURL;

    return baseURL + url;
  }

  async function request(config) {

    const authorization = localStorage && localStorage.getItem('access_token');
    // const authorization = null;
    const configRequest = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${authorization}`,
      },
    };

    let response;
    try {
      response = await HTTP.request(configRequest);
    } catch (error) {
      response = error.response;
    }

    switch (response.status) {
    case 200:
    case 201:
    case 204:
      return response.data;
    case 400:
    case 401:
    case 403:
    case 404:
    case 500:
    case 550:
      // log.error(`[${response.status}]`, response);

      return Promise.reject(response.data);
    default:
      //
      break;
    }

  }

  async function get(url, config) {
    return request({
      ...config,
      url,
      method: 'get',
    });
  }

  async function post(url, data, config) {
    return request({
      ...config,
      url,
      data,
      method: 'post',
    });
  }

  async function put(url, data, config) {
    return request({
      ...config,
      url,
      data,
      method: 'put',
    });
  }

  async function patch(url, data, config) {
    return request({
      ...config,
      url,
      data,
      method: 'put',
    });
  }

  async function del(url, config) {
    return request({
      ...config,
      url,
      method: 'delete',
    });
  }

  return {
    getUrl,
    get,
    put,
    post,
    del,
    patch
  };
}
