import * as functions from "firebase-functions";
import * as isbot from "isbot";
import { gql } from "apollo-boost";
import { client } from "./ApolloClient";
export default functions
  .region("us-central1")
  .https.onRequest(async (req, res) => {
    const { path } = req;
    const [, post_id] = path.substr(1).split("/");
    if (isbot(req.headers["user-agent"] || "")) {
      if (post_id) {
        const { data } = await client.query({
          query: gql`
            query($post_id: Int!) {
              mx_posts_by_pk(id: $post_id) {
                id
                title
                body
                context
                metadata
                location
                images
                files
                created_at
                updated_at
                tags
              }
            }
          `,
          variables: { post_id },
        });
        const { title, body, images, context } = data.mx_posts_by_pk ?? {};
        res.status(200).send(`<!doctype html>
    <head>
      <title>${title}</title>
      <meta name="twitter:card" content="summary" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${context || body}" />
      <meta property="og:image" content="${
        images?.[0]?.uri || `https://mix.beyondcovid19-opencall.org/ogp.png`
      }"
    </head>
    <body>${body}</body>
  </html>`);
      }
    } else {
      res.redirect("https://mix.beyondcovid19-opencall.org/p/" + post_id);
    }
  });
