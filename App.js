import AppNavigation from './src/navigation/AppNavigation';
import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import Login from './src/screens/Login';
import Registro from './src/screens/Register'
import { useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyB2wbIPmp9Bh9xLYdSYoBVgaR69vkVhJaU', 
  authDomain: "prmo-4fc22.firebaseapp.com",
  databaseURL: 'https://prmo-4fc22.firebaseio.com',
  projectId: 'prmo-4fc22', 
  storageBucket: 'prmo-4fc22.appspot.com',
  messagingSenderId: '320119632538',
  appId: '1:320119632538:android:23393c3f377046dd666523',
};

const app = initializeApp(firebaseConfig);

export default function App() {

  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);

  onAuthStateChanged(getAuth(app), (user) => {
    if (user) {
      console.log("User logged in...");
      setUser(user);
    } else {
      console.log("User not logged in...");
      setUser(null);
    }
  });

  if (user) {
    return (
      <AppNavigation></AppNavigation>
    );
  } else {
    return (
      <Login></Login>
      //<Registro></Registro>
    );
  }
}

