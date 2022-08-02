// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf1HGxelLVEH6hd9kiggn7VfhzcA1a0X0",
  authDomain: "react-curso-912a5.firebaseapp.com",
  projectId: "react-curso-912a5",
  storageBucket: "react-curso-912a5.appspot.com",
  messagingSenderId: "879229771380",
  appId: "1:879229771380:web:d189d9e53cf9136b80bb21"
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
// parte autenticacion
export const FirebaseAuth = getAuth( FirebaseApp )
// coneccion a la db
export const FirebaseDB = getFirestore( FirebaseApp )