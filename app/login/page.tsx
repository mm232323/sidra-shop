import Login from '@/components/forms/Login'
import Image from 'next/image'
import React from 'react'

const LoginPage:React.FC = async () => {
  return <main className="absolute top-0 overflow-hidden">
  <div className=" w-[80%] h-[683px] bg-white/80 absolute flex left-1/2 top-[290px] rounded-[44px] translate-x-[-50%] z-[100] container-shadow items-center gap-[20px] p-[12px] max-[740px]:flex-col max-[740px]:h-[900px] max-[515px]:w-full max-[515px]:rounded-none">
  <div className="border-[.6px] border-[#231104] rounded-[44px] side-shadow overflow-hidden w-[510px] h-[665px] max-[740px]:w-19/20 max-[740px]:h-[340px]">
    <Image src='/auth/signup1.jpg' alt='Signup Image Advertise' width={1920} height={1280} className="h-full min-w-[900px]" />
  </div>
  <Login />
  </div>
  <div className="relative overflow-hidden w-full h-full min-w-full flex justify-center items-center">
    <div className="w-full h-full absolute bg-white/10 backdrop-blur-xl" />
    <Image
      src="/auth/auth-bg-img.jpg"
      alt="Signup Page Background"
      width={2000}
      height={2000}
      className="relative z-[-2] min-h-[2000px]"
    />
  </div>
</main>
}

export default LoginPage
