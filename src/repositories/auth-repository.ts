import { httpClient } from '@libs/http-clients';
import { queryKeyMap } from '@libs/query';

export const authRepository = {
  async callback(params: { provider: string; authorizationCode: string }) {
    return httpClient.post<{ accessToken: string; refreshToken: string; isNew: boolean }>('/users/auth', params);
  },
};

queryKeyMap.set(authRepository.callback, ['Auth']);
