import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAiu7ApIWegQ2RmKwr5augncAzvpIjEGXE",
    authDomain: "industry4-uoa.firebaseapp.com",
    databaseURL: "https://industry4-uoa.firebaseio.com",
    projectId: "industry4-uoa",
    storageBucket: "industry4-uoa.appspot.com",
    messagingSenderId: "186001650646",
    appId: "1:186001650646:web:ad868ddc3ccb8e214aaa77",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();

export const useLocalUserId = () => {
    return firebaseApp.auth().currentUser?.uid;
};
