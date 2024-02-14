import { useState, useEffect } from "react";

const usePayloadData = () => {
  const [payloadData, setPayloadData] = useState([]);

  useEffect(() => {
    fetch("https://dummy-api-umber.vercel.app/users/card")
      .then((response) => response.json())
      .then((data) => {
        setPayloadData(data.payload);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return payloadData;
};

export default usePayloadData;
