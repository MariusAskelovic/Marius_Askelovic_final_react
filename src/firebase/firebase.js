// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.VITE_ENV_apiKey,
  authDomain: import.meta.VITE_ENV_authDomain,
  projectId: import.meta.VITE_ENV_projectId,
  storageBucket: import.meta.VITE_ENV_storageBucket,
  messagingSenderId: import.meta.VITE_ENV_messagingSenderId,
  appId: import.meta.VITE_ENV_appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
