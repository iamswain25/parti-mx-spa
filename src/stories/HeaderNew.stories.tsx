import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import HeaderNew from './HeaderNew';

export default {
  title: 'BoardNew/HeaderNew',
  component: HeaderNew,
} as Meta;

const Template = (args) => <HeaderNew {...args} />

export const Default = Template.bind({});
Default.args = {
  title: "로딩 중"
}