import {
  differenceInDays,
  addDays,
  format,
  isAfter,
  formatDistanceToNow,
  addHours,
} from "date-fns";
import { enUS } from "date-fns/locale";
export function calculateDays(date: string, days = 30) {
  // const time = (_ => _.setDate(_.getDate() + 30))(new Date(date));
  // const timeDiff = new Date().getTime() - time;
  // const daysDiff = timeDiff / 1000 / 60 / 60 / 24;
  // const daysDiffCeil = Math.ceil(daysDiff);
  // return daysDiffCeil;
  return differenceInDays(new Date(), addDays(new Date(date), days));
}
export function minutesDiff(date: string) {
  const time = new Date(date).getTime();
  const timeDiff = new Date().getTime() - time;
  const minDiff = timeDiff / 60 / 1000;
  return minDiff;
}
export function closingDateFrom(created_at?: string, days = 30) {
  if (!created_at) {
    return null;
  }
  try {
    return format(addDays(new Date(created_at), days), "yyyy.MM.dd");
  } catch (error) {
    return error.message;
  }
}
export function closingMonthDateFrom(created_at: string, days = 30) {
  if (!created_at) {
    return null;
  }
  try {
    return format(addDays(new Date(created_at), days), "MM/dd");
  } catch (error) {
    return error.message;
  }
}

export function formatDateFromString(date: string) {
  try {
    return format(new Date(date), "yyyy.MM.dd HH:mm");
  } catch (error) {
    return error.message;
  }
}
export function isAfterString(date1: string, date2: string) {
  if (date1 === null) {
    return false;
  }
  if (date2 === undefined) {
    return true;
  }
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return isAfter(d1, d2);
  } catch (error) {
    return false;
  }
}

export function semanticDate(date = "") {
  try {
    const newDate = new Date(date);
    const now = new Date();
    if (isAfter(now, addDays(newDate, 1))) {
      return format(newDate, "yyyy-MM-dd");
    }
    return formatDistanceToNow(newDate, { locale: enUS }) + " ago";
  } catch (error) {
    return error.message;
  }
}
export function getEventDate(date: string) {
  try {
    const newDate = new Date(date);
    return format(newDate, "yyyy/MM/dd(eee) HH:mm", { locale: enUS });
  } catch (error) {
    return error.message;
  }
}
export function getEventDate2(date: string) {
  try {
    const newDate = new Date(date);
    return format(newDate, "MM/dd(eee) aaa HH:mm", { locale: enUS });
  } catch (error) {
    return error.message;
  }
}
export function getEventDate3(date: string) {
  try {
    const newDate = new Date(date);
    return format(newDate, "MM/dd(eee)", { locale: enUS });
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
export function getGoogleCalendarDate(date: string = "") {
  const eventStart = new Date(date);
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
export function daysLeftMeta(metadata: any, created_at: string) {
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
