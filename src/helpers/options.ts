import { UserStatus } from "../types";
export const DOMAIN = "https://mix.beyondcovid19-opencall.org";
export const postSortOptions = [
  {
    sort: { last_commented_at: "desc_nulls_last" },
    label: "Most recent Comment",
  },
  { sort: { updated_at: "desc" }, label: "Most recent Updated" },
  { sort: { created_at: "desc" }, label: "Most recent registered" },
];
export const voteOptions = [
  { label: "7일 후 종료", value: "7days" },
  { label: "30일 후 종료", value: "3days" },
  { label: "토론 정리시 종료", value: "manual" },
];

export const suggestionOptions = [
  { label: "7일 후 종료", value: "7days" },
  { label: "30일 후 종료", value: "30days" },
];

export const userGroupStatusList = [
  { label: "운영자", value: "organizer" },
  { label: "청년참여단", value: "user" },
  { label: "패널", value: "participant" },
  { label: "탈퇴", value: "exit" },
  { label: "승인대기", value: "requested" },
];

export function showStatusLabelByValue(value: UserStatus) {
  const userStatus = userGroupStatusList.find((ug) => ug.value === value);
  if (userStatus) {
    return userStatus.label;
  }
  switch (value) {
    case "requested":
      return "승인대기";
    default:
      return null;
  }
}

export const defaultHashtags = [
  "global",
  "local",
  "border",
  "neighborhood",
  "outdoor",
  "interior",
  "landscape",
  "privacy",
  "public_space",
  "density",
  "public_health",
  "disaster_management",
  "mobility",
  "resilience",
  "lockdown",
  "tourism",
  "remote_work",
  "social_distance",
  "network",
  "online",
  "community",
  "history",
  "climate_change",
  "renewable_energy",
  "smartcity",
  "commons",
];
