import gql from "graphql-tag";
export const commentsResult = gql`
  fragment comments_result_anonymous on mx_comments {
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
export const postResult = gql`
  fragment post_result_anonymous on mx_posts {
    id
    title
    body
    context
    metadata
    created_at
    updated_at
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
