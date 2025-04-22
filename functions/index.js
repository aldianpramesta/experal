const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.getSignedVideoUrl = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Harus login");

  const fileName = `videos/${data.videoName}.mp4`;
  const bucket = admin.storage().bucket();
  const file = bucket.file(fileName);
  const expiresAt = Date.now() + 60 * 60 * 1000; // 1 jam

  const [url] = await file.getSignedUrl({
    action: "read",
    expires: expiresAt
  });

  return { url };
});
