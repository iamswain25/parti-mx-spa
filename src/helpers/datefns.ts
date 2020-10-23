import {
  differenceInDays,
  addDays,
  format,
  isAfter,
  formatDistanceToNow,
  addHours,
} from "date-fns";
import { ko } from "date-fns/locale";
export function calculateDays(date: firebase.firestore.Timestamp, days = 30) {
  return differenceInDays(new Date(), addDays(date.toDate(), days));
}
export function minutesDiff(date: string) {
  const time = new Date(date).getTime();
  const timeDiff = new Date().getTime() - time;
  const minDiff = timeDiff / 60 / 1000;
  return minDiff;
}
export function closingDateFrom(
  created_at?: firebase.firestore.Timestamp,
  days = 30
) {
  if (!created_at) {
    return null;
  }
  try {
    return format(addDays(created_at.toDate(), days), "yyyy.MM.dd");
  } catch (error) {
    return error.message;
  }
}
export function closingMonthDateFrom(
  created_at: firebase.firestore.Timestamp,
  days = 30
) {
  if (!created_at) {
    return null;
  }
  try {
    return format(addDays(created_at.toDate(), days), "MM/dd");
  } catch (error) {
    return error.message;
  }
}

export function formatDateFromString(date: firebase.firestore.Timestamp) {
  try {
    return format(date.toDate(), "yyyy.MM.dd HH:mm");
  } catch (error) {
    return error.message;
  }
}
export function isAfterString(
  date1: firebase.firestore.Timestamp,
  date2: firebase.firestore.Timestamp
) {
  if (date1 === null) {
    return false;
  }
  if (date2 === undefined) {
    return true;
  }
  try {
    const d1 = date1.toDate();
    const d2 = date2.toDate();
    return isAfter(d1, d2);
  } catch (error) {
    return false;
  }
}

export function semanticDate(date?: firebase.firestore.Timestamp) {
  if (!date) {
    return "로딩중...";
  }
  try {
    const newDate = date.toDate();
    const now = new Date();
    if (isAfter(now, addDays(newDate, 1))) {
      return format(newDate, "yyyy-MM-dd");
    }
    return formatDistanceToNow(newDate, { locale: ko }) + " 전";
  } catch (error) {
    return error.message;
  }
}
export function getEventDate(date: firebase.firestore.Timestamp) {
  try {
    const newDate = date.toDate();
    return format(newDate, "yyyy/MM/dd(eee) HH:mm", { locale: ko });
  } catch (error) {
    return error.message;
  }
}
export function getEventDate2(date: firebase.firestore.Timestamp) {
  try {
    const newDate = date.toDate();
    return format(newDate, "MM/dd(eee) aaa HH:mm", { locale: ko });
  } catch (error) {
    return error.message;
  }
}
export function getEventDate3(date: firebase.firestore.Timestamp) {
  try {
    const newDate = date.toDate();
    return format(newDate, "MM/dd(eee)", { locale: ko });
  } catch (error) {
    return error.message;
  }
}
export function getUnix(date: Date) {
  return Math.round(date.getTime() / 1000);
}
export function getIosDateRef(date: Date) {
  return getUnix(date) - getUnix(new Date("2001-01-01"));
}
const GOOGLE_CALENDAR_FORMAT = "yyyyMMdd'T'HHmmss";
const DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm";
export function getGoogleCalendarDate(date: firebase.firestore.Timestamp) {
  if (!date) {
    return "로딩중...";
  }
  const eventStart = date.toDate();
  const eventEnd = addHours(eventStart, 3);
  return (
    format(eventStart, GOOGLE_CALENDAR_FORMAT) +
    "/" +
    format(eventEnd, GOOGLE_CALENDAR_FORMAT)
  );
}
export function getDatetimeFormat(date: Date, days = 7) {
  const after = addDays(date, days);
  return format(after, DATETIME_FORMAT);
}
export function daysLeftMeta(
  metadata: any,
  created_at: firebase.firestore.Timestamp
) {
  try {
    if (metadata?.closingMethod === "manual") {
      return "토론 정리 시 종료";
    }
    const after = Number(metadata?.closingMethod?.replace("days", ""));
    return Math.abs(calculateDays(created_at, after)) + "일 남음";
  } catch (err) {
    return "버그";
  }
}
