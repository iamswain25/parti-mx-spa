import * as functions from "firebase-functions";
import * as isbot from "isbot";
export default functions
  .region("us-central1")
  .https.onRequest(async (req, res) => {
    const { path } = req;
    const [, post_id] = path.substr(1).split("/");
    if (isbot(req.headers["user-agent"] || "")) {
      if (post_id) {
        const { title, body, images, context } = {} as any;
        res.status(200).send(`<!doctype html>
    <head>
      <title>${title}</title>
      <meta name="twitter:card" content="summary" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${context || body}" />
      <meta property="og:image" content="${
        images?.[0]?.uri || `https://parti.mx/ogp.png`
      }"
    </head>
    <body>${body}</body>
  </html>`);
      }
    } else {
      res.redirect("https://parti.mx/p/" + post_id);
    }
  });
