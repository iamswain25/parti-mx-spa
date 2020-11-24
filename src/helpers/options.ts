import { Role, UserStatus } from "../types";
export const DOMAIN = "https://policy-fair-mix.web.app";
export const TITLE = "제19회 전국주민자치박람회";
export const postSortOptions = [
  { created_at: "desc" },
  { updated_at: "desc" },
  { last_commented_at: "desc_nulls_last" },
];
export const voteOptions = [
  { label: "7일 후 종료", value: "7days" },
  { label: "30일 후 종료", value: "30days" },
  { label: "토론 정리시 종료", value: "manual" },
];

export const suggestionOptions = [
  { label: "7일 후 종료", value: "7days" },
  { label: "30일 후 종료", value: "30days" },
  { label: "토론 정리시 종료", value: "manual" },
];

export const userGroupStatusList = [
  { label: "운영자", value: "organizer" },
  { label: "멤버", value: "user" },
  { label: "참가자", value: "participant" },
  { label: "탈퇴", value: "exit" },
  { label: "승인대기", value: "requested" },
];

export const boardPermissionList = [
  { label: "오거나이저", value: "organizer" },
  { label: "멤버", value: "member" },
  { label: "유저", value: "user" },
  { label: "익명", value: "anonymous" },
];

export function permissionLabelByValue(value: Role) {
  const item = boardPermissionList.find((p) => p.value === value);
  if (item) {
    return item.label;
  }
  return null;
}
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
export const CUTTING_INDEX = 5;
export const KEYWORD_INDEX = 12;
export const DEFAULT_HASHTAGS = [
  "주민자치",
  "지역_활성화",
  "학습_공동체",
  "주민조직_네트워크",
  "제도_정책",
  "서울",
  "인천",
  "경기",
  "경상",
  "전라",
  "충청",
  "제주도",
  "키워드",
];
export const PARAM_COLLECTION = "$PARAMS$";
export const COUNTER_DOC = "counters";
export const HASHTAG_SPLIT_REGEX = /[\s,;#]+/;
