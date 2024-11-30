import { httpClient } from '@libs/http-clients';
import { stringify } from 'querystring';

export const authRepository = {
  async callback(params: { provider: string; code: String }) {
    return httpClient.get<string>('/users/sign-in', {
      params,
      paramsSerializer: (params) => stringify(params),
    });
  },
};
