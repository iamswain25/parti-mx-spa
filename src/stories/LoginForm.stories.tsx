import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import LoginForm from './LoginForm';

export default {
  title: 'LoginForm',
  component: LoginForm,
} as Meta;

const Template = (args) => <LoginForm {...args} />

export const Default = Template.bind({});
Default.args = {
  handleForm: (e) => e.preventDefault() 
}