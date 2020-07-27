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
  { label: "운영자", value: "organizer" },
  { label: "청년참여단", value: "user" },
  { label: "패널", value: "participant" },
  { label: "탈퇴", value: "exit" },
];
