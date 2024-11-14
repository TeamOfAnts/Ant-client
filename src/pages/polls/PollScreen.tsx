import { pollRepository } from '@repositories';
import { useEffect, useState } from 'react';
import { Poll } from '@models';
import { PollCard } from '@features/polls';

function PollScreen(props: {}) {
  // prop destruction
  // lib hooks
  const [activePolls, setActivePolls] = useState<Poll[]>([]);
  const [closedPolls, setClosedPolls] = useState<Poll[]>([]);
  // state, ref hooks
  // query hooks
  // calculated values
  // effects

  // TODO: use react-query
  useEffect(() => {
    (async () => {
      const polls = await pollRepository.list({ statuses: ['active', 'closed'] }).then((res) => res);
      setActivePolls(polls.filter((poll) => poll.status === 'active'));
      setClosedPolls(polls.filter((poll) => poll.status === 'closed'));
    })();
  }, []);

  // handlers
  return (
    <div>
      <h1 className="text-3xl mb-24">Polls</h1>

      <div className="flex flex-col space-y-24">
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl">진행중인 투표</h3>
          <div className="grid grid-cols-4 grid-rows-auto gap-3 ">
            {activePolls.map((poll) => {
              const totalVotes = poll.options.reduce((acc, option) => acc + option.votes, 0);
              return <PollCard key={poll.id} poll={poll} totalVotes={totalVotes} />;
            })}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-xl">완료된 투표</h3>
          <div className="grid grid-cols-4 grid-rows-auto gap-3 ">
            {closedPolls.map((poll) => {
              const totalVotes = poll.options.reduce((acc, option) => acc + option.votes, 0);
              return <PollCard key={poll.id} poll={poll} totalVotes={totalVotes} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export { PollScreen };
