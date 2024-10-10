import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"


function Header() {
  return (
    <div className='flex justify-between p-5 shadow-md'>
        <Image src={'/logo.png'} height={100} width={150}/>
        <Button>Get Started</Button>
    </div>
  )
}

export default Header