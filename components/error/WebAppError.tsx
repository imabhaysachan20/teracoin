import React from 'react'
import logo from "@/public/images/logo.png"
import Image from 'next/image'
function WebAppError({err_txt}:{err_txt:string}) {
  return (
    <main className='flex flex-col gap-y-10 items-center justify-center min-h-screen'>
        <Image alt ="logo" width={100} src={logo}></Image>
      <h2 className='text-center text-sm'>
        {err_txt}
      </h2>
    </main>
  )
}

export default WebAppError
