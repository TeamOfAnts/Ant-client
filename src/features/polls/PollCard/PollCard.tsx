import { Poll } from '@models';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, DialogButton } from '@shared/ui';
import { VotePollDialog } from '../VotePollDialog';

function PollCard(props: { poll: Poll; className?: string }) {
  // prop destruction
  const { poll, className } = props;
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <Card key={poll.id} className={`w-[320px] ${className}`}>
      <CardHeader>
        <CardTitle>{poll.title}</CardTitle>
        <CardDescription>{poll.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DialogButton
          render={({ onOpen }) => (
            <Button onClick={onOpen} className="w-full">
              투표하기
            </Button>
          )}
        >
          {({ onClose }) => <VotePollDialog poll={poll} onClose={onClose} />}
        </DialogButton>
      </CardContent>
    </Card>
  );
}

export { PollCard };
