import { User } from '../models';
import { httpClient } from '../shared/libs/http-clients';

export const userRepository = {
  async self() {
    return httpClient.get<User>('/users/self');
  },
};
