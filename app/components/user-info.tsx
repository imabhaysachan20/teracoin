"use client"
import { useEffect, useState } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

const Home = () => {
  const [userInfo, setUserInfo] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const loadTelegramScript = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    loadTelegramScript().then(() => {
      const tg = window.Telegram?.WebApp;
      if (tg?.initData) {
        const user = tg.initDataUnsafe.user;
        setUserInfo(user);
      } else {
        console.error("Telegram Web App not initialized");
      }
    });

    // Cleanup the script on component unmount
    return () => {
      const existingScript = document.querySelector('script[src="https://telegram.org/js/telegram-web-app.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div>
      <h1>Telegram Web App</h1>
      {userInfo ? (
        <div>
          <h2>User Info</h2>
          <p>Username: {userInfo.username}</p>
          <p>First Name: {userInfo.first_name}</p>
          <p>Last Name: {userInfo.last_name}</p>
          <p>ID: {userInfo.id}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Home;
