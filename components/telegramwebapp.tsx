"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import WebAppError from "./error/WebAppError";
import Loading from "./loading";
function Telegramwebapp() {
  const [isTele, setIsTele] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof Telegram !== "undefined" && Telegram.WebApp) {
      const initData = Telegram.WebApp.initData;

      if (initData) {
        setIsTele(true);
        try {
          const decodedData = decodeURIComponent(initData);
          const userData = JSON.parse(decodedData);
          const userId = userData.user_id;
          setId(userId);
          console.log("User ID:", userId);
        } catch (error) {
          console.error("Failed to parse user data:", error);
          setIsTele(false);
        }
      } else {
        setIsTele(false);
      }
    }
    setLoading(false);
  }, []);

  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive"></Script>
      {loading &&<Loading></Loading> }
      {!loading && isTele && <div>Welcome {id}!</div>}
      {!loading && !isTele && <WebAppError />}
    </>
  );
}

export default Telegramwebapp;
