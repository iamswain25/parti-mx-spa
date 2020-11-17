import { RawDraftContentState } from "react-draft-wysiwyg";
export type FormData = {
  email: string;
  password: string;
};
export interface ChipData {
  selected: boolean;
  label: string;
}
export interface NoticeFormdata {
  title: string;
  body: string;
  isHtml: boolean;
  html: RawDraftContentState;
  tags: string[];
}
export interface EventFormdata {
  event_date: string;
  place: string;
  deadline: string;
  countPeople: number;
  title: string;
  body: string;
  isHtml: boolean;
  html: RawDraftContentState;
  tags: string[];
}
export interface SuggestionFormdata {
  title: string;
  context: string;
  body: string;
  name: string;
  tags: string[];
}
export interface VoteFormdata {
  title: string;
  context: string;
  body: string;
  closingMethod: string;
  candidates: string[];
  isMultiple: boolean;
  isAnonymous: boolean;
  isResultHidden: boolean;
  isHtml: boolean;
  html: RawDraftContentState;
  tags: string[];
}
export interface VoteEditFormdata extends VoteFormdata {
  candidates: Candidate[];
}
export type Role = "organizer" | "member" | "user" | "anonymous";
export type BoardPermission = {
  create: Role[];
  read: Role[];
  update: Role[];
  delete: Role[];
  comment: Role[];
  like: Role[];
};
export type Board = {
  id: string;
  title: string;
  order: number;
  count_open: number;
  count_closed: number;
  body: string;
  slug: string;
  permission: BoardPermission;
  type: BoardTypes;
  updated_at: firebase.firestore.Timestamp;
  last_posted_at: string;
  group_id: string;
};
export type BoardTypes = "notice" | "suggestion" | "event" | "vote";
export interface LatLng {
  lat: number;
  lng: number;
}
export interface Img {
  path: string;
  uri: string;
  name: string;
  lastModified: string;
  type: string;
  size: string;
}
export interface Group {
  id: string;
  title: string;
  bg_img: Img;
  mb_img: Img;
  created_at: firebase.firestore.Timestamp;
  created_by: string;
  boards: Board[];
  suggestion: Board[];
  notice: Board[];
  event: Board[];
  vote: Board[];
  status: UserStatus;
  user_count: number;
}
export interface HomeGroup {
  mx_groups_by_pk: Group;
}
export interface PageBoard {
  mx_boards_by_pk: Board;
}
export interface PagePost {
  mx_posts_by_pk: Post;
}
export interface Whoami {
  mx_groups: Group[];
  mx_users_by_pk: {
    id: string;
    name: string;
    email: string;
    photo_url: string;
    push_tokens: { token: string; created_at: firebase.firestore.Timestamp };
    groups: UserGroup[];
    rest: UserGroup[];
  };
}
export interface CommentInput {
  body: string;
  post_id: string | null;
  parent_id: string | null;
}
export interface Comment {
  id: string;
  created_by: string;
  body: string;
  updated_at: firebase.firestore.Timestamp;
  name: string;
  post_id: string;
  parent_id: string;
  count_like: number;
  count_comment: number;
  attitude: string;
}
export interface File {
  name: string;
  size: number;
  path: string;
}

export type Post = {
  id: string;
  title: string;
  board_id: string;
  group_id: string;
  type: string;
  context: string;
  name: string;
  body: string;
  created_by: string;
  count_like: number;
  count_comment: number;
  count_view: number;
  html: RawDraftContentState;
  metadata: VoteMetadata | EventMetadata | SuggestionMetadata | NoticeMetadata;
  images: Img[];
  files: File[];
  closed_at: firebase.firestore.Timestamp;
  is_closed: boolean;
  is_announced: boolean;
  created_at: firebase.firestore.Timestamp;
  updated_at: firebase.firestore.Timestamp;
  announced_at: firebase.firestore.Timestamp;
  denounced_at: firebase.firestore.Timestamp;
  location: { type: "Point"; coordinates: [number, number] };
  tags: string[];
  updatedBy: User;
  createdBy: User;
  my_like_count: number | null;
};
export interface Suggestion {
  mx_posts_by_pk: Post;
}
export type NoticeMetadata = { announcement: boolean };
export type SuggestionMetadata = { closingMethod: string; address?: string };
export type VoteMetadata = {
  closingMethod: string;
  isBinary: boolean;
  isMultiple: boolean;
  isAnonymous: boolean;
  isResultHidden: boolean;
};
export type EventMetadata = {
  event_date: firebase.firestore.Timestamp;
  place: string;
  deadline: firebase.firestore.Timestamp;
  countPeople: number;
};
export type Vote = Partial<User>;
export interface Event extends Post {
  metadata: EventMetadata;
}

export type User = {
  created_at: firebase.firestore.Timestamp;
  id: string;
  name: string;
  photo_url: string;
  email: string;
  role: Role;
};
export type UserStatus =
  | "requested"
  | "organizer"
  | "user"
  | "exit"
  | "participant"
  | undefined;
export type NotificationType = "all" | "mine" | "related" | null;

export interface UserGroup {
  user: User;
  status: UserStatus;
  created_at: firebase.firestore.Timestamp;
  notification_type: NotificationType;
  updated_at: firebase.firestore.Timestamp;
  group: Group;
  group_id: string;
  userId: number;
}
export interface PostLike {
  id: string;
  name: string;
  photo_url: string;
  created_at: firebase.firestore.Timestamp;
}
export interface UserBoard {
  userId: number;
  board_id: string;
  count_click: number;
  created_at: firebase.firestore.Timestamp;
  updated_at: firebase.firestore.Timestamp;
  board: Board;
  user: User;
}

export interface Group {
  title: string;
  id: string;
  updated_at: firebase.firestore.Timestamp;
  last_posted_at: string;
  slug: string;
}

export type UserCandidate = {
  user: User;
  count: number;
  created_at: firebase.firestore.Timestamp;
  candidate: Candidate;
};

export type Candidate = {
  id: string;
  post_id: string;
  order: number;
  body: string;
};
export interface VoteDetailType extends Post {
  users_aggregate: {
    aggregate: {
      sum: {
        like_count: number;
      };
    };
  };
  candidates: Candidate[];
  metadata: VoteMetadata;
}

export type RecommentArgs = {
  id: string;
  user: Comment["user"];
  reUser?: Comment["user"];
};

export interface File {
  name: string;
  size: number;
  uri: string;
  lastModified?: number;
}

export interface SearchResultType {
  id: string;
  title: string;
  created_at: firebase.firestore.Timestamp;
  createdBy: {
    id: string;
    name: string;
  };
  board: {
    type: string;
    title: string;
  };
}

export interface GroupBoardNewPostCount {
  get_new_post_count: {
    board_id: string;
    new_count: number;
  }[];
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toDeny(): R;
      toAllow(): R;
    }
  }
}
