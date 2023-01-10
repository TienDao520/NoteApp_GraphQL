// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCSAuh73oHbxgJSmIe6F5Rg1Nfb9bQ05v0',
  authDomain: 'note-app-e0075.firebaseapp.com',
  projectId: 'note-app-e0075',
  storageBucket: 'note-app-e0075.appspot.com',
  messagingSenderId: '1022195751904',
  appId: '1:1022195751904:web:08634a23c270394d2b2985',
  measurementId: 'G-QGYEW189T5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
