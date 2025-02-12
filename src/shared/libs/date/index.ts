// NOTE: DateTime이나 Date 타입을 파라미터로 하는 데이트 라이브러리

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDateTime({ date, format }: { date: DateTime; format: string }) {
  return dayjs(date).tz('Asia/Seoul').format(format);
}

const daysOfWeek = {
  Sun: '일',
  Mon: '월',
  Tue: '화',
  Wed: '수',
  Thu: '목',
  Fri: '금',
  Sat: '토',
};
export function getDayOfWeek(date: DateTime) {
  return daysOfWeek[dayjs(date).tz('Asia/Seoul').format('ddd') as keyof typeof daysOfWeek];
}
