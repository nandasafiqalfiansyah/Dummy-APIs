import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Main from "./main";

function Dasboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await fetch(
          "https://dummy-api-umber.vercel.app/auth/status"
        );
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoginStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Main />
    </div>
  );
}

export default Dasboard;
