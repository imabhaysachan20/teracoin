"use client"

import Script from "next/script";
import { useEffect, useState } from "react";
import WebAppError from "./error/WebAppError";
import Loading from "./loading";
function Telegramwebapp() {
  const [isTele, setIsTele] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof Telegram !== "undefined" && Telegram.WebApp) {
      const initData = Telegram.WebApp.initData;
      alert("Init Data: " + initData);

      if (initData) {
        setIsTele(true);
        try {
          const decodedData = decodeURIComponent(initData);
          alert("Decoded Data: " + decodedData);

          // Parse the query string
          const userData = parseQueryString(decodedData);
          const user = JSON.parse(userData.user); // Parse the user JSON
          const userId = user.id; // Extract user ID

          if (userId) {
            setId(userId.toString());
            alert("User ID: " + userId);
          } else {
            alert("User ID not found in initData");
            setIsTele(false);
          }
        } catch (error) {
          alert("Failed to decode or parse user data: " + error);
          setIsTele(false);
        }
      } else {
        alert("Init data is not available.");
        setIsTele(false);
      }
    } else {
      alert("Telegram Web App is not available.");
    }
    setLoading(false);
  }, []);

  const parseQueryString = (queryString: string): Record<string, string> => {
    return queryString.split('&').reduce((acc, pair) => {
      const [key, value] = pair.split('=');
      acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
      return acc;
    }, {} as Record<string, string>);
  };

  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive"></Script>
      {loading && <Loading></Loading>}
      {!loading && isTele && <div>Welcome {id}!</div>}
      {!loading && !isTele && <WebAppError />}
    </>
  );
}

export default Telegramwebapp;
