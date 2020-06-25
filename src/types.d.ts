export type FormData = {
  email: string;
  password: string;
};
export type Board = {
  id: number;
  title: string;
  body: string;
  permission: "member" | "all";
  type: BoardTypes;
  updated_at: string;
  last_posted_at: string;
  users: Array<{ updated_at: string }>;
  newPostCount?: number;
};
export type BoardTypes = "notice" | "suggestion" | "event" | "vote";

export interface BoardList {
  mx_boards_by_pk: {
    id: string;
    body: string;
    title: string;
    slug: string;
    posts_aggregate: {
      aggregate: {
        count: number;
      };
    };
    posts: PostType[];
  };
}
export interface HomeGroup {
  mx_groups_by_pk: {
    id: string;
    title: string;
    bg_img_url: string;
    boards: Board[];
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
  };
}
export interface Whoami {
  mx_users_by_pk: {
    name: string;
    email: string;
    photo_url: string;
    push_tokens: { token: string; created_at: string };
  };
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

export type PostType = {
  id: number;
  title: string;
  body: string;
  metadata: { closedAt: string; closingMethod: string };
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
};
export type SuggestionType = PostType;
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
export interface VoteType extends PostType {
  metadata: VoteMetadata;
}
export interface EventType extends PostType {
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
  user_id: number;
  like_count: number;
  post: PostType;
}

export interface Group {
  title: string;
  id: number;
  updated_at: string;
  last_posted_at: string;
  slug: string;
}

export type PostDetailType = {
  id: number;
  title: string;
  body: string;
  metadata: any;
  images: any;
  files: any;
  updatedBy: User;
  createdBy: User;
  created_at: string;
  updated_at: string;
  comments: Comment[];
  meLiked: {
    like_count: number;
  }[];
  board: {
    title: string;
    type: string;
  };
};
export interface SuggestionDetailType extends PostDetailType {
  likedUsers: {
    created_at: string;
    user: User;
  }[];
  context: string;
}
export interface EventDetailType extends PostDetailType {
  likedUsers: {
    created_at: string;
    user: User;
  }[];
  metadata: EventMetadata;
}
export interface NoticeDetailType extends PostDetailType {
  users_aggregate: {
    aggregate: {
      sum: {
        like_count: number;
      };
    };
  };
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
export interface VoteDetailType extends PostDetailType {
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
