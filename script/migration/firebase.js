const admin = require("firebase-admin");
const serviceAccount = require("../../.firebase/parti-2020-firebase-adminsdk-yacyz-9bf12d9dc1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.firestore = admin.firestore();
exports.admin = admin;
