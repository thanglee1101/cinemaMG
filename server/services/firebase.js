import admin from 'firebase-admin';
import serviceAccount from '../../backendshop-b6af8-firebase-adminsdk-rlgqv-1f1fee998d.json'
// Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'cgv-cinemas-1cbd9.appspot.com',
});
// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
    bucket,
};