// NOTE: DateTime이나 Date 타입을 파라미터로 하는 데이트 라이브러리

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDateTime({ date, format }: { date: DateTime; format: string }) {
  return dayjs(date).tz('Asia/Seoul').format(format);
}
