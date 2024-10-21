"use client"

import Script from "next/script";
import { useEffect, useState } from "react";
import WebAppError from "./error/WebAppError";
import Loading from "./loading";
import axios from "axios";
async function login(userData:Record<string,string>) {
  const {data} = await axios.post("/api/auth",{userData});
  alert(data.status);
  
}

function Telegramwebapp() {
  const [isTele, setIsTele] = useState<boolean>(false);
  const [user, setUser] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof Telegram !== "undefined" && Telegram.WebApp) {
      const initData = Telegram.WebApp.initData;
      

      if (initData) {
        setIsTele(true);
        try {
          const decodedData = decodeURIComponent(initData);

          
          // Parse the query string
          const userData = parseQueryString(decodedData);
          // for (let x in userData) {
          //   if (userData[x].startsWith('{')) {
          //     userData[x] = JSON.parse(userData[x]);
          //   }
          // }
          const user = JSON.parse(userData.user);
          

          if (user) {
            setUser(userData);
           
          } else {
            
            setIsTele(false);
          }
        } catch (error) {
          
          setIsTele(false);
        }
      } else {
        
        setIsTele(false);
      }
    } else {
      alert("Telegram Web App is not available.");
    }
    setLoading(false);


    // mock code here
    // let mockUser = { query_id: "AAGc2rwvAAAAAJzavC_Cna0E", user: '{"id":800905884,"first_name":"Abhay ✔️","last_name":"Sachan","username":"imabhaysachan","language_code":"en","allows_write_to_pm":true}', auth_date: "1729507929", hash: "cd2cc63c5e37ef7cab4aabe9a7f5548093bf9887c125e8483ca09ba97310bd42" }
    // login(mockUser);
    // mockUser = JSON.parse(mockUser.user)
    // setIsTele(true);
    // setUser(mockUser);
    //mock code ends here

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
      {!loading && isTele && <div>Welcome {user.id}!</div>}
      {!loading && !isTele && <WebAppError err_txt="TERACOIN NOT AVAILABLE OUTSIDE TELEGRAM" />}  
    </>
  );
}

export default Telegramwebapp;
