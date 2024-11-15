import { DialogDescription } from '@radix-ui/react-dialog';
import {
  Button,
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '@shared/ui';
import { useState } from 'react';

function CreatePollDialog(props: { onClose: () => void }) {
  // prop destruction
  const { onClose } = props;
  // lib hooks
  // state, ref hooks
  const [options, setOptions] = useState<{ id: string }[]>(
    Array.from({ length: 2 }).map((_, i) => ({ id: i.toString() })),
  );
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Create Poll</DialogTitle>
            <DialogCloseButton onClose={onClose} />
          </div>
          <DialogDescription>당신만의 투표를 만들어보세요</DialogDescription>
        </DialogHeader>
        {options.map((option) => (
          <div key={option.id} className="flex flex-row space-x-4">
            <Input placeholder="Option" />
            <Button
              disabled={options.length === 2}
              variant="ghost"
              onClick={() => setOptions((prev) => prev.filter(({ id }) => id !== option.id))}
            >
              -
            </Button>
          </div>
        ))}
        <Button onClick={() => setOptions((prev) => [...prev, { id: Math.random().toString() }])}>+</Button>
        <DialogFooter>
          <Button type="submit" onClick={onClose}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { CreatePollDialog };
