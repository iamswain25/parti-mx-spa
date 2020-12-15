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
gsutil cors set cors.json gs://gyeonggi-village-mix.appspot.com
```

### firestore

#### rules

#### indexes

download:
`firebase firestore:indexes --project gyeonggi-village-mix | cat > ./firestore.indexes.json`

##### test

firebase emulators:start --only firestore

##### deploy

firebase deploy --only firestore:rules

### functions

#### deploy

firebase deploy --only functions:candidateVoteCreate,functions:candidateVoteDelete --project gyeonggi-village-mix
