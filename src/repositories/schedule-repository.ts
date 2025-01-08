import { Schedule } from '../models';
import { httpClient } from '@libs/http-clients';
import { queryKeyMap } from '@libs/query';
import { queryClient } from '../app/App';

export const scheduleRepository = {
  async list(params: { pollId: number }) {
    return httpClient.get<Schedule[]>('/schedules', { params });
  },

  async vote(params: { scheduleIds: number[] }) {
    const result = await httpClient.patch('/schedules/votes', params);
    queryClient.refetchQueries({ queryKey: 'Poll' });
    return result;
  },
};

queryKeyMap.set(scheduleRepository.list, ['Schedule']);
queryKeyMap.set(scheduleRepository.vote, ['Schedule']);
