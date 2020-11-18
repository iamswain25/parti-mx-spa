import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import NoticeNew from './NoticeNew';

export default {
  title: 'BoardNew/NoticeNew',
  component: NoticeNew,
} as Meta;

const Template = () => <NoticeNew />

export const Default = Template.bind({});
Default.args = {
//   handleForm: (e) => e.preventDefault() 
}