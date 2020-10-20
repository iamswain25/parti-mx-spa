import gql from "graphql-tag";

export const insertUser = gql`
  mutation($email: String!, $name: String!) {
    insert_mx_users(objects: { email: $email, name: $name }) {
      returning {
        id
      }
    }
  }
`;

export const updateUserName = gql`
  mutation($id: Int!, $name: String!, $photo_url: String, $metadata: jsonb) {
    update_mx_users_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, photo_url: $photo_url, metadata: $metadata }
    ) {
      id
    }
  }
`;

export const updateUserInfo = gql`
  mutation($user_id: Int!, $name: String!, $metadata: jsonb) {
    update_mx_users_by_pk(
      pk_columns: { id: $user_id }
      _set: { name: $name, metadata: $metadata }
    ) {
      id
    }
  }
`;

export const insertPost = gql`
  mutation(
    $board_id: Int!
    $group_id: Int!
    $title: String!
    $context: String
    $body: String!
    $html: jsonb
    $metadata: jsonb = {}
    $images: jsonb
    $files: jsonb
    $location: geography
    $tags: jsonb
  ) {
    insert_mx_posts_one(
      object: {
        body: $body
        html: $html
        title: $title
        context: $context
        board_id: $board_id
        metadata: $metadata
        images: $images
        files: $files
        location: $location
        tags: $tags
      }
    ) {
      id
    }
    update_mx_boards(
      _set: { last_posted_at: "now()" }
      where: { id: { _eq: $board_id } }
    ) {
      affected_rows
    }
    update_mx_groups(
      _set: { last_posted_at: "now()" }
      where: { id: { _eq: $group_id } }
    ) {
      affected_rows
    }
  }
`;

export const updatePost = gql`
  mutation(
    $id: Int!
    $title: String!
    $context: String
    $body: String!
    $html: jsonb
    $metadata: jsonb = {}
    $images: jsonb
    $files: jsonb
    $location: geography
    $tags: jsonb
  ) {
    update_mx_posts(
      where: { id: { _eq: $id } }
      _set: {
        body: $body
        html: $html
        title: $title
        context: $context
        images: $images
        files: $files
        location: $location
        tags: $tags
      }
      _append: { metadata: $metadata }
    ) {
      affected_rows
    }
  }
`;

export const deletePost = gql`
  mutation($id: Int!) {
    delete_mx_posts_by_pk(id: $id) {
      board_id
      board {
        type
      }
    }
  }
`;

export const resolvePost = gql`
  mutation($id: Int!) {
    update_mx_posts_by_pk(
      pk_columns: { id: $id }
      _set: { closed_at: "now()" }
    ) {
      id
      board_id
    }
  }
`;

export const likePost = gql`
  mutation($id: Int!) {
    insert_mx_users_post(
      objects: { post_id: $id, like_count: 1 }
      on_conflict: { constraint: users_post_pkey, update_columns: [like_count] }
    ) {
      affected_rows
    }
  }
`;

export const unlikePost = gql`
  mutation($id: Int!, $user_id: Int!) {
    update_mx_users_post(
      where: { post_id: { _eq: $id }, user_id: { _eq: $user_id } }
      _set: { like_count: 0 }
    ) {
      affected_rows
    }
  }
`;

export const insertComment = gql`
  mutation($post_id: Int!, $body: String!, $parent_id: Int) {
    insert_mx_comments(
      objects: { body: $body, post_id: $post_id, parent_id: $parent_id }
    ) {
      affected_rows
    }
    update_mx_posts_by_pk(
      pk_columns: { id: $post_id }
      _set: { last_commented_at: "now()" }
    ) {
      id
    }
  }
`;

export const updateComment = gql`
  mutation($id: Int!, $body: String) {
    update_mx_comments_by_pk(_set: { body: $body }, pk_columns: { id: $id }) {
      id
    }
  }
`;

export const deleteComment = gql`
  mutation($comment_id: Int!) {
    delete_mx_comments_by_pk(id: $comment_id) {
      parent {
        body
        id
      }
    }
  }
`;

export const likeComment = gql`
  mutation($comment_id: Int!) {
    insert_mx_comments_like(objects: { comment_id: $comment_id }) {
      affected_rows
    }
  }
`;

export const unlikeComment = gql`
  mutation($comment_id: Int!, $user_id: Int!) {
    delete_mx_comments_like(
      where: { user_id: { _eq: $user_id }, comment_id: { _eq: $comment_id } }
    ) {
      affected_rows
    }
  }
`;

export const insertUserGroup = gql`
  mutation($group_id: Int!) {
    insert_mx_users_group_one(
      object: { group_id: $group_id, status: "user" }
      on_conflict: { update_columns: [status], constraint: users_group_pkey }
    ) {
      user_id
      group_id
    }
  }
`;
export const updateGroup = gql`
  mutation(
    $group_id: Int!
    $title: String!
    $bg_img_url: String
    $mb_img_url: String
  ) {
    update_mx_groups_by_pk(
      pk_columns: { id: $group_id }
      _set: { title: $title, bg_img_url: $bg_img_url, mb_img_url: $mb_img_url }
    ) {
      id
    }
  }
`;
export const createNewGroup = gql`
  mutation($title: String!, $bg_img_url: String, $mb_img_url: String) {
    insert_mx_groups_one(
      object: {
        title: $title
        bg_img_url: $bg_img_url
        mb_img_url: $mb_img_url
        users: { data: { status: "organizer" } }
        boards: {
          data: [
            { title: "소식", body: "소식입니다", type: "notice", order: 1 }
            { title: "모임", body: "모임입니다", type: "event", order: 4 }
            { title: "제안", body: "제안입니다", type: "suggestion", order: 2 }
            { title: "투표", body: "투표입니다", type: "vote", order: 3 }
          ]
        }
      }
    ) {
      id
    }
  }
`;
export const insertBoard = gql`
  mutation($title: String!, $body: String!, $group_id: Int!, $type: String!) {
    insert_mx_boards(
      objects: { group_id: $group_id, body: $body, title: $title, type: $type }
    ) {
      returning {
        id
      }
    }
  }
`;
export const updateBoards = gql`
  mutation($boards: [mx_boards_insert_input!]!, $deletingIds: [Int!]) {
    insert_mx_boards(
      objects: $boards
      on_conflict: {
        constraint: boards_pkey
        update_columns: [body, title, permission, order, type]
      }
    ) {
      affected_rows
    }

    delete_mx_boards(where: { id: { _in: $deletingIds } }) {
      affected_rows
    }
  }
`;
export const updateUserGroupCheck = gql`
  mutation($group_id: Int!, $user_id: Int!) {
    update_mx_users_group(
      _inc: { count_click: 1 }
      where: {
        _and: [{ group_id: { _eq: $group_id } }, { user_id: { _eq: $user_id } }]
      }
    ) {
      affected_rows
    }
  }
`;
export const updateUserGroupNotification = gql`
  mutation($group_id: Int!, $user_id: Int!, $notification_type: String) {
    update_mx_users_group_by_pk(
      pk_columns: { group_id: $group_id, user_id: $user_id }
      _set: { notification_type: $notification_type }
    ) {
      notification_type
    }
  }
`;
export const incrementUserBoardCheck = gql`
  mutation($board_id: Int!, $user_id: Int!) {
    update_mx_users_board(
      _inc: { count_click: 1 }
      where: {
        _and: [{ board_id: { _eq: $board_id } }, { user_id: { _eq: $user_id } }]
      }
    ) {
      affected_rows
    }
    insert_mx_users_board(
      objects: { count_click: 1, board_id: $board_id }
      on_conflict: { update_columns: [], constraint: users_board_pkey }
    ) {
      affected_rows
    }
  }
`;

export const deleteBoard = gql`
  mutation($board_id: Int!) {
    delete_mx_boards(where: { id: { _eq: $board_id } }) {
      affected_rows
    }
  }
`;
export const setUserGroupStatus = gql`
  mutation($group_id: Int!, $user_id: Int!, $status: String! = "user") {
    update_mx_users_group_by_pk(
      pk_columns: { group_id: $group_id, user_id: $user_id }
      _set: { status: $status }
    ) {
      user_id
    }
  }
`;
export const deleteUserGroup = gql`
  mutation($group_id: Int!, $user_id: Int!) {
    delete_mx_users_group(
      where: {
        _and: [{ user_id: { _eq: $user_id } }, { group_id: { _eq: $group_id } }]
      }
    ) {
      affected_rows
    }
  }
`;

export const announcePost = gql`
  mutation($id: Int!) {
    update_mx_posts_by_pk(
      pk_columns: { id: $id }
      _append: { metadata: { announcement: true } }
    ) {
      board_id
    }
  }
`;

export const denouncePost = gql`
  mutation($id: Int!) {
    update_mx_posts_by_pk(
      pk_columns: { id: $id }
      _delete_key: { metadata: "announcement" }
    ) {
      board_id
    }
  }
`;
export const incrementUserPostCheck = gql`
  mutation($post_id: Int!, $user_id: Int!) {
    update_mx_users_post(
      _inc: { view_count: 1 }
      where: {
        _and: [{ post_id: { _eq: $post_id } }, { user_id: { _eq: $user_id } }]
      }
    ) {
      affected_rows
    }
    insert_mx_users_post(
      objects: { view_count: 1, post_id: $post_id }
      on_conflict: { update_columns: [], constraint: users_post_pkey }
    ) {
      affected_rows
    }
  }
`;
export const updateBoardPermission = gql`
  mutation($board_id: Int!, $permission: String!) {
    update_mx_boards_by_pk(
      pk_columns: { id: $board_id }
      _set: { permission: $permission }
    ) {
      id
    }
  }
`;
export const exitUsersGroup = gql`
  mutation($group_id: Int!, $user_id: Int!) {
    update_mx_users_group(
      _set: { status: "exit" }
      where: { group_id: { _eq: $group_id }, user_id: { _eq: $user_id } }
    ) {
      affected_rows
    }
  }
`;
export const fileReport = gql`
  mutation($id: Int!, $body: String!, $type: String = "post") {
    insert_mx_reports(objects: { body: $body, type: $type, type_id: $id }) {
      affected_rows
    }
  }
`;

export const insertVote = gql`
  mutation(
    $board_id: Int!
    $group_id: Int!
    $title: String!
    $context: String
    $body: String
    $html: jsonb
    $metadata: jsonb = {}
    $images: jsonb
    $files: jsonb
    $candidates: [mx_candidates_insert_input!]!
  ) {
    insert_mx_posts_one(
      object: {
        body: $body
        html: $html
        title: $title
        context: $context
        board_id: $board_id
        metadata: $metadata
        images: $images
        files: $files
        candidates: { data: $candidates }
      }
    ) {
      id
    }
    update_mx_boards(
      _set: { last_posted_at: "now()" }
      where: { id: { _eq: $board_id } }
    ) {
      affected_rows
    }
    update_mx_groups(
      _set: { last_posted_at: "now()" }
      where: { id: { _eq: $group_id } }
    ) {
      affected_rows
    }
  }
`;

export const insertUserCandidate = gql`
  mutation($candidate_id: Int!, $user_id: Int!, $post_id: Int!) {
    insert_mx_users_post_one(
      object: { like_count: 1, post_id: $post_id }
      on_conflict: { update_columns: [like_count], constraint: users_post_pkey }
    ) {
      like_count
    }
    delete_mx_users_candidates(
      where: {
        user_id: { _eq: $user_id }
        candidate: { post_id: { _eq: $post_id } }
      }
    ) {
      affected_rows
    }
    insert_mx_users_candidates_one(
      object: { candidate_id: $candidate_id }
      on_conflict: { constraint: users_candidates_pkey, update_columns: [] }
    ) {
      count
    }
  }
`;

export const insertMultipleUserCandidate = gql`
  mutation($candidate_id: Int!, $post_id: Int!) {
    insert_mx_users_post_one(
      object: { like_count: 1, post_id: $post_id }
      on_conflict: { update_columns: [like_count], constraint: users_post_pkey }
    ) {
      like_count
    }

    insert_mx_users_candidates_one(
      object: { candidate_id: $candidate_id }
      on_conflict: { constraint: users_candidates_pkey, update_columns: [] }
    ) {
      count
    }
  }
`;

export const removeUserCandidate = gql`
  mutation($candidate_id: Int!, $user_id: Int!, $post_id: Int!) {
    insert_mx_users_post_one(
      object: { like_count: 0, post_id: $post_id }
      on_conflict: { update_columns: [like_count], constraint: users_post_pkey }
    ) {
      like_count
    }
    delete_mx_users_candidates(
      where: {
        user_id: { _eq: $user_id }
        candidate: { post_id: { _eq: $post_id } }
      }
    ) {
      affected_rows
    }
  }
`;

export const removeMultipleUserCandidate = gql`
  mutation($candidate_id: Int!, $user_id: Int!) {
    delete_mx_users_candidates(
      where: {
        user_id: { _eq: $user_id }
        candidate_id: { _eq: $candidate_id }
      }
    ) {
      affected_rows
    }
  }
`;

export const updateVote = gql`
  mutation(
    $id: Int!
    $title: String!
    $body: String
    $html: jsonb
    $metadata: jsonb = {}
    $images: jsonb
    $files: jsonb
    $deletingIds: [Int!]
    $candidates: [mx_candidates_insert_input!]!
  ) {
    update_mx_posts(
      where: { id: { _eq: $id } }
      _set: {
        body: $body
        html: $html
        title: $title
        images: $images
        files: $files
      }
      _append: { metadata: $metadata }
    ) {
      affected_rows
    }
    delete_mx_candidates(where: { id: { _in: $deletingIds } }) {
      affected_rows
    }
    insert_mx_candidates(
      objects: $candidates
      on_conflict: {
        constraint: vote_candidates_pkey
        update_columns: [body, order]
      }
    ) {
      affected_rows
    }
  }
`;

export const updateNotificationToken = gql`
  mutation($user_id: Int!, $push_tokens: jsonb) {
    update_mx_users_by_pk(
      pk_columns: { id: $user_id }
      _set: { push_tokens: $push_tokens }
    ) {
      push_tokens
    }
  }
`;

export const massInsertUserGroup = gql`
  mutation($usergroups: [mx_users_group_insert_input!]!) {
    insert_mx_users_group(
      objects: usergroups
      on_conflict: { constraint: users_group_pkey, update_columns: [] }
    ) {
      affected_rows
    }
  }
`;
