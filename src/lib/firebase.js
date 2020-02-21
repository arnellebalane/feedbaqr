import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyBXewH-sBCdokkUVKqmgnFpNB72Jesoqu4',
  authDomain: 'feedbaqr.firebaseapp.com',
  databaseURL: 'https://feedbaqr.firebaseio.com',
  projectId: 'feedbaqr',
  storageBucket: 'feedbaqr.appspot.com',
  messagingSenderId: '900927958030',
  appId: '1:900927958030:web:cf48a72c686cc3d229a05f',
  measurementId: 'G-T9H3Z3DV63',
});

export default firebase;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
