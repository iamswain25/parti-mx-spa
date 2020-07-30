import { UserStatus } from "../types";

export const postSortOptions = [
  { created_at: "desc" },
  { updated_at: "desc" },
  { last_commented_at: "desc_nulls_last" },
];
export const voteOptions = [
  { label: "7일 후 종료", value: "7days" },
  { label: "3일 후 종료", value: "3days" },
  { label: "토론 정리시 종료", value: "manual" },
];

export const suggestionOptions = [{ label: "30일 후 종료", value: "30days" }];

export const userGroupStatusList = [
  { label: "오거나이저", value: "organizer" },
  { label: "유저", value: "user" },
  { label: "참관자", value: "participant" },
  { label: "탈퇴", value: "exit" },
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
