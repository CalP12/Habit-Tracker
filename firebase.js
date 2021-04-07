import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXGalliOzShG4y_3lJogxJr531hgOsl8M",
    authDomain: "signal-clone-build-dc39a.firebaseapp.com",
    projectId: "signal-clone-build-dc39a",
    storageBucket: "signal-clone-build-dc39a.appspot.com",
    messagingSenderId: "56546739763",
    appId: "1:56546739763:web:7ca4b9f90479132b5d8546"
  };

  let app;

  if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  }
  else 
  {
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db, auth };