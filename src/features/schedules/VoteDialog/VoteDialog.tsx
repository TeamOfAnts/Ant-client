import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  LoadingProgress,
  Progress,
} from '@shared/ui';
import { Poll } from '@models';
import { useMutation, useQuery } from '@libs/query';
import { scheduleRepository } from '@repositories';
import { useState } from 'react';
import { formatDateTime, getDayOfWeek } from '@libs/date';

function VoteDialog(props: { onClose: () => void; poll: Poll }) {
  // prop destruction
  const { onClose, poll } = props;
  // lib hooks
  // state, ref hooks
  const [checked, setChecked] = useState<Map<number, boolean>>(new Map(poll.votedSchedules.map((id) => [id, true])));
  // form hooks
  // query hooks
  const { data: schedules, isLoading } = useQuery(scheduleRepository.list, { variables: { pollId: poll.id } });
  const { mutateAsync: vote, isLoading: isVoting } = useMutation(scheduleRepository.vote);
  // calculated values
  const loading = isLoading || !schedules;
  const totalVotes = schedules?.reduce((acc, schedule) => acc + schedule.votes, 0) ?? 0;
  // effects
  // handlers

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        {loading ? (
          <LoadingProgress />
        ) : (
          <>
            <DialogHeader title="Vote" hasCloseButton onClose={onClose} />
            <div className="flex flex-col space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="space-y-1">
                  <label htmlFor={schedule.id.toString()}>
                    {formatDateTime({ date: schedule.scheduleOn, format: 'YYYY-MM-DD' })}{' '}
                    {getDayOfWeek(schedule.scheduleOn)}
                  </label>
                  <div className="flex flex-row items-center space-x-2">
                    <Checkbox
                      disabled={checked.size >= 3 && !checked.get(schedule.id)}
                      id={schedule.id.toString()}
                      checked={!!checked.get(schedule.id)}
                      onCheckedChange={(checked) =>
                        setChecked((prev) => {
                          const newMap = new Map(prev);
                          if (checked === 'indeterminate' || !checked) {
                            newMap.delete(schedule.id);
                          } else {
                            newMap.set(schedule.id, checked);
                          }
                          return newMap;
                        })
                      }
                    />
                    <Progress value={(schedule.votes / totalVotes) * 100} />
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                loading={isVoting}
                onClick={async () => {
                  await vote({ scheduleIds: Array.from(checked.keys()) });
                  onClose();
                }}
              >
                Submit
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { VoteDialog };
