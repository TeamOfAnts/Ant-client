import { Poll } from '@models';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from '@shared/ui';

function PollCard(props: { poll: Poll; totalVotes: number; className?: string }) {
  // prop destruction
  const { poll, totalVotes, className } = props;
  // lib hooks
  // state, ref hooks
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
        {poll.options.map((option) => (
          <div key={option.id}>
            <p>{option.description}</p>
            <Progress value={(option.votes / totalVotes) * 100} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export { PollCard };
