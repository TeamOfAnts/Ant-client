import { User } from '../models';
import { httpClient } from '@libs/http-clients';
import { queryKeyMap } from '@libs/query';

export const userRepository = {
  async self() {
    return httpClient.get<User>('/users/self');
  },

  async updateNickName(params: { name: string }) {
    return httpClient.patch('/users/nickname', params);
  },
};

queryKeyMap.set(userRepository.self, ['Self']);
queryKeyMap.set(userRepository.updateNickName, ['User']);
