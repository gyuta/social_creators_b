import firebase from "firebase";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyDcK4Txki2z-M4fa2cdAoAHDCc4lAsXPdU",
    authDomain: "social-creators-b.firebaseapp.com",
    databaseURL: "https://social-creators-b.firebaseio.com",
    projectId: "social-creators-b",
    storageBucket: "social-creators-b.appspot.com",
    messagingSenderId: "165685096689",
    appId: "1:165685096689:web:75fb98a3c87a031c28f950"
};

firebase.initializeApp(config);

export default firebase;