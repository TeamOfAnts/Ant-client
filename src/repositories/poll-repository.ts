import { Poll, type PollStatus } from '@models';

export const pollRepository = {
  async list(params: { statuses: PollStatus[] }) {
    return Array.from({ length: 10 })
      .map((_, index) => {
        const poll = new Poll();
        poll.id = index.toString();
        poll.status = params.statuses[Math.floor(Math.random() * params.statuses.length)];
        poll.title = `Poll ${index}`;
        poll.description = `Description ${index}`;
        poll.options = Array.from({ length: 3 }).map((__, optionIndex) => ({
          id: optionIndex,
          description: `Option ${optionIndex}`,
          votes: Math.floor(Math.random() * 100),
        }));
        return poll;
      })
      .filter((poll) => params.statuses.includes(poll.status));
  },
};
