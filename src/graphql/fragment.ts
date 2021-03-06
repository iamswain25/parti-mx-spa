import gql from "graphql-tag";
export const comments = gql`
  fragment comments on mx_comments {
    id
    body
    updated_at
    my_like
    post {
      id
      metadata
      board {
        type
      }
    }
    user {
      id
      name
      photo_url
      checkedPosts(
        where: { post_id: { _eq: $post_id }, like_count: { _gt: 0 } }
      ) {
        like_count
      }
      votes(where: { candidate: { post_id: { _eq: $post_id } } }) {
        candidate {
          body
        }
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
    location
    tags
    my_like_count
    board {
      id
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
    order
    my_like_count
    votes_aggregate {
      aggregate {
        sum {
          count
        }
      }
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
export const groups = gql`
  fragment groups on mx_groups {
    id
    title
    status
    bg_img_url
    mb_img_url
    created_at
    createdBy {
      id
    }
    users_aggregate(
      where: { status: { _in: ["organizer", "user", "participant"] } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
export const usersgroup = gql`
  fragment usersgroup on mx_users_group {
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
`;
