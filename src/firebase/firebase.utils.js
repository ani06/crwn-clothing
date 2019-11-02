import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config= {
    apiKey: "AIzaSyBbrB7HMn-neSQqxUv30jjgrtfHhZLBeXM",
    authDomain: "crwn-db-4bb3d.firebaseapp.com",
    databaseURL: "https://crwn-db-4bb3d.firebaseio.com",
    projectId: "crwn-db-4bb3d",
    storageBucket: "crwn-db-4bb3d.appspot.com",
    messagingSenderId: "416233308594",
    appId: "1:416233308594:web:3c24d802ece6cd584d64ab",
    measurementId: "G-9RDZN5DXND"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName , email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch(error){
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;