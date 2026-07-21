import {
  differenceInSeconds,
  formatDistanceStrict,
  isSameDay,
  parseISO,
  subDays,
} from "date-fns";

export function formatRelativeTime(
  isoDate: string,
  now: Date = new Date(),
): string {
  const date = parseISO(isoDate);

  if (differenceInSeconds(now, date) < 60) {
    return "just now";
  }

  if (isSameDay(date, subDays(now, 1))) {
    return "Yesterday";
  }

  return formatDistanceStrict(date, now, { addSuffix: true });
}
