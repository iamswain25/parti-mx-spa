import gql from "graphql-tag";
import { boards, posts, candidates, groups, usersgroup } from "./fragment";

export const queryGroupEdit = gql`
  query($group_id: Int!) {
    mx_groups_by_pk(id: $group_id) {
      id
      title
      bg_img_url
      mb_img_url
      status
    }
  }
`;

export const queryByGroupId = gql`
  query($group_id: Int!) {
    mx_groups_by_pk(id: $group_id) {
      ...groups
      notice: boards(
        where: { type: { _eq: "notice" } }
        order_by: { order: asc_nulls_last }
      ) {
        ...boards
      }
      suggestion: boards(
        where: { type: { _eq: "suggestion" } }
        order_by: { order: asc_nulls_last }
      ) {
        ...boards
      }
      vote: boards(
        where: { type: { _eq: "vote" } }
        order_by: { order: asc_nulls_last }
      ) {
        ...boards
      }
      event: boards(
        where: { type: { _eq: "event" } }
        order_by: { order: asc_nulls_last }
      ) {
        ...boards
      }
    }
  }
  ${boards}
  ${groups}
`;

export const queryBoardsByGroupId = gql`
  query($group_id: Int!, $user_id: Int) {
    mx_groups_by_pk(id: $group_id) {
      users(where: { user_id: { _eq: $user_id } }) {
        status
      }
      boards(order_by: { order: asc_nulls_last }) {
        id
        type
        order
        title
        body
        permission
        posts_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const queryBoardsOnly = gql`
  query($group_id: Int!, $user_id: Int) {
    mx_groups_by_pk(id: $group_id) {
      boards(order_by: { order: asc_nulls_last }) {
        id
        type
        order
        title
        body
        permission
        posts_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const queryByBoardId = gql`
  query(
    $board_id: Int!
    $user_id: Int
    $isAnonymous: Boolean!
    $sort: [mx_posts_order_by!] # $tags: [String!]
  ) {
    mx_boards_by_pk(id: $board_id) {
      id
      title
      type
      permission
      group {
        ...groups
      }
      posts_aggregate {
        aggregate {
          count
        }
      }
      posts_aggregate_open: posts_aggregate(
        where: { closed_at: { _is_null: true } }
      ) {
        aggregate {
          count
        }
      }
      posts_aggregate_closed: posts_aggregate(
        where: { closed_at: { _is_null: false } }
      ) {
        aggregate {
          count
        }
      }
      posts(
        order_by: $sort # , where: { tags: { _has_keys_any: $tags } }
      ) {
        ...posts
        candidates {
          ...candidates
        }
      }
    }
  }
  ${posts}
  ${candidates}
  ${groups}
`;

export const queryBoardType = gql`
  query($board_id: Int!, $user_id: Int) {
    mx_boards_by_pk(id: $board_id) {
      id
      title
      type
      permission
      group {
        id
        title
        users(where: { user_id: { _eq: $user_id } }) {
          status
        }
      }
    }
  }
`;

export const queryByPostId = gql`
  query($post_id: Int!) {
    mx_posts_by_pk(id: $post_id) {
      id
      title
      body
      html
      context
      metadata
      location
      images
      files
      created_at
      updated_at
      tags
      board {
        id
        title
        type
        group {
          id
          title
        }
      }
      candidates {
        ...candidates
      }
      users_aggregate {
        aggregate {
          sum {
            like_count
          }
        }
      }
    }
  }
  ${candidates}
`;

export const searchDuplicateNameWithoutMine = gql`
  query($name: String!, $id: Int!) {
    mx_users(
      where: { _and: [{ id: { _neq: $id } }, { name: { _ilike: $name } }] }
    ) {
      id
      email
    }
  }
`;
export const searchDuplicateName = gql`
  query($name: String!) {
    mx_users(where: { _and: [{ name: { _ilike: $name } }] }) {
      name
    }
  }
`;

export const getSuggestion = gql`
  query($id: Int!) {
    mx_posts_by_pk(id: $id) {
      id
      title
      body
      context
      metadata
      updatedBy {
        name
      }
      createdBy {
        name
      }
      created_at
      updated_at
      users_aggregate {
        aggregate {
          sum {
            like_count
          }
        }
        nodes {
          user {
            name
          }
        }
      }
    }
  }
`;

export const getBoardsByGroupId = gql`
  query($group_id: Int!, $user_id: Int!) {
    mx_groups_by_pk(id: $group_id) {
      id
      title
      boards(order_by: { order: asc_nulls_last }) {
        id
        title
        order
        body
        permission
      }
      users_aggregate {
        aggregate {
          count
        }
      }
      users(where: { user_id: { _eq: $user_id } }) {
        status
      }
    }
  }
`;

export const searchGroups = gql`
  query($searchKeyword: String!) {
    mx_groups(
      where: { title: { _ilike: $searchKeyword }, private: { _eq: false } }
    ) {
      title
      id
    }
  }
`;

export const getMemberCount = gql`
  query($group_id: Int!) {
    users: mx_users_group_aggregate(
      where: {
        _and: [{ group_id: { _eq: $group_id } }, { status: { _eq: "user" } }]
      }
    ) {
      aggregate {
        count
      }
    }
    organizers: mx_users_group_aggregate(
      where: {
        _and: [
          { group_id: { _eq: $group_id } }
          { status: { _eq: "organizer" } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const searchMembers = gql`
  query($keyword: String!, $group_id: Int!, $limit: Int!, $offset: Int!) {
    mx_users_group(
      where: {
        group_id: { _eq: $group_id }
        # status: { _in: ["organizer", "user", "participant", "requested"] }
        user: {
          _or: [{ name: { _ilike: $keyword } }, { email: { _ilike: $keyword } }]
        }
      }
      limit: $limit
      offset: $offset
      order_by: { created_at: asc_nulls_last }
    ) {
      user {
        id
        name
        email
        photo_url
      }
      group_id
      user_id
      status
      created_at
    }
  }
`;

export const searchOrganizer = gql`
  query($searchKeyword: String!, $group_id: Int!) {
    mx_users_group(
      where: {
        group_id: { _eq: $group_id }
        status: { _eq: "organzier" }
        user: { name: { _ilike: $searchKeyword } }
      }
    ) {
      user {
        name
        email
      }
      status
    }
  }
`;

export const searchPosts = gql`
  query(
    $searchKeyword: String!
    $group_id: Int!
    $user_id: Int!
    $tags: [String!]
  ) {
    mx_posts(
      where: {
        _and: [
          {
            _or: [
              { title: { _ilike: $searchKeyword } }
              { body: { _ilike: $searchKeyword } }
              { context: { _ilike: $searchKeyword } }
              { tags: { _has_keys_any: $tags } }
            ]
          }
          {
            board: {
              _and: [
                { group: { id: { _eq: $group_id } } }
                {
                  _or: [
                    { permission: { _in: ["all"] } }
                    {
                      permission: { _in: ["member", "observer"] }
                      group: {
                        users: {
                          user_id: { _eq: $user_id }
                          status: { _in: ["organizer", "user"] }
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ) {
      id
      title
      body
      created_at
      board {
        title
        type
      }
      users_aggregate {
        aggregate {
          sum {
            like_count
          }
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      createdBy {
        id
        name
      }
    }
  }
`;

export const queryNewPostCount = gql`
  query($group_id: Int!, $user_id: Int!) {
    get_new_post_count(args: { groupid: $group_id, userid: $user_id }) {
      board_id
      new_count
    }
  }
`;

export const queryUserIdsByEmail = gql`
  query($emails: [String!]) {
    mx_users(where: { email: { _in: $emails } }) {
      id
    }
  }
`;
export const whoami = gql`
  query($id: Int!) {
    mx_users_by_pk(id: $id) {
      id
      name
      email
      photo_url
    }
  }
`;

export const queryGroupsByUserId = gql`
  query($user_id: Int!) {
    mx_users_by_pk(id: $user_id) {
      id
      name
      photo_url
      email
      groups(
        where: { status: { _in: ["user", "organizer", "participant"] } }
        order_by: { updated_at: desc_nulls_last }
      ) {
        ...usersgroup
      }
    }
    mx_groups(where: { private: { _eq: false } }) {
      slug
      title
      id
      bg_img_url
      updated_at
      last_posted_at
    }
  }
  ${usersgroup}
`;

export const getGroupByPostId = gql`
  query($post_id: Int!) {
    group: mx_get_group_by_post_id(args: { post_id: $post_id }) {
      id
      status
    }
  }
`;
