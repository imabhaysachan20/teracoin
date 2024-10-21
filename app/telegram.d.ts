// telegram.d.ts
export {};

declare global {
  interface TelegramWebApp {
    initDataUnsafe: {
      user?: {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
      };
    };
    MainButton: {
      setText: (text: string) => void;
      show: () => void;
      hide: () => void;
    };
    ready: () => void;
  }

  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}
