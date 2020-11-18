import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import EventDetail from './EventDetail';

export default {
  title: 'BoardDetail/EventDetail',
  component: EventDetail,
} as Meta;

const Template = (args) => {
  const post = { post: args }
  return    <EventDetail {...post} />
};

export const Default = Template.bind({});

Default.args = {
  id: 'event',
  title: 'event',
  board_id: 'event_board',
  group_id: 'home',
  type: 'event',
  context: '1111',
  password: '1111',
  name: 'event detail',
  body: 'event detail',
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