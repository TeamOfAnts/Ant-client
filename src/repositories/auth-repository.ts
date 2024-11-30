import { httpClient } from '@libs/http-clients';
import queryString from 'query-string';
import { queryKeyMap } from '@libs/query';

export const authRepository = {
  async callback(params: { provider: string; code: String }) {
    return httpClient.get<string>('/users/sign-in', {
      params,
      paramsSerializer: (params) => queryString.stringify(params),
    });
  },
};

queryKeyMap.set(authRepository.callback, ['User']);
