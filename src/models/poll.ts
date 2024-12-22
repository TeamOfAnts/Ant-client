export type PollStatus = 'OPEN' | 'CLOSED';

export class Poll {
  public id!: string;
  public title!: string;
  public description!: string;
  public options!: PollOption[];
  public startAt!: DateTime;
  public endAt!: DateTime;
  public status!: PollStatus;
}

class PollOption {
  public id!: number;
  public description!: string;
  public votes!: number;
}
