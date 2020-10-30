import * as functions from "firebase-functions";
import * as isbot from "isbot";
import * as admin from "firebase-admin";
const firestore = admin.firestore();
const bucket = admin.storage().bucket();
export default functions
  .region("us-central1")
  .https.onRequest(async (req, res) => {
    console.log(bucket.name);
    console.log(await bucket.iam.getPolicy());
    console.log(bucket.baseUrl);
    const { path } = req;
    const [, post_id] = path.substr(1).split("/");
    if (isbot(req.headers["user-agent"] || "")) {
      if (post_id) {
        const doc = await firestore.collection("posts").doc(post_id).get();
        const { title, body, images, context } = doc.data() as any;
        let image = `/ogp.png`;
        console.log(images);
        if (images?.[0]?.path) {
          try {
            const file = bucket.file(images[0].path);
            console.log(file.baseUrl);
            console.log(file.acl);
            console.log(file.exists);
            console.log(file.getMetadata());
            // [image] = await file.getSignedUrl({
            //   action: "read",
            //   expires: Date.now() + 1000 * 60 * 60,
            // });
          } catch (error) {
            console.error(error);
          }
        }
        // <meta name="twitter:title" content="${title}" />
        // <meta name="twitter:image" content="${image}"
        res.status(200).send(`
  <!doctype html>
    <head>
      <title>${title}</title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${context || body}" />
      <meta property="og:image" content="${image}"
    </head>
    <body>${body}</body>
  </html>
`);
      }
    } else {
      res.redirect("/p/" + post_id);
    }
  });
