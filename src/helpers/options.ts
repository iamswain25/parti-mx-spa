import { Role, UserStatus } from "../types";
export const DOMAIN = "https://https://eve.ggmaeul.or.kr/";
export const TITLE = "2020 경기도마을공동체지원센터 어울림축제";
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
];
export const PARAM_COLLECTION = "$PARAMS$";
export const COUNTER_DOC = "counters";
export const COUNTER_VIEW_POST = "COUNTER_VIEW_POST";
export const HASHTAG_SPLIT_REGEX = /[\s,;#]+/;
export const TELEPHONE = "070-8064-3035";
export const EMAIL = "contact@juminexpo.kr";
export const DEFAULT_LAT_LNG = {
  lat: 37.5696629,
  lng: 126.9,
};
export const SIGNUP_AREA = [
  "경기도",
  "서울특별시",
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
export const SIGNUP_CITIES = [
  "가평군",
  "고양시",
  "과천시",
  "광명시",
  "광주시",
  "구리시",
  "군포시",
  "김포시",
  "남양주시",
  "동두천시",
  "부천시",
  "성남시",
  "수원시",
  "시흥시",
  "안산시",
  "안성시",
  "안양시",
  "양주시",
  "양평군",
  "여주시",
  "연천군",
  "오산시",
  "용인시",
  "의왕시",
  "의정부시",
  "이천시",
  "파주시",
  "평택시",
  "포천시",
  "하남시",
  "화성시",
];
export const KAKAO_JS_KEY = "37babb2123d29f37a5e065c1f322b565";
