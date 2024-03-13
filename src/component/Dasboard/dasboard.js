import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Nav from "./nav";
function Dashboard({ setAuth }) {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("https://rest-dummy-api.vercel.app/dahboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.getItem("token") },
      });
      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(name);
  return (
    <div>
      <Nav logout={logout} Name={name} />
      <h2>Welcome {name}</h2>
      <button onClick={(e) => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
