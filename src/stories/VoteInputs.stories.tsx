import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import VoteInputs from './VoteInputs';

export default {
  title: 'VoteInputs',
  component: VoteInputs,
} as Meta;

const Template = (args) => <VoteInputs {...args} />

export const Default = Template.bind({});
Default.args = {
  formControl: {
    register: { default: "default"},
    errors: {},
    control: {}
  }
}