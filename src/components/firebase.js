// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA3PCo3y1yjiwN0uyl_DTinw1emdH82Mg",
  authDomain: "movie-library-project.firebaseapp.com",
  projectId: "movie-library-project",
  storageBucket: "movie-library-project.appspot.com",
  messagingSenderId: "237459006817",
  appId: "1:237459006817:web:ee9acb78c7b3e2aa71d120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(); 
export const db=getFirestore(app);

export default app;