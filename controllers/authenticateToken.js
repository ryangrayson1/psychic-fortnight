const admin = require('firebase-admin');
const serviceAccount = {
    "type": "service_account",
    "project_id": "psychic-fortnight",
    "private_key_id": "f41ff9c419c25ed0e9114693ad48c02b0f47e6d2",
    "private_key": process.env.FIREBASE_SERVICE_KEY,
    "client_email": "firebase-adminsdk-r3ycf@psychic-fortnight.iam.gserviceaccount.com",
    "client_id": "108101675999541675334",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r3ycf%40psychic-fortnight.iam.gserviceaccount.com"
  }
  
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://simple-app-96c08.firebaseapp.com',
});
async function decodeIDToken(req, res, next) {
  const header = req.headers?.authorization;
  if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
const idToken = req.headers.authorization.split('Bearer ')[1];
try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }
next();
}
module.exports = decodeIDToken;