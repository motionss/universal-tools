import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useSearchParams,
  Navigate,
} from "react-router-dom";

import NotFound from "./components/NotFound";
import Topbar from "./components/Topbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Categories from "./components/Categories";
import Footer from "./components/Footer";

import { AuthContext } from "./components/utils/AuthContext";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import Catalogue from "./components/Catalogue";

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
    <div className="w-full overflow-x-hidden min-h-screen bg-neutral-950 flex flex-col scroll-smooth">
      <Router>
        <AuthContext.Provider value={{ firebase, setFirebase }}>
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/user" element={<Login step="email" />} />
            <Route path="login" element={<RouteWithParams params={["p"]} />}>
              <Route path="pass" element={<Login step="password" />} />
              <Route path="forgot" element={<ForgotPassword />} />
            </Route>
            <Route path="signup" element={<Signup />} />
            <Route path="categories" element={<Categories />} />
            <Route path="catalogue" element={<Catalogue />} />
            <Route path="ups" element={<NotFound />} />
            <Route path="*" element={<Navigate to="ups" />} />
          </Routes>
        </AuthContext.Provider>
        <Footer />
      </Router>
    </div>
  );
}

function RouteWithParams({ params, all = true }) {
  const [searchParams] = useSearchParams();
  const paramsExist = all
    ? params.every((v) => searchParams.has(v))
    : params.some((v) => searchParams.has(v));
  return paramsExist ? <Outlet /> : <NotFound />;
}

export default App;
