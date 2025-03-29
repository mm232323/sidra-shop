import Image from 'next/image'
import React from 'react'

const Footer:React.FC = () => {
  return (
        <div className='relative flex items-center justify-around bg-[#ffa01cbd] w-[532px] h-[98px] mt-[50px] rounded-[12px] left-1/2 translate-x-[-50%] mb-[30px] drop-shadow-2xl'>
      <div className='flex gap-[10px]'>
        <Image src="/home/facebook.svg" alt='facebook logo'  width={100} height={100} className='w-[35px] h-[35px]' />
        <Image src="/home/whatsapp.svg" alt='whatsapp logo'  width={100} height={100} className='w-[35px] h-[35px]' />
        <Image src="/home/instagram.svg" alt='instagram logo'  width={100} height={100} className='w-[35px] h-[35px]' />
      </div>
      <h1 className='font-medium text-[32px] text-[#45230A]'>تواصل معنا</h1>
    </div>
  )
}

export default Footer
