import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-D3SnjkIJF7fsfj0HRKiyE-de6WEfUXE",
  authDomain: "clone-369314.firebaseapp.com",
  projectId: "gmailclone-369314",
  storageBucket: "gmailclone-369314.appspot.com",
  messagingSenderId: "184413169503",
  appId: "1:184413169503:web:91a61f1ab38e3cd842f8ea",
  measurementId: "G-5MP2XQW3YV",
//   databaseURL: 'https://gmailclone-369314-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }


