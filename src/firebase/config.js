import firebase from 'firebase'
import app from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDLGd_008eMZ8yKO4EU1GSobHSMLXoRKog",
    authDomain: "grupo4part2.firebaseapp.com",
    projectId: "grupo4part2",
    storageBucket: "grupo4part2.firebasestorage.app",
    messagingSenderId: "125929398458",
    appId: "1:125929398458:web:4f8c33d60310c4a4b62283"
  };

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()