
import React from 'react';

import VoteCandidate from '../components/VoteCandidate';

export default {
  component: VoteCandidate,
  title: 'VoteCandidate',
};

const Template = args => <VoteCandidate {...args} />;

export const Default = Template.bind({});
Default.args = {
    candidate: {
			id: 'id',
			post_id: 'post_id',
			order: 1,
			body: 'first candidate',  
    },
    total: 1,
    max: 20,
    voted: true,
    isResultHidden: false,
    isAnonymous: false,
    isClosed: true,
};