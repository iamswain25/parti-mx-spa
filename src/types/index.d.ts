export type FormData = {
  email: string;
  password: string;
};
export type Board = {
  id: number;
  title: string;
  body: string;
  slug: string;
  permission: "member" | "all";
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

export interface Group {
  id: string;
  title: string;
  bg_img_url: string;
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
}
export interface PageBoard {
  mx_boards_by_pk: Board;
}
export interface PagePost {
  mx_posts_by_pk: Post;
}
export interface Whoami {
  mx_users_by_pk: {
    name: string;
    email: string;
    photo_url: string;
    push_tokens: { token: string; created_at: string };
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
  type?: "web";
};
export type File = {
  uri: string;
  name: string;
  size: number;
};
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
  board: Board;
};
export interface SuggestionPost {
  mx_posts_by_pk: Post;
}
type NoticeMetadata = { announcement: boolean };
type SuggestionMetadata = { closedAt: string; closingMethod: string };
type VoteMetadata = {
  closedAt?: string;
  closingMethod: string;
  isBinary: boolean;
  isMultiple: boolean;
  isAnonymous: boolean;
  isResultHidden: boolean;
};
type EventMetadata = {
  eventDate: string;
  place: string;
  deadline: string;
  countPeople: number;
};
export interface VoteType extends Post {
  metadata: VoteMetadata;
}
export interface EventType extends Post {
  metadata: EventMetadata;
}

export type User = {
  id: number;
  name: string;
  photo_url: string;
  email?: string;
  checkedPosts?: [{ like_count: number }];
  votes?: Vote[];
};
export type UserStatus = "requested" | "organizer" | "user" | undefined;
export type NotificationType = "all" | "mine" | "related" | null;

export interface UserGroup {
  user: User;
  status: UserStatus;
  created_at: string;
  notification_type: NotificationType;
  updated_at: string;
  group?: Group;
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

export type Vote = {
  user: User;
  count: number;
  created_at: string;
  candidate: Candidate;
};

export type Candidate = {
  id: number;
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
  votes: Vote[];
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
  file?: File;
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
