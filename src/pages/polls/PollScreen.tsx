import { PollList } from '@features/polls';
import { useUser } from '@providers';

function PollScreen(props: {}) {
  // prop destruction
  // lib hooks
  const [user] = useUser();
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects

  // handlers
  return (
    <div>
      <div className="flex justify-between  mb-9">
        <h1 className="text-3xl">Polls</h1>
        {/* <DialogButton render={({ onOpen }) => <Button onClick={onOpen}>Create Poll</Button>}>
          {({ onClose }) => <CreatePollDialog onClose={onClose} />}
        </DialogButton> */}
      </div>

      <div className="flex flex-col space-y-16">
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl">진행중인 투표</h3>
          <PollList status="OPEN" />
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-xl">완료된 투표</h3>
          <PollList status="CLOSED" />
        </div>
      </div>
    </div>
  );
}

export { PollScreen };
