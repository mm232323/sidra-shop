import Link from 'next/link'
import React from 'react'

const Button:React.FC<{children:string,href:string}> = ({children,href}) => {
  return (
    <Link href={href} className='z-[200] relative'>
        <button className='w-[252px] h-[63px] bg-white/20 border-1 border-[#FF9F1C] text-white rounded-[7px] cursor-pointer hover:bg-white/40 duration-[300ms]'>
      {children}
    </button>
    </Link>
  )
}
export default Button