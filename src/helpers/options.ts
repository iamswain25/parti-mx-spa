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
export const KEYWORD_INDEX = 19;
export const DEFAULT_HASHTAGS = [
  "주민자치",
  "지역_활성화",
  "학습_공동체",
  "주민조직_네트워크",
  "제도_정책",
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상남도",
  "제주",
  "주민자치회",
  "마을관리소",
  "온라인활동",
  "공유활동",
  "쓰레기",
  "주민자치위원회",
  "돌봄활동",
  "안전마을",
  "청년활동",
  "도시재생연계",
  "마을미디어",
  "문화콘텐츠",
  "법인",
  "마을기금",
  "마을정원",
  "마을공간",
  "일자리",
  "마을계획단",
  "청년위원",
  "공간위탁",
  "도시재생",
  "다문화",
  "행정사무위탁",
  "환경개선",
  "민관학협력",
  "청소년활동",
  "환경보존",
  "마을기업",
  "대화모임",
  "지역갈등",
  "주민협의회",
  "인권활동",
  "주민역량교육",
  "위원연령기준",
  "주민자치회_사무국",
  "지역화폐",
  "예산편성권",
  "통합행정혁신",
  "장기발전계획",
  "제도기반조성",
  "읍면동장",
  "주민세",
  "행정사무위수탁",
  "주민자치회조례",
  "주민참여확산",
];
export const PARAM_COLLECTION = "$PARAMS$";
export const COUNTER_DOC = "counters";
export const COUNTER_VIEW_POST = "COUNTER_VIEW_POST";
export const HASHTAG_SPLIT_REGEX = /[\s,;#]+/;
export const TELEPHONE = "070-8064-3035";
export const EMAIL = "contact@juminexpo.kr";
