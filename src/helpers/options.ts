import { Role, UserStatus } from "../types";
import firebase from "firebase";
export const DOMAIN = "https://plan.sehub.net";
export const TITLE = "사회적경제 시민참여액션플랜";
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
type OrderBy = [
  fieldPath: string,
  directionStr?: firebase.firestore.OrderByDirection,
];
export const SORT_ARRAY: {
  param: OrderBy;
  label: string;
}[] = [
  { param: ["created_at", "asc"], label: "최근등록순" },
  { param: ["created_at", "desc"], label: "등록순" },
  { param: ["updated_at", "desc"], label: "최근수정순" },
  { param: ["last_commented_at", "desc"], label: "최근댓글순" },
  { param: ["count_like", "desc"], label: "최근공감순" },
];

export function permissionLabelByValue(value: Role) {
  const item = boardPermissionList.find(p => p.value === value);
  if (item) {
    return item.label;
  }
  return null;
}
export function showStatusLabelByValue(value: UserStatus) {
  const userStatus = userGroupStatusList.find(ug => ug.value === value);
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
export const COMMENT_LIMIT = 10;
export const LIKED_USER_LIMIT = 24;
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
export const TELEPHONE = "02-353-3553";
export const EMAIL = "info@sehub.net";
export const DEFAULT_LAT_LNG = {
  lat: 37.5696629,
  lng: 126.9,
};
export const AGE = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
export const SIGNUP_AREA = [
  "서울특별시",
  "경기도",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
  "세종특별자치시",
  "해외",
];
export const SEOUL_DISTRICT = [
  "종로구",
  "중구",
  "용산구",
  "성동구",
  "광진구",
  "동대문구",
  "중랑구",
  "성북구",
  "강북구",
  "도봉구",
  "노원구",
  "은평구",
  "서대문구",
  "마포구",
  "양천구",
  "강서구",
  "구로구",
  "금천구",
  "영등포구",
  "동작구",
  "관악구",
  "서초구",
  "강남구",
  "송파구",
  "강동구",
];
