export type PollStatus = 'active' | 'closed';

export class Poll {
  public id!: string;
  public status!: PollStatus;
  public title!: string;
  public description!: string;
  public options!: PollOption[];
}

class PollOption {
  public id!: number;
  public description!: string;
  public votes!: number;
}
