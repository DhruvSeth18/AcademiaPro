import { initializeApp } from "firebase/app";

console.log(process.env.FIREBASE_Env);
const firebaseConfig = {
  apiKey: process.env.FIREBASE_Env,
  authDomain: "blog-by-dhruv.firebaseapp.com",
  projectId: "blog-by-dhruv",
  storageBucket: "blog-by-dhruv.appspot.com",
  messagingSenderId: "668402000577",
  appId: "1:668402000577:web:adb43ac6c4737a3c7dea40",
  measurementId: "G-X8BGJKVZHR"
};

const app = initializeApp(firebaseConfig);
export default app;