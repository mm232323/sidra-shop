import Image from 'next/image'
import React, { ReactNode } from 'react'

const Title:React.FC<{children:string,icon?:ReactNode}> = ({children,icon}) => {
  return (
    <div className='flex items-center justify-center top-[70px] relative mb-[150px] flex-col'>
      <Image src='/layout/title.svg' width={255} height={188} alt='title image' className='absolute z-[-2]'  />
      <h1 className='text-[64px] text-[#231104]'>{children}</h1>
      {icon}
    </div>
  )
}

export default Title
