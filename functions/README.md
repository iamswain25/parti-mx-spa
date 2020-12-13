# production 세팅

## NODE.JS version

firebase가 v12 지원:
nvm install v12
nvm alias default v12

## 환경변수 세팅

firebase functions:config:set hasura.url="http://...com/" hasura.secret="..."
firebase functions:config:set hasura.url="https://api."
firebase functions:config:set hasura.secret="..."
firebase functions:config:set gmail.user="" gmail.pass="" --project green-newdeal
firebase functions:config:set algolia.app_id="" algolia.api_key="" --project green-newdeal
firebase functions:config:get --project green-newdeal

## 배포

firebase deploy --only functions

### 따로 배포

firebase deploy --only functions:hasuraWebhook
