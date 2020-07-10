import gql from "graphql-tag";
export const commentsResult = gql`
  fragment comments_result on mx_comments {
    id
    body
    updated_at
    post {
      board {
        type
      }
    }
    user {
      id
      name
      photo_url
      checkedPosts(where: { post_id: { _eq: $id }, like_count: { _gt: 0 } }) {
        like_count
      }
    }
    likes(where: { user_id: { _eq: $user_id } }) @skip(if: $isAnonymous) {
      user {
        name
      }
    }
    likes_aggregate {
      aggregate {
        count
      }
    }
  }
`;
export const voteCommentsResult = gql`
  fragment vote_comments_result on mx_comments {
    id
    body
    post {
      metadata
    }
    updated_at
    user {
      id
      name
      photo_url
      votes(where: { candidate: { post_id: { _eq: $id } } }) {
        candidate {
          body
        }
      }
    }
    likes(where: { user_id: { _eq: $user_id } }) {
      user {
        name
      }
    }
    likes_aggregate {
      aggregate {
        count
      }
    }
  }
`;
export const noticeCommentsResult = gql`
  fragment notice_comments_result on mx_comments {
    id
    body
    updated_at
    user {
      id
      name
      photo_url
    }
    likes(where: { user_id: { _eq: $user_id } }) {
      user {
        name
      }
    }
    likes_aggregate {
      aggregate {
        count
      }
    }
  }
`;
export const posts = gql`
  fragment posts on mx_posts {
    id
    title
    body
    context
    metadata
    closed_at
    created_at
    updated_at
    images
    users(where: { user_id: { _eq: $user_id } }) @skip(if: $isAnonymous) {
      like_count
      updated_at
    }
    meLiked: users(where: { user_id: { _eq: $user_id } })
      @skip(if: $isAnonymous) {
      like_count
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
`;
export const boards = gql`
  fragment boards on mx_boards {
    id
    title
    body
    permission
    type
    updated_at
    last_posted_at
    posts(limit: 4, order_by: { created_at: desc_nulls_last }) {
      ...posts
    }
  }
  ${posts}
`;
export const candidates = gql`
  fragment candidates on mx_candidates {
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
    myVote: votes(where: { user_id: { _eq: $user_id } })
      @skip(if: $isAnonymous) {
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
`;
