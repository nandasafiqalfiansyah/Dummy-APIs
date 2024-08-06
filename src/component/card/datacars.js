import { useState, useEffect } from "react";

const usePayloadData = () => {
  const [payloadData, setPayloadData] = useState([]);
  useEffect(() => {
    fetch("https://rest-dummy-api.vercel.app/card")
      .then((response) => response.json())
      .then((data) => {
        setPayloadData(data.payload);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  if (!payloadData) {
    return null;
  }
  console.log(payloadData);
  return payloadData;
};

export default usePayloadData;
