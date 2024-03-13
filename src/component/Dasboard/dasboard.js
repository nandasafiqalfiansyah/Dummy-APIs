import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Dasboard({ setAuth }) {
  const [name,setName] =useState("") 
  
  const getProfile = async () => {
    try {
      const res = await fetch("https://rest-dummy-api.vercel.app/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
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
  
  return (
    <div>
      <h1 className="mt-5">Dashboard</h1>
      <h2>Welcome {name}</h2>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
}

export default Dasboard;
