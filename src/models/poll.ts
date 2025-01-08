export type PollStatus = 'OPEN' | 'CLOSED';

export class Poll {
  public id!: number;
  public title!: string;
  public description!: string;
  public startAt!: DateTime;
  public endAt!: DateTime;
  public status!: PollStatus;
  public votedSchedules!: number[];
}
