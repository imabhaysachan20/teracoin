import Image from "next/image";
import logo from "@/public/images/logo.png"
import User from "./components/user-info"


export default function Home() {
  
  return (
    <main className="flex items-center justify-center h-screen dark:bg-black">
    <Image width={100}  alt="logo" src={logo}></Image>
    <User/>
  
    </main>
  );
}
