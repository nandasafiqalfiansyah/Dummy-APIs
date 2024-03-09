import React from "react";
import { Button } from "@material-tailwind/react";
import Navbar from "./nav.js";

const Main = () => {
  const handleLogout = async () => {
    const storedUsername = localStorage.getItem("username");
    try {
      console.log(storedUsername);
      const response = await fetch(
        `https://dummy-api-umber.vercel.app/auth/logout/${storedUsername}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        alert("Logout successful");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const storedUsername = localStorage.getItem("username");
  return (
    <div>
      <Navbar />
      <h1 className="m-2">Welcome {storedUsername}</h1>
      <Button className="m-10" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default Main;
