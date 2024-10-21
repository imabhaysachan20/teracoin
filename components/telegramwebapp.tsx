"use client"
import { useEffect, useState } from 'react';

const TelegramWebApp = () => {
  const [isTelegram, setIsTelegram] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      setIsTelegram(true);

      // Access user info
      setUsername(tg.initDataUnsafe?.user?.username || 'Guest');

      // Setup the main button
      tg.MainButton.setText('Click me');
      tg.MainButton.show();
    } else {
      console.log('Telegram SDK not available');
    }
  }, []);

  const onButtonClick = () => {
    if (isTelegram && window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.MainButton.setText('Clicked');
    }
  };

  return (
    <div>
      <h1>Welcome, {username}</h1>
      {isTelegram ? (
        <button onClick={onButtonClick}>Click the Telegram Button</button>
      ) : (
        <p>This app is only available inside Telegram WebApp</p>
      )}
    </div>
  );
};

export default TelegramWebApp;
