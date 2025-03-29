import { Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Button from "../UI/Button";

const InternalLink: React.FC<{
  desc: string;
  imgUrl: string;
  href: string;
  children:string;
  linkText:string;
}> = ({ desc, imgUrl, href,children,linkText }) => {
  return <div className="relative w-[664px] h-[546px] rounded-[22px] border-1 border-[#45230A] flex flex-col items-center overflow-hidden justify-center drop-shadow-2xl max-[760px]:w-full">
    <div className="absolute w-full h-full z-[-199] bg-gradient-to-t from-black/80 to-black/10 backdrop-blur-[12px]" />
    <Image src={imgUrl} alt={children} width={1000} height={1000} className="absolute w-full h-full z-[-200]" />
    <h1 className="font-semibold text-[86px] max-[870px]:text-[55px]">{children}</h1>
    <p  className="w-[315px] text-[20px] text-center mb-[30px] max-[870px]:text-[15px] max-[370px]:w-[200px] ">{desc}</p>
    <Button href={href}>{linkText}</Button>
  </div>
};

export default InternalLink;
