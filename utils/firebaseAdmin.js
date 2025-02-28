const admin = require("firebase-admin");

// Chèn file serviceAccountKey.json mà bạn tải về từ Firebase
const serviceAccount = require("../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
