# 빠띠 믹스 웹

![](/public/android-icon-192x192.png)

## Features

- ReactJS-Typescript with Hooks
- Forms validations with Hooks
- LocalStorage Encryption with secure-ls
- React Router
- Material UI

## Firebase

- firebase
  - firestore
  - auth
  - storage
  - analytics
  - functions

#### firebase tools

```
curl -sL https://firebase.tools | bash
```

### storage

#### [file download](https://firebase.google.com/docs/storage/web/download-files#cors_configuration)

initial setting

```
gsutil cors set cors.json gs://seoul-action-plan.appspot.com
```

### firestore

rules와 indexes 첫 일괄 배포는 cli로 하되, 그 후 수정은 console 사이트에서 수동으로 배포하고, cli로 변경 부분 다운 받아 commit하는 작업 방식을 따른다.

firebase deploy --only firestore:rules --project seoul-action-plan
firebase deploy --only firestore:indexes --project seoul-action-plan
\*firebase.json 에 파일 위치 존재 여부 확인

#### rules

#### indexes

firebase firestore:indexes --project seoul-action-plan | cat > ./firestore.indexes.json

##### test

firebase emulators:start --only firestore

##### deploy

firebase deploy --only firestore:rules --project seoul-action-plan
firebase deploy --only firestore:indexes --project seoul-action-plan

### functions

#### deploy

firebase deploy --only functions:candidateVoteCreate,functions:candidateVoteDelete --project seoul-action-plan

## To do

### 관리자 커스텀

#### 정렬기준

1. 공감수순
1. 조회수순
1. 댓글수순
1. 업데이트순
1. 등록순

- 앞에서
- 뒤에서

1. 마지막 댓글순
1. 마지막 공감순

#### 홈

1. 보이는 게시판 선택

   - 보이는 포스트 정렬기준 선택
   - 보이는 포스트 수 선택
   - 게시판 포스트 유형
     - 지도 여부
     - 이미지 유무
       - 이미지 비율
         - 정사각형
         - 16:9

1. 디자인 선택
   - 데스크탑
   - 모바일
