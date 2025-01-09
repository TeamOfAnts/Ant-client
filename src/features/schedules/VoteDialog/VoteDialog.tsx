import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  LoadingProgress,
  Progress,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
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
  const [open, setOpen] = useState(false);
  // form hooks
  // query hooks
  const { data: schedules, isLoading } = useQuery(scheduleRepository.list, { variables: { pollId: poll.id } });
  const { mutateAsync: vote, isLoading: isVoting } = useMutation(scheduleRepository.vote);
  // calculated values
  const loading = isLoading || !schedules;
  const totalVoteCount = schedules?.reduce((acc, schedule) => acc + schedule.voters.length, 0) ?? 0;
  // effects
  // handlers

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-auto">
        {loading ? (
          <LoadingProgress />
        ) : (
          <>
            <DialogHeader title="Vote" hasCloseButton onClose={onClose} />
            <p>총 투표수 : {totalVoteCount}표</p>
            <div className="flex flex-col space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="space-y-1">
                  <label htmlFor={schedule.id.toString()}>
                    {formatDateTime({ date: schedule.scheduleOn, format: 'YYYY-MM-DD' })} (
                    {getDayOfWeek(schedule.scheduleOn)})
                  </label>
                  <div className="flex flex-row items-center space-x-2">
                    <Checkbox
                      disabled={poll.status === 'CLOSED' || (checked.size >= 3 && !checked.get(schedule.id))}
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
                    <Progress value={(schedule.voters.length / totalVoteCount) * 100} />
                    <div className="min-w-[24px]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{schedule.voters.length}표</span>
                          </TooltipTrigger>
                          <TooltipContent>{schedule.voters.join(', ')}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              {poll.status === 'OPEN' && (
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
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { VoteDialog };
