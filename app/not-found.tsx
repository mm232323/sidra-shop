import Image from 'next/image'
import React from 'react'

export default function notfound() {
  return (
    <div className='w-full h-[700px] relative flex justify-center items-center flex-col gap-[30px] top-[50px] mb-[50px]'>
      <Image src='/notfound/beehive.gif' width={500} height={500} alt='notfound gif image' className='rounded-full w-[300px] h-[300px] shadow-xl' />
      <h1 className='text-[100px] text-[#27a5a5] font-black'>404</h1>
      <p className='text-[#0c5a5a] opacity-70 text-[22px] font-[100]'> عذراً هذه الصفحه لا يوجد له اثر في الموقع</p>
    </div>
  )
}
