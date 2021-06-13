import { httpClientService } from './Client';

const BASE_URL = process.env.REACT_APP_BASE_API;

export const httpClient = httpClientService({
  baseURL: BASE_URL
})