"use client"
import Image from "next/image";
import logo from "@/public/images/logo.png"
function  Loading() {
  
  return (
    <main className="flex items-center justify-center h-screen dark:bg-black">
    <Image width={100}  alt="logo" src={logo}></Image>
    </main>
  )
}

export default Loading
