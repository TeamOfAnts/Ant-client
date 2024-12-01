import { User } from '../models';
import { httpClient } from '@libs/http-clients';
import { queryKeyMap } from '@libs/query';

export const userRepository = {
  async self() {
    return httpClient.get<User>('/users/self');
  },

  async updateName(params: { name: string }) {
    return httpClient.patch('/users/name', params);
  },
};

queryKeyMap.set(userRepository.self, ['User']);
queryKeyMap.set(userRepository.updateName, ['User']);
