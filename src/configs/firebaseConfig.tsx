// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8WS7Qt1i-flQqk8iJhgV8jGgMmioLGPU",
  authDomain: "juego-martin.firebaseapp.com",
  projectId: "juego-martin",
  storageBucket: "juego-martin.appspot.com",
  messagingSenderId: "808741423040",
  appId: "1:808741423040:web:9a3192bbf74d710990aa25"
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
//referencia al servicio de data base
export const database = getDatabase(firebase);