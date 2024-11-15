import { Poll } from '@models';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Checkbox, Progress } from '@shared/ui';
import { useState } from 'react';

function PollCard(props: { poll: Poll; totalVotes: number; className?: string }) {
  // prop destruction
  const { poll, totalVotes, className } = props;
  // lib hooks
  // state, ref hooks
  const [optionCheckedOf, setOptionCheckedOf] = useState<Record<number, boolean>>(
    poll.options.reduce((acc, option) => ({ ...acc, [option.id]: false }), {}),
  );
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
        <div className="flex flex-col space-y-4">
          {poll.options.map((option) => (
            <div key={option.id} className="space-y-1">
              <label htmlFor={option.id.toString()}>{option.description}</label>
              <div className="flex flex-row items-center space-x-2">
                <Checkbox
                  id={option.id.toString()}
                  checked={optionCheckedOf[option.id]}
                  onCheckedChange={(checked) =>
                    setOptionCheckedOf((prev) => ({
                      ...prev,
                      [option.id]: checked === 'indeterminate' ? false : checked,
                    }))
                  }
                />
                <Progress value={(option.votes / totalVotes) * 100} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { PollCard };
