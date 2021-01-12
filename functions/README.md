# production 세팅

## NODE.JS version

firebase가 v12 지원:
nvm install v12
nvm alias default v12

## 환경변수 세팅

firebase functions:config:set hasura.url="http://...com/" hasura.secret="..."
firebase functions:config:set hasura.url="http://hasura-load-balancer-1241189389.ap-northeast-2.elb.amazonaws.com/v1/graphql"
firebase functions:config:set hasura.secret="..."
firebase functions:config:set gmail.user="...@parti.xyz" gmail.pass="..." --project green-newdeal
firebase functions:config:get

## 배포

firebase deploy --only functions

### 따로 배포

firebase deploy --only functions:hasuraWebhook
