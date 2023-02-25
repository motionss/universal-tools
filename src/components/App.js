import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Topbar from "./Topbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Footer from "./Footer";

import { AuthContext } from "./utils/AuthContext";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState } from "react";

function App() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBhTGaWhQGusAdUshhfPD3UnDL5bd8anZ4",
    authDomain: "universal-tools-web.firebaseapp.com",
    projectId: "universal-tools-web",
    storageBucket: "universal-tools-web.appspot.com",
    messagingSenderId: "1009984472508",
    appId: "1:1009984472508:web:9d8b88d9b0910fe51d97b9",
    measurementId: "G-X4BTPEC1TL",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.useDeviceLanguage();
  const user = auth.currentUser;

  // Inicializo el user que se va a usar en el UserContext
  const [firebase, setFirebase] = useState({ auth: auth, user: user });

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-neutral-950 flex flex-col">
      <Router>
        <AuthContext.Provider value={{ firebase, setFirebase }}>
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/user" element={<Login step="email" />} />
            <Route path="/login/pass" element={<Login step="password" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthContext.Provider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
