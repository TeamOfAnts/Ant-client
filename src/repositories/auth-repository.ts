import { httpClient } from '@libs/http-clients';
import { queryKeyMap } from '@libs/query';

export const authRepository = {
  async callback(params: { provider: string; code: String }) {
    return httpClient.post<string>('/users/auth', params);
  },
};

queryKeyMap.set(authRepository.callback, ['User']);
