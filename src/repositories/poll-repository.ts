import { Poll, type PollStatus } from '@models';
import { httpClient } from '../shared/libs/http-clients';

export const pollRepository = {
  async list(params: { statuses: PollStatus[]; page: number; size: number }) {
    return httpClient.get<{ content: Poll[] }>('/polls', { params });
  },
};
