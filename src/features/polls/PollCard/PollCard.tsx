import { Poll } from '@models';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, DialogButton } from '@shared/ui';
import { VoteDialog } from '@features/schedules/VoteDialog';

function PollCard(props: { poll: Poll; className?: string }) {
  // prop destruction
  const { poll, className } = props;
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  const buttonText = (() => {
    if (poll.status === 'CLOSED') return '결과 보기';
    if (poll.votedSchedules.length) return '투표 수정하기';
    return '투표하기';
  })();
  // effects
  // handlers
  return (
    <Card key={poll.id} className={`max-w-[340px] ${className}`}>
      <CardHeader>
        <CardTitle>{poll.title}</CardTitle>
        <CardDescription>{poll.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DialogButton
          render={({ onOpen }) => (
            <Button onClick={onOpen} className="w-full">
              {buttonText}
            </Button>
          )}
        >
          {({ onClose }) => <VoteDialog poll={poll} onClose={onClose} />}
        </DialogButton>
      </CardContent>
    </Card>
  );
}

export { PollCard };
