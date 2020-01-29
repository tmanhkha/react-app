import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBcIswbg3S030dCd4KYyo_xa23E-YeXNmk',
  authDomain: 'crown-db-5ca1b.firebaseapp.com',
  databaseURL: 'https://crown-db-5ca1b.firebaseio.com',
  projectId: 'crown-db-5ca1b',
  storageBucket: 'crown-db-5ca1b.appspot.com',
  messagingSenderId: '1056753873978',
  appId: '1:1056753873978:web:e2535666f4c9ad15297103',
  measurementId: 'G-342EXZM5LR',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exits) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return userRef;
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
