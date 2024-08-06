import "./index.css";
import NavbarDefault from "./component/Navbar/Nav";
import FooterWithLogo from "./component/Footer/footer";
import Home from "./component/Home";
import Status404 from "./component/404/404";
import SignCard from "./component/login/signin";
import LoginCard from "./component/login/login";
import Dasboard from "./component/Dasboard/dasboard";
import Descard from "./component/card/descard";
import ScrollTo from "./component/scrollTop/ScrollTo";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
toast.configure();

function App() {
  const checkAuthenticated = async () => {
    const res = await fetch("https://rest-dummy-api.vercel.app/user/verify", {
      method: "POST",
      headers: { jwt_token: localStorage.getItem("token") },
    });
    const parseRes = await res.json();
    parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <ScrollTo />
      <NavbarDefault IsAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/descard" element={<Descard />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginCard setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          exact
          path="/signin"
          element={
            !isAuthenticated ? (
              <SignCard setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          exact
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dasboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Status404 to="/" />} />
      </Routes>
      <FooterWithLogo />
    </Router>
  );
}

export default App;
