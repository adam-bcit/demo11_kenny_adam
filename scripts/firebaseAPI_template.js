//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyCbL5XLgexP4IU7nTOn87QMQPU9ODUnxTU",
    authDomain: "fir-7-1800.firebaseapp.com",
    projectId: "fir-7-1800",
    storageBucket: "fir-7-1800.firebasestorage.app",
    messagingSenderId: "287341543883",
    appId: "1:287341543883:web:371a63a0ae6c12734ef64e",
    measurementId: "G-8TMHQYPNHL"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
