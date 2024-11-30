import { Button, Checkbox, Dialog, DialogContent, DialogFooter, DialogHeader, Progress } from '@shared/ui';
import { Poll } from '@models';
import { useState } from 'react';

function VotePollDialog(props: { onClose: () => void; poll: Poll }) {
  // prop destruction
  const { onClose, poll } = props;
  // lib hooks
  // state, ref hooks
  const [optionCheckedOf, setOptionCheckedOf] = useState<Record<number, boolean>>(
    poll.options.reduce((acc, option) => ({ ...acc, [option.id]: false }), {}),
  );
  // form hooks
  // query hooks
  // calculated values
  const totalVotes = poll.options.reduce((acc, option) => acc + option.votes, 0);
  // effects
  // handlers

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader title="Vote" hasCloseButton onClose={onClose} />
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
        <DialogFooter>
          <Button type="submit" onClick={onClose}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { VotePollDialog };
