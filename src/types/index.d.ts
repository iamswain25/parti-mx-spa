import { Country, Region } from "react-country-region-selector";
export type FormData = {
  email: string;
  password: string;
};
export type SignupForm = {
  email: string;
  password: string;
  name: string;
  country: string;
  region: string;
  local: string;
};
export type ProfileForm = {
  name: string;
  country: string;
  region: string;
  local: string;
};
export interface ChipData {
  selected: boolean;
  label: string;
}
export interface NoticeFormdata {
  title: string;
  body: string;
}
export interface EventFormdata {
  eventDate: string;
  place: string;
  deadline: string;
  countPeople: number;
  title: string;
  body: string;
}
export interface SuggestionFormdata {
  title: string;
  context: string;
  body: string;
  closingMethod: string;
  tags: string[];
  customTags: string[];
}
export interface VoteFormdata {
  title: string;
  context: string;
  body: string;
  closingMethod: string;
  candidates: string[];
  isMultiple;
  isAnonymous;
  isResultHidden;
}
export interface VoteEditFormdata extends VoteFormdata {
  candidates: Candidate[];
}
export type BoardPermission = "member" | "all" | "observer";
export type Board = {
  id: number;
  title: string;
  order: number;
  body: string;
  slug: string;
  permission: BoardPermission;
  type: BoardTypes;
  updated_at: string;
  last_posted_at: string;
  users: UserBoard[];
  newPostCount?: number;
  posts: Post[];
  group: Group;
  posts_aggregate: {
    aggregate: {
      count: number;
    };
  };
  posts_aggregate_open: {
    aggregate: {
      count: number;
    };
  };
  posts_aggregate_closed: {
    aggregate: {
      count: number;
    };
  };
};
export type BoardTypes = "notice" | "suggestion" | "event" | "vote";
export interface LatLng {
  lat: number;
  lng: number;
}
export interface Group {
  id: number;
  title: string;
  bg_img_url: string;
  mb_img_url: string;
  created_at: string;
  boards: Board[];
  suggestion: Board[];
  notice: Board[];
  event: Board[];
  vote: Board[];
  users_aggregate: {
    aggregate: {
      count: number;
    };
  };
  users: [
    {
      status: UserStatus;
      notification_type: NotificationType;
    }
  ];
}
export interface HomeGroup {
  mx_groups_by_pk: Group;
  mx_users_by_pk: User;
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
    name: string;
    email: string;
    photo_url: string;
    push_tokens: { token: string; created_at: string };
    groups: UserGroup[];
    rest: UserGroup[];
  };
}
export interface CommentInput {
  body: string;
  post_id: number | null;
  parent_id: number | null;
}
export interface Comment {
  id: number;
  body: string;
  updated_at: string;
  user: User;
  likes: [
    {
      user: User;
    }
  ];
  likes_aggregate: {
    aggregate: {
      count: number;
    };
  };
  re?: Comment[];
  post?: VoteDetailType;
}
export type Image = {
  uri: string;
  name: string;
  type?: string;
};
export interface File {
  uri: string;
  name: string;
  size: number;
  path: string;
  uploadDate: string;
}

export type Post = {
  id: number;
  title: string;
  context: string;
  body: string;
  metadata: VoteMetadata | EventMetadata | SuggestionMetadata | NoticeMetadata;
  images: Image[];
  files: File[];
  candidates: Candidate[];
  closed_at: string;
  created_at: string;
  updated_at: string;
  location: { type: "Point"; coordinates: [number, number] };
  tags: string[];
  users_aggregate: {
    aggregate: {
      sum: {
        like_count: number;
      };
    };
  };
  users: UserPost[];
  updatedBy: User;
  createdBy: User;
  comments_aggregate: {
    aggregate: {
      count: number;
    };
  };
  comments: Comment[];
  meLiked: [UserPost];
  likedUsers: UserPost[];
  board: Board;
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
  eventDate: string;
  place: string;
  deadline: string;
  countPeople: number;
};
export interface Vote extends Post {
  metadata: VoteMetadata;
}
export interface Event extends Post {
  metadata: EventMetadata;
}

export type User = {
  id: number;
  name: string;
  photo_url: string;
  email?: string;
  checkedPosts?: [{ like_count: number }];
  votes?: UserCandidate[];
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
  created_at: string;
  notification_type: NotificationType;
  updated_at: string;
  group: Group;
  group_id: number;
  user_id: number;
}
export interface UserPost {
  user: User;
  created_at: string;
  updated_at: string;
  user_id: number;
  like_count: number;
  post: Post;
}
export interface UserBoard {
  user_id: number;
  board_id: number;
  count_click: number;
  created_at: string;
  updated_at: string;
  board: Board;
  user: User;
}

export interface Group {
  title: string;
  id: number;
  updated_at: string;
  last_posted_at: string;
  slug: string;
}

export type UserCandidate = {
  user: User;
  count: number;
  created_at: string;
  candidate: Candidate;
};

export type Candidate = {
  __typename: string;
  id: number;
  order: number;
  body: string;
  post: {
    id: number;
    metadata: VoteMetadata;
  };
  votes_aggregate: {
    aggregate: {
      sum: {
        count: number;
      };
    };
  };
  myVote: [
    {
      count: number;
      created_at?: string;
      user?: User;
    }
  ];
  votes: UserCandidate[];
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
  id: number;
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
  id: number;
  title: string;
  created_at: string;
  createdBy: {
    id: number;
    name: string;
  };
  board: {
    type: string;
    title: string;
  };
}

export interface GroupBoardNewPostCount {
  get_new_post_count: {
    board_id: number;
    new_count: number;
  }[];
}
