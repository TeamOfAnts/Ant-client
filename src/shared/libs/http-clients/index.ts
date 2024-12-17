import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_ENDPOINT } from '../../config';
import Cookie from 'js-cookie';
import { getRefreshToken, loadRefreshToken } from '@providers';
export const httpClient = (() => {
  const axios = Axios.create({
    baseURL: API_ENDPOINT,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
  axios.interceptors.request.use((config) => {
    if (!config?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers.Accept = '*/*';
    return config;
  });

  axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err?.response?.data?.errorCode === 'EXPIRED') {
        Cookie.remove('accessToken');
        const { data: accessToken } = await Axios.post<string>(`${API_ENDPOINT}/auth/refresh`, {
          refreshToken: getRefreshToken(),
        });

        loadRefreshToken(accessToken);

        const retryConfig = {
          ...err.config,
          headers: {
            ...err.config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };
        return axios(retryConfig);
      }

      if (err?.response?.data?.errorMessage) {
        err.message = err?.response?.data?.errorMessage || err.message;
      }
      return Promise.reject(err);
    },
  );

  return {
    async get<T>(
      url: string,
      config?: {
        params?: Record<string, any>;
        paramsSerializer?: (param: Record<string, any>) => any;
      },
    ): Promise<T> {
      const res = await axios.get(url, config);
      return res?.data.data;
    },
    async post<T>(
      url: string,
      data: Record<string, any>,
      config?: AxiosRequestConfig<Record<string, any>>,
    ): Promise<T> {
      const res = await axios.post(url, data, config);
      return res?.data.data;
    },
    async patch<T>(url: string, data: Record<string, any>): Promise<T> {
      const res = await axios.patch(url, data);
      return res?.data.data;
    },
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return axios.delete(url, config);
    },
  };
})();
