type DateTime = `${number}-${number}-${number}T${number}:${number}:${number}`;

type CalendarDate = `${number}-${number}-${number}`;

type Paginated<T> = {
  totalCount: number;
  contents: T[];
};
