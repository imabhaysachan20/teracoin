
import { Suspense } from 'react';
import TelegramWebApp from '../components/telegramwebapp';
import Loading from './loading';


const Home = () => {
  return (
    <div>
      <Suspense fallback = {<Loading/>}>
      <TelegramWebApp />
      </Suspense>
    </div>
  );
};

export default Home;
