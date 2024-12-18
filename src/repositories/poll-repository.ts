import { Poll, type PollStatus } from '@models';
import { httpClient } from '../shared/libs/http-clients';
import { stringify } from 'querystring';

export const pollRepository = {
  async list(params: { statuses: PollStatus[]; page: number; size: number }) {
    return httpClient.get<{ content: Poll[] }>('/polls', { params, paramsSerializer: (params) => stringify(params) });
  },
};
