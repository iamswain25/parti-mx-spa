import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import SuggestionDetail from './SuggestionDetail';

export default {
  title: 'BoardDetail/SuggestionDetail',
  component: SuggestionDetail,
} as Meta;

const Template = (args) => {
  const post = { post: args }
  return    <SuggestionDetail {...post} />
};

export const Default = Template.bind({});

Default.args = {
  id: 'suggestion',
  title: 'suggestion',
  board_id: 'suggestion_board',
  group_id: 'home',
  type: 'suggestion',
  context: '1111',
  password: '1111',
  name: 'suggestion detail',
  body: 'suggestion detail',
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