import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyATo17UwT0FhS6Oz3FqvqPdxgeP_9slInw",
    authDomain: "social-pet-app.firebaseapp.com",
    databaseURL: "https://social-pet-app.firebaseio.com",
    projectId: "social-pet-app",
    storageBucket: "social-pet-app.appspot.com",
    messagingSenderId: "391595740350",
    appId: "1:391595740350:web:9df2191b051c3652f4e2ef"
};

firebase.initializeApp(config);