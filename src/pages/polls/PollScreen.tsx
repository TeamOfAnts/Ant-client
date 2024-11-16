import { pollRepository } from '@repositories';
import { useEffect, useState } from 'react';
import { Poll } from '@models';
import { CreatePollDialog, PollCard } from '@features/polls';
import { Button, DialogButton } from '@shared/ui';

function PollScreen(props: {}) {
  // prop destruction
  // lib hooks
  const [activePolls, setActivePolls] = useState<Poll[]>([]);
  const [closedPolls, setClosedPolls] = useState<Poll[]>([]);
  // state, ref hooks
  // form hooks
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
      <div className="flex justify-between  mb-9">
        <h1 className="text-3xl">Polls</h1>
        <DialogButton render={({ onOpen }) => <Button onClick={onOpen}>Create Poll</Button>}>
          {({ onClose }) => <CreatePollDialog onClose={onClose} />}
        </DialogButton>
      </div>

      <div className="flex flex-col space-y-24">
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl">진행중인 투표</h3>
          <div className="grid lg:grid-cols-4 grid-rows-auto auto-rows-max gap-10 md:grid-cols-3 sm:grid-cols-2">
            {activePolls.map((poll) => {
              return <PollCard key={poll.id} poll={poll} />;
            })}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-xl">완료된 투표</h3>
          <div className="grid lg:grid-cols-4 grid-rows-auto auto-rows-max gap-10 md:grid-cols-3 sm:grid-cols-2">
            {closedPolls.map((poll) => {
              const totalVotes = poll.options.reduce((acc, option) => acc + option.votes, 0);
              return <PollCard key={poll.id} poll={poll} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export { PollScreen };
