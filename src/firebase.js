import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/firestore'
import firebase from "firebase/app"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsshm1wh_TeOgFCWbvne5yBfFuid8towI",
    authDomain: "nutrition-app-b08bf.firebaseapp.com",
    databaseURL: "https://nutrition-app-b08bf.firebaseio.com",
    projectId: "nutrition-app-b08bf",
    storageBucket: "nutrition-app-b08bf.appspot.com",
    messagingSenderId: "683922170461",
    appId: "1:683922170461:web:1e87a32227d50f144da3b4"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
