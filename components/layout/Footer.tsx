import Image from "next/image";
import React from "react";
import Link from "next/link";
const Footer: React.FC = () => {
  return (
    <div className="relative flex items-center justify-around bg-[#ffa01cbd] w-18/20 h-[98px] mt-[50px] rounded-[12px] left-1/2 translate-x-[-50%] mb-[30px] drop-shadow-2xl max-[640px]:flex-col max-[640px]:py-[18px]">
      <div className="flex gap-[10px]">
        <Link href="https://www.facebook.com/share/yGa3hjPqDLmvBtVF/?mibextid=LQQJ4d">
          <Image
            src="/home/facebook.svg"
            alt="facebook logo"
            width={100}
            height={100}
            className="w-[30px] h-[30px] hover:opacity-70 duration-300 cursor-pointer"
          />
        </Link>
        <Link href="http://wa.me/201092737821">
          <Image
            src="/home/whatsapp.svg"
            alt="whatsapp logo"
            width={100}
            height={100}
            className="w-[30px] h-[30px] hover:opacity-70 duration-300 cursor-pointer"
          />
        </Link>
        <Link href="https://www.instagram.com/sidra_honey1?igsh=ZjNwNWMzeHhvczJp&utm_source=qr">
          <Image
            src="/home/instagram.svg"
            alt="instagram logo"
            width={100}
            height={100}
            className="w-[30px] h-[30px] hover:opacity-70 duration-300 cursor-pointer"
          />
        </Link>
      </div>
      <h1 className="font-medium text-[32px] text-[#45230A]">تواصل معنا</h1>
    </div>
  );
};

export default Footer;
