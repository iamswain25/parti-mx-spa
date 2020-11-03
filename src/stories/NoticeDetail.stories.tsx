
import React from 'react';

import NoticeDetail from '../components/NoticeDetail';

export default {
  component: NoticeDetail,
  title: 'NoticeDetail',
};

const Template = args => <NoticeDetail {...args} />;

export const Default = Template.bind({});
Default.args = {
    post: {
        id: 'notice_post',
        title: 'notice_post',
        board_id: 'notice_board',
        group_id: 'home',
        type: 'notice',
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
    },
};