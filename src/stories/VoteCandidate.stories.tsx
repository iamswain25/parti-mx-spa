
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
      __typename: 'string',
      id: 'candidate1',
      order: 1,
      body: 'candidate1',
      my_like_count: 11,
      post: {
        id: 10,
        metadata: {
          closingMethod: 'manual',
          isBinary: false,
          isMultiple: false,
          isAnonymous: false,
          isResultHidden: false,
        },
      },
      votes_aggregate: {
        aggregate: {
          sum: {
            count: 100,
          },
        },
      },
      votes: [{
        user: {
            id: 111,
            name: 'user',
            photo_url: '',
            email: '',
            checkedPosts: [{ like_count: 1 }],
            votes: [{
                user: {
                    id: '123',
                    name: '123',
                }
            }],
        },
        count: 100,
        created_at: '',
        candidate: {
            __typename: 'string',
            id: 'cnadidate2',
            order: 2,
            body: 'candidate2',
        },
      }],    
    },
    total: 20,
    max: 20,
    voted: false,
    isResultHidden: false,
    isAnonymous: false,
    isClosed: false,
};