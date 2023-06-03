// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWKJsPGohQUV45pg-XqdU_JQsy0mOgZUo",
  authDomain: "fir-practice-a5811.firebaseapp.com",
  projectId: "fir-practice-a5811",
  storageBucket: "fir-practice-a5811.appspot.com",
  messagingSenderId: "586358110663",
  appId: "1:586358110663:web:4908fa792b7d1806d9c1e2"
};

console.log(" firebaseConfig: ",firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// export {app,db};