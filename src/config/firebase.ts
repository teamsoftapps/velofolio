// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHZN7_rstpWXH6HBy377Wd8uYk3EKip6I",
    authDomain: "velofolio-6b313.firebaseapp.com",
    databaseURL: "https://velofolio-6b313-default-rtdb.firebaseio.com",
    projectId: "velofolio-6b313",
    storageBucket: "velofolio-6b313.firebasestorage.app",
    messagingSenderId: "130588342127",
    appId: "1:130588342127:web:e96424d2e6a6958193da9a",
    measurementId: "G-YYDDMCPJDF"
};
// const firebaseConfig = {
//     apiKey: "AIzaSyAmhDkcRJBIzUkEmzVkQd3PysXlInRtGzY",
//     authDomain: "velofolio-76336.firebaseapp.com",
//     projectId: "velofolio-76336",
//     storageBucket: "velofolio-76336.firebasestorage.app",
//     messagingSenderId: "607750513194",
//     appId: "1:607750513194:web:153c7b17dcf1aba01c9953",
//     measurementId: "G-PB9EK72QJL"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

export { app, auth, db, database, analytics };