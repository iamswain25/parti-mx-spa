import { UserStatus } from "../types";
export const DOMAIN = "https://parti.mx";
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
  { label: "전체공개", value: "all" },
  { label: "멤버공개", value: "member" },
  { label: "전체공개 & 오거나이저 글 작성", value: "observer" },
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
  "publicspace",
  "공공공간",
  "community",
  "커뮤니티",
  "history",
  "역사",
  "density",
  "밀도",
];
