import { Typography, Alert, Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePayloadData from "./datacars";
import axios from "axios";

function DesCard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [copied, setCopied] = useState(false);
  const [item, setItem] = useState(null);
  const [apiData, setApiData] = useState(null);
  const payloadData = usePayloadData();

  useEffect(() => {
    const selectedItem = payloadData.find((item) => item.id === parseInt(id));
    setItem(selectedItem);
  }, [id, payloadData]);

  useEffect(() => {
    const fetchApiData = async () => {
      if (item) {
        try {
          const response = await axios.get(`${item.url_api}`);
          setApiData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchApiData();
  }, [item]);

  const handleCopyClick = () => {
    if (item) {
      const textToCopy = item.url_api;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="container my-10 mx-auto px-4 sm:px-6 lg:px-8">
      {item && (
        <>
          <Typography variant="h1" className="text-4xl sm:text-5xl lg:text-5xl">
            {item.title}
          </Typography>
          <Typography className="my-5 text-lg">{item.description}</Typography>
          <div className="flex flex-col gap-2 my-5 w-full sm:w-auto">
            <span className="text-base">Copy this API URL to use:</span>
            <Alert variant="ghost" className="text-base">
              <span>{item.url_api}</span>
            </Alert>
            <Button onClick={handleCopyClick} className="text-base">
              {copied ? "Copied!" : "Copy URL"}
            </Button>
          </div>
          <div
            className="container bg-gray-900 text-orange-500 my-10 mx-auto px-4 sm:px-6 lg:px-8"
            style={{ overflow: "auto" }}
          >
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}

export default DesCard;
