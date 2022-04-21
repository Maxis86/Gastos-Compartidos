import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDQhyfBrHYK1YmEkHFVY3E8Nm-t_U5P-JY",
  authDomain: "gastos-compartidos-4715c.firebaseapp.com",
  projectId: "gastos-compartidos-4715c",
  storageBucket: "gastos-compartidos-4715c.appspot.com",
  messagingSenderId: "479134524231",
  appId: "1:479134524231:web:0692d69c94fde2b387e262",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
