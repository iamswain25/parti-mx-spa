import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import EventNew from './EventNew';

export default {
  title: 'BoardNew/EventNew',
  component: EventNew,
} as Meta;

const Template = () => <EventNew />

export const Default = Template.bind({});