import gql from "graphql-tag";
import { posts, comments, candidates } from "./fragment";
export const whoami = gql`
  subscription($email: String!) {
    mx_users(where: { email: { _eq: $email } }) {
      id
    }
  }
`;

export const subscribeGroupsByUserId = gql`
  subscription($user_id: Int!) {
    mx_users_by_pk(id: $user_id) {
      id
      name
      photo_url
      groups(
        where: { status: { _in: ["user", "organizer", "participant"] } }
        order_by: { updated_at: desc_nulls_last }
      ) {
        updated_at
        group_id
        group {
          slug
          title
          id
          bg_img_url
          updated_at
          last_posted_at
        }
      }
    }
  }
`;

export const subscribePostsByBoardId = gql`
  subscription($id: Int!, $user_id: Int!) {
    mx_boards_by_pk(id: $id) {
      id
      body
      title
      slug
      posts_aggregate {
        aggregate {
          count
        }
      }
      posts(order_by: { updated_at: desc }, limit: 20) {
        ...posts
      }
    }
  }
  ${posts}
`;

export const subscribeSuggestion = gql`
  subscription($id: Int!, $user_id: Int, $isAnonymous: Boolean!) {
    mx_posts_by_pk(id: $id) {
      id
      title
      body
      context
      metadata
      images
      files
      board {
        title
      }
      updatedBy {
        name
        photo_url
        id
      }
      createdBy {
        name
        photo_url
        id
      }
      comments(
        order_by: { created_at: asc }
        where: { parent_id: { _is_null: true } }
      ) {
        ...comments
        re(order_by: { created_at: asc }) {
          ...comments
        }
      }
      created_at
      updated_at
      meLiked: users(where: { user_id: { _eq: $user_id } })
        @skip(if: $isAnonymous) {
        like_count
      }
      likedUsers: users(where: { like_count: { _gt: 0 } }) {
        created_at
        user {
          name
          photo_url
        }
      }
    }
  }
  ${comments}
`;

export const subscribeNotice = gql`
  subscription($id: Int!, $user_id: Int!) {
    mx_posts_by_pk(id: $id) {
      id
      title
      body
      context
      metadata
      images
      files
      board {
        title
      }
      updatedBy {
        id
        name
        photo_url
      }
      createdBy {
        id
        name
        photo_url
      }
      comments(
        order_by: { created_at: asc }
        where: { parent_id: { _is_null: true } }
      ) {
        ...comments
        re(order_by: { created_at: asc }) {
          ...comments
        }
      }
      created_at
      updated_at
      meLiked: users(where: { user_id: { _eq: $user_id } }) {
        like_count
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
  ${comments}
`;

export const subscribeBoardsByGroupId = gql`
  subscription($group_id: Int!, $user_id: Int!) {
    mx_groups_by_pk(id: $group_id) {
      id
      title
      bg_img_url
      boards(
        order_by: {
          last_posted_at: desc_nulls_last
          updated_at: desc_nulls_last
        }
      ) {
        id
        title
        body
        permission
        type
        updated_at
        last_posted_at
        users(where: { user_id: { _eq: $user_id } }) {
          updated_at
        }
      }
      users_aggregate {
        aggregate {
          count
        }
      }
      users(where: { user_id: { _eq: $user_id } }) {
        status
        notification_type
      }
    }
  }
`;

export const subscribeMemberCount = gql`
  subscription($group_id: Int!) {
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

export const subscribeNoticeList = gql`
  subscription($id: Int!, $user_id: Int!, $sort: [mx_posts_order_by!]) {
    mx_boards_by_pk(id: $id) {
      id
      body
      title
      slug
      posts_aggregate {
        aggregate {
          count
        }
      }
      announcements: posts(
        order_by: $sort
        limit: 20
        where: { metadata: { _contains: { announcement: true } } }
      ) {
        ...posts
      }

      posts: posts(
        order_by: $sort
        limit: 20
        where: { _not: { metadata: { _contains: { announcement: true } } } }
      ) {
        ...posts
      }
    }
  }
  ${posts}
`;

export const subscribeVote = gql`
  subscription($id: Int!, $user_id: Int!) {
    mx_posts_by_pk(id: $id) {
      id
      title
      body
      context
      metadata
      images
      files
      board {
        title
      }
      updatedBy {
        name
        photo_url
        id
      }
      createdBy {
        name
        photo_url
        id
      }
      comments(
        order_by: { created_at: asc }
        where: { parent_id: { _is_null: true } }
      ) {
        ...comments
        re(order_by: { created_at: asc }) {
          ...comments
        }
      }
      created_at
      updated_at
      meLiked: users(where: { user_id: { _eq: $user_id } }) {
        like_count
      }
      users_aggregate {
        aggregate {
          sum {
            like_count
          }
        }
      }
      candidates {
        id
        body
        post {
          id
          metadata
        }
        votes_aggregate {
          aggregate {
            sum {
              count
            }
          }
        }
        myVote: votes(where: { user_id: { _eq: $user_id } }) {
          count
        }
        votes {
          count
          created_at
          user {
            name
            photo_url
            id
          }
        }
      }
    }
  }
  ${comments}
`;

export const subscribeEvent = gql`
  subscription($id: Int!, $user_id: Int!) {
    mx_posts_by_pk(id: $id) {
      id
      title
      body
      context
      metadata
      images
      files
      board {
        title
      }
      updatedBy {
        name
        photo_url
        id
      }
      createdBy {
        name
        photo_url
        id
      }
      comments(
        order_by: { created_at: asc }
        where: { parent_id: { _is_null: true } }
      ) {
        ...comments
        re(order_by: { created_at: asc }) {
          ...comments
        }
      }
      created_at
      updated_at
      meLiked: users(where: { user_id: { _eq: $user_id } }) {
        like_count
      }
      likedUsers: users(where: { like_count: { _gt: 0 } }) {
        created_at
        user {
          name
          photo_url
        }
      }
    }
  }
  ${comments}
`;

export const subsByPostId = gql`
  subscription($post_id: Int!, $user_id: Int, $isAnonymous: Boolean!) {
    mx_posts_by_pk(id: $post_id) {
      id
      title
      body
      html
      context
      metadata
      images
      files
      closed_at
      tags
      location
      board {
        id
        title
        type
        group {
          id
          title
        }
      }
      updatedBy {
        name
        photo_url
        id
      }
      createdBy {
        name
        photo_url
        id
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      comments(
        order_by: { created_at: asc }
        where: { parent_id: { _is_null: true } }
      ) {
        ...comments
        re(order_by: { created_at: asc }) {
          ...comments
        }
      }
      created_at
      updated_at
      users_aggregate {
        aggregate {
          sum {
            like_count
          }
        }
      }
      meLiked: users(where: { user_id: { _eq: $user_id } })
        @skip(if: $isAnonymous) {
        like_count
      }
      likedUsers: users(where: { like_count: { _gt: 0 } }) {
        created_at
        user {
          name
          photo_url
        }
      }
      candidates(order_by: { order: asc_nulls_last }) {
        ...candidates
      }
    }
  }
  ${comments}
  ${candidates}
`;
