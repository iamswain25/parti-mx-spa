# production 세팅

## 환경변수 세팅

firebase functions:config:set hasura.url="http://...com/" hasura.secret="..."
firebase functions:config:set hasura.url="http://api.parti.mx/v1/graphql"
firebase functions:config:set hasura.secret="..."
firebase functions:config:get

## 배포

firebase deploy --only functions --project ywca-mix
