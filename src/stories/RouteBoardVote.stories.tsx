
import React from 'react';

import RouteBoardVote from '../components/RouteBoardVote';

export default {
  component: RouteBoardVote,
  title: 'RouteBoardVote',
};

const Template = args => <RouteBoardVote {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: 'vote_board',
    title: 'vote_board',
    order: 1,
    count_open: 1,
    count_closed: 1,
    body: 'vote_board',
    slug: 'vote_board',
    permission: {
        create: ['anonymous'],
        read: ['anonymous'],
        update: ['anonymous'],
        delete: ['anonymous'],
        comment: ['anonymous'],
        like: ['anonymous'],
    },
    type: 'vote',
    updated_at: '',
    last_posted_at: '',
    users: [{
        userId: 111,
        board_id: 'vote_board',
        count_click: 1,
    }],
    newPostCount: 1,
    posts: [{
        id: 'vote_post',
        title: 'vote_post',
        board_id: 'vote_board',
        group_id: 'home',
        type: 'vote',
        // context: string,
        // password: string,
        name: 'post11111111111',
        body: 'post1111111111',
        // created_by: string,
        count_like: 0,
        count_comment: 0,
        count_view: 0,
        // html: RawDraftContentState,
        metadata: {
            closingMethod: 'manual',
            isBinary: false,
            isMultiple: false,
            isAnonymous: false,
            isResultHidden: false,
        },
        images: null,
        files: null,
        // candidates: Candidate[],
        // closed_at: firebase.firestore.Timestamp,
        is_closed: false,
        is_announced: false,
        created_at: '',
        updated_at: '',
        // announced_at: firebase.firestore.Timestamp,
        // denounced_at: firebase.firestore.Timestamp,
        // location: { type: "Point", coordinates: [number, number] },
        // tags: string[],
        // users: PostLike[],
        updatedBy: {
            id: 'asdf',
            name: 'asdf'
        },
        createdBy: {
            id: 'asdf',
            name: 'asdf',
        },
        // comments_aggregate: {
        //     aggregate: {
        //     count: number,
        //     },
        // },
        // comments: Comment[],
        // my_like_count: number | null,
        // board: Board,
    }],
    group_id: 'home',
};