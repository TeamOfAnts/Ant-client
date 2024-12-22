import { Poll, type PollStatus } from '@models';
import { httpClient } from '../shared/libs/http-clients';
import { queryKeyMap } from '../shared/libs/query';

export const pollRepository = {
  async list(params: { status: PollStatus; page: number; size: number }) {
    return httpClient.get<Paginated<Poll>>('/polls', { params });
  },
};

queryKeyMap.set(pollRepository.list, ['Poll']);
