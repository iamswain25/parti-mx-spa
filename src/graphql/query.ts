import gql from "graphql-tag";
import { boards, posts, candidates, groups } from "./fragment";

export const queryGroupEdit = gql`
  query($group_id: Int!, $user_id: Int, $isAnonymous: Boolean!) {
    mx_groups_by_pk(id: $group_id) {
      id
      title
      bg_img_url
      mb_img_url
      users(where: { user_id: { _eq: $user_id } }) @skip(if: $isAnonymous) {
        status
      }
    }
  }
`;

export const queryByGroupId = gql`
  query($group_id: Int!, $user_id: Int, $isAnonymous: Boolean!) {
    mx_groups_by_pk(id: $group_id) {
      ...groups
      notice: boards(where: { type: { _eq: "notice" } }) {
        ...boards
      }
      suggestion: boards(where: { type: { _eq: "suggestion" } }) {
        ...boards
      }
      vote: boards(where: { type: { _eq: "vote" } }) {
        ...boards
      }
      event: boards(where: { type: { _eq: "event" } }) {
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
      boards {
        id
        type
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
    $sort: [mx_posts_order_by!]
  ) {
    mx_boards_by_pk(id: $board_id) {
      id
      title
      type
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
      posts(order_by: $sort) {
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
  query($board_id: Int!) {
    mx_boards_by_pk(id: $board_id) {
      id
      title
      type
    }
  }
`;

export const queryByPostId = gql`
  query($post_id: Int!, $user_id: Int, $isAnonymous: Boolean!) {
    mx_posts_by_pk(id: $post_id) {
      id
      title
      body
      context
      metadata
      location
      images
      files
      created_at
      updated_at
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
      boards {
        id
        title
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
  query($keyword: String!, $group_id: Int!) {
    mx_users_group(
      where: {
        group_id: { _eq: $group_id }
        status: { _in: ["organizer", "user", "participant"] }
        user: { name: { _ilike: $keyword } }
      }
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
  query($searchKeyword: String!, $group_id: Int!, $user_id: Int!) {
    mx_posts(
      where: {
        _and: [
          {
            _or: [
              { title: { _ilike: $searchKeyword } }
              { body: { _ilike: $searchKeyword } }
              { context: { _ilike: $searchKeyword } }
            ]
          }
          {
            board: {
              _and: [
                { group: { id: { _eq: $group_id } } }
                {
                  _or: [
                    { permission: { _eq: "member" } }
                    { group: { users: { user_id: { _eq: $user_id } } } }
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
      created_at
      createdBy {
        id
        name
      }
      board {
        title
        type
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
