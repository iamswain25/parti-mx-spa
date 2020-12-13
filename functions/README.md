# production 세팅

## 환경변수 세팅

firebase functions:config:set hasura.url="http://...com/" hasura.secret="..."
firebase functions:config:set hasura.url="https://api."
firebase functions:config:set hasura.secret="..."
firebase functions:config:set gmail.user="" gmail.pass="" --project gyeonggi-village-mix
firebase functions:config:set algolia.app_id="" algolia.api_key="" --project gyeonggi-village-mix
firebase functions:config:get --project gyeonggi-village-mix

## 배포

firebase deploy --only functions

### 따로 배포

firebase deploy --only functions:hasuraWebhook
