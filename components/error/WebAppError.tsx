import React from 'react'
import logo from "@/public/images/logo.png"
import Image from 'next/image'
function WebAppError() {
  return (
    <main className='flex flex-col gap-y-10 items-center justify-center min-h-screen'>
        <Image alt ="logo" width={100} src={logo}></Image>
      <h2>
        TERABOT IS NOT AVAILABLE OUTSIDE OF THE TELEGRAM
      </h2>
    </main>
  )
}

export default WebAppError
