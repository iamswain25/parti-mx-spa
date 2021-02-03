import { Role, UserStatus } from "../types";
import firebase from "firebase";
export const DOMAIN = "https://green-newdeal.web.app";
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
  { param: ["created_at", "desc"], label: "최근등록순" },
  { param: ["created_at", "asc"], label: "등록순" },
  { param: ["updated_at", "desc"], label: "최근수정순" },
  { param: ["last_commented_at", "desc"], label: "최근댓글순" },
  { param: ["count_like", "desc"], label: "공감순" },
  { param: ["count_comment", "desc"], label: "댓글순" },
];

export const BOARD_TYPE_LABEL = {
  notice: "소식",
  suggestion: "제안",
  event: "모임",
  vote: "투표",
};

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
  "정의로운전환",
  "사회적경제",
  "순환경제",
  "기후운동",
  "탈성장",
  "코로나19",
  "지역분권",
  "에너지전환",
  "전환의방법론",
  "주거권",
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
export const INCHEON_DISTRICT = [
  "중구",
  "동구",
  "미추홀구",
  "연수구",
  "남동구",
  "부평구",
  "계양구",
  "서구",
  "강화군",
  "옹진군",
];
export const BUSAN_DISTRICT = [
  "중구",
  "서구",
  "동구",
  "영도구",
  "부산진구",
  "동래구",
  "남구",
  "북구",
  "강서구",
  "해운대구",
  "사하구",
  "금정구",
  "연제구",
  "수영구",
  "사상구",
  "기장군",
];
export const GWANGJU_DISTRICT = ["동구", "서구", "남구", "북구", "광산구"];
export const GANGWON_DISTRICT = [
  "춘천시",
  "원주시",
  "강릉시",
  "동해시",
  "태백시",
  "속초시",
  "삼척시",
  "홍천군",
  "횡성군",
  "영월군",
  "평창군",
  "정선군",
  "철원군",
  "화천군",
  "양구군",
  "인제군",
  "고성군",
  "양양군",
];
export const GYEONGGI_DISTRICT = [
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
export const DAEGU_DISTRICT = [
  "중구",
  "동구",
  "서구",
  "남구",
  "북구",
  "수성구",
  "달서구",
  "달성군",
];
export const DAEJEON_DISTRICT = ["동구", "중구", "서구", "유성구", "대덕구"];
export const ULSAN_DISTRICT = ["중구", "남구", "동구", "북구", "울주군"];
export const JEJU_DISTRICT = ["서귀포시", "제주시"];
export const SOUTH_JEOLLA_DISTRICT = [
  "강진군",
  "고흥군",
  "곡성군",
  "광양시",
  "구례군",
  "나주시",
  "담양군",
  "목포시",
  "무안군",
  "보성군",
  "순천시",
  "신안군",
  "여수시",
  "영광군",
  "영암군",
  "완도군",
  "장성군",
  "장흥군",
  "진도군",
  "함평군",
  "해남군",
  "화순군",
];
export const NORTH_JEOLLA_DISTRICT = [
  "고창군",
  "군산시",
  "김제시",
  "남원시",
  "무주군",
  "부안군",
  "순창군",
  "완주군",
  "익산시",
  "임실군",
  "장수군",
  "전주시",
  "정읍시",
  "진안군",
];
export const SOUTH_CHUNGCHEONG_DISTRICT = [
  "계룡시",
  "공주시",
  "금산군",
  "논산시",
  "당진시",
  "보령시",
  "부여군",
  "서산시",
  "서천군",
  "아산시",
  "예산군",
  "천안시",
  "청양군",
  "태안군",
  "홍성군",
];
export const NORTH_CHUNGCHEONG_DISTRICT = [
  "괴산군",
  "단양군",
  "보은군",
  "영동군",
  "옥천군",
  "음성군",
  "제천시",
  "증평군",
  "진천군",
  "청주시",
  "충주시",
];
export const SOUTH_GYEONGSANG_DISTRICT = [
  "거제시",
  "거창군",
  "고성군",
  "김해시",
  "남해군",
  "밀양시",
  "사천시",
  "산청군",
  "양산시",
  "의령군",
  "진주시",
  "창녕군",
  "창원시",
  "통영시",
  "하동군",
  "함안군",
  "함양군",
  "합천군",
];
export const NORTH_GYEONGSANG_DISTRICT = [
  "경산시",
  "경주시",
  "고령군",
  "구미시",
  "군위군",
  "김천시",
  "문경시",
  "봉화군",
  "상주시",
  "성주군",
  "안동시",
  "영덕군",
  "영양군",
  "영주시",
  "영천시",
  "예천군",
  "울릉군",
  "울진군",
  "의성군",
  "청도군",
  "청송군",
  "칠곡군",
  "포항시",
];

export const areaDistrictList = [
  { label: "서울특별시", value: SEOUL_DISTRICT },
  { label: "경기도", value: GYEONGGI_DISTRICT },
  { label: "부산광역시", value: BUSAN_DISTRICT },
  { label: "대구광역시", value: DAEGU_DISTRICT },
  { label: "인천광역시", value: INCHEON_DISTRICT },
  { label: "광주광역시", value: GWANGJU_DISTRICT },
  { label: "대전광역시", value: DAEJEON_DISTRICT },
  { label: "울산광역시", value: ULSAN_DISTRICT },
  { label: "강원도", value: GANGWON_DISTRICT },
  { label: "충청북도", value: NORTH_CHUNGCHEONG_DISTRICT },
  { label: "충청남도", value: SOUTH_CHUNGCHEONG_DISTRICT },
  { label: "전라북도", value: NORTH_JEOLLA_DISTRICT },
  { label: "전라남도", value: SOUTH_JEOLLA_DISTRICT },
  { label: "경상북도", value: NORTH_GYEONGSANG_DISTRICT },
  { label: "경상남도", value: SOUTH_GYEONGSANG_DISTRICT },
  { label: "제주특별자치도", value: JEJU_DISTRICT },
];
