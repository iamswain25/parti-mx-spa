import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import SuggestionNew from './SuggestionNew';

export default {
  title: 'BoardNew/SuggestionNew',
  component: SuggestionNew,
} as Meta;

const Template = () => <SuggestionNew />

export const Default = Template.bind({});