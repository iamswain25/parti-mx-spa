import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import BoardPostVote from './BoardPostVote';

export default {
  title: 'BoardPost/BoardPostVote',
  component: BoardPostVote,
} as Meta;

const Template = (args) => {
  const post = { post: args }
  return    <BoardPostVote {...post} />
};

export const Default = Template.bind({});

Default.args = {
  id: 'vote',
  title: 'vote',
  board_id: 'vote_board',
  group_id: 'home',
  type: 'vote',
  context: '1111',
  password: '1111',
  name: 'vote detail',
  body: 'vote detail',
  created_by: '1111',
  count_like: 0,
  count_comment: 0,
  count_view: 0,
  // html: RawDraftContentState,
  metadata: {
      announcement: false
  },
  images: null,
  files: null,
  // candidates: Candidate[],
  // closed_at: firebase.firestore.Timestamp,
  is_closed: false,
  is_announced: false,
  created_at: '',
  updated_at: '',
  // announced_at: firebase.firestore.Timestamp,
  // denounced_at: firebase.firestore.Timestamp,
  // location: { type: "Point", coordinates: [number, number] },
  // tags: string[],
  // users: PostLike[],
  updatedBy: {
      id: 'asdf',
      name: 'asdf'
  },
  createdBy: {
      id: 'asdf',
      name: 'asdf',
  },
  // comments_aggregate: {
  //     aggregate: {
  //     count: number,
  //     },
  // },
  // comments: Comment[],
  my_like_count: 1,
  // board: Board,
};