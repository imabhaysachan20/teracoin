"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import WebAppError from "./error/WebAppError";


function telegramwebapp() {
  const [isTele,setisTele] = useState<boolean>(false);
  const [id,setId] = useState<string|null>(null)
  useEffect(() => {
    if (typeof Telegram !== "undefined" && Telegram.WebApp) {

      const initData = Telegram.WebApp.initData;

      if (initData) {
        setisTele(true);
        const decodedData = decodeURIComponent(initData);
        const userData = JSON.parse(decodedData);
        const id = userData.user_id;
        setId(id);

        console.log("User ID:", id);
      } else {
        setisTele(false);
      }
    }
  }, []);
    
  return (<>
    <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive"></Script>
    {isTele && <div>
      Welcome {id}!
      </div>}

      {!isTele && <WebAppError/>}
    
    </>
  )
}

export default telegramwebapp
