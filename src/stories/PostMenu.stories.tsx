import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import PostMenu from './PostMenu';

export default {
  title: 'PostMenu',
  component: PostMenu,
} as Meta;

const Template = (args) => <PostMenu {...args} />;

export const Notice_Organizer = Template.bind({});
Notice_Organizer.args = {
  isOrganizer: true,
  type: 'notice',
  created_at: Date.now(),
  created_by: '',
  is_announced: false,
  post: {
    title: 'post title',
    images: []
  }
};

export const Notice_Announced_Organizer = Template.bind({});
Notice_Announced_Organizer.args = {
  isOrganizer: true,
  type: 'notice',
  created_at: Date.now(),
  created_by: '',
  is_announced: true,
  post: {
    title: 'post title',
    images: []
  }
};

export const Mine = Template.bind({});
Mine.args = {
  isOrganizer: false,
  type: 'notice',
  created_at: Date.now(),
  created_by: 'currentUser',
  is_announced: false,
  post: {
    title: 'post title',
    images: []
  }
};

export const Suggestion = Template.bind({});
Suggestion.args = {
  isOrganizer: false,
  type: 'suggestion',
  created_at: Date.now(),
  created_by: '',
  is_announced: false,
  post: {
    title: 'post title',
    images: []
  }
};