const admin = require("firebase-admin");
const serviceAccount = require("../../.firebase/parti-2020-firebase-adminsdk-362de-fc34e75a92.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.firestore = admin.firestore();
exports.admin = admin;
