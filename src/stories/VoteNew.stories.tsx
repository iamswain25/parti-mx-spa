import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import VoteNew from './VoteNew';

export default {
  title: 'BoardNew/VoteNew',
  component: VoteNew,
} as Meta;

const Template = () => <VoteNew />

export const Default = Template.bind({});