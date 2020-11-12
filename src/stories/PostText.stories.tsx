import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import PostText from './PostText';

export default {
  title: 'PostText',
  component: PostText,
} as Meta;

const Template = (args) => <PostText {...args} />

export const Default = Template.bind({});
const long_content =
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non purus interdum, lobortis est vel, suscipit nisi. Maecenas rutrum augue ut neque maximus, et vulputate enim dapibus. Donec odio urna, fermentum vulputate tristique in, rhoncus vitae odio. Integer tincidunt enim non congue pulvinar. Duis consectetur purus quis urna venenatis, vitae cursus dui mattis. Aenean vitae tristique lacus. Nam sodales, ex eu sagittis varius, nisl nisl scelerisque tellus, eget mattis justo tellus id velit. Sed rhoncus mi quis turpis dictum, a lacinia mauris fermentum. Proin suscipit ullamcorper ligula, nec scelerisque quam feugiat non. Duis ac magna nec eros aliquet rutrum id ut nisl. Mauris ultricies lacus a quam porttitor pulvinar. Praesent dapibus hendrerit massa ut viverra. Mauris fermentum molestie maximus.Sed at rutrum tortor. Pellentesque id velit a turpis viverra bibendum nec eget leo. Praesent aliquam ex lorem, et feugiat nulla laoreet vitae. Maecenas elementum sem in urna dignissim dignissim sit amet nec nisl. Etiam ullamcorper lacinia elit, et mattis augue interdum vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rutrum est a nibh sodales commodo. Morbi pellentesque malesuada consectetur. Donec elementum sapien arcu, ut accumsan odio consequat vel. Vivamus congue semper ipsum at blandit. Quisque tincidunt id massa at interdum. Vivamus id magna lacus. Aliquam molestie, urna a porta efficitur, tellus nibh condimentum turpis, eget finibus ligula dui eget lacus. Morbi dignissim hendrerit faucibus.";

const short_content =
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non purus interdum, lobortis est vel, suscipit nisi. Maecenas rutrum augue ut neque maximus, et vulputate enim dapibus. ";

Default.args = {
  content: long_content
}