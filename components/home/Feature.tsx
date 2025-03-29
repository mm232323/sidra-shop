import { Flex, GridCol } from "@mantine/core";
import Image from "next/image";
import React from "react";

const Feature: React.FC<{
  type: string;
  title: string;
  desc?: string
  imgUrl?: string
  size: number;
}> = (props) => {
  return (
    <GridCol h={props.type == 'title' ? 107 : 262} span={props.size} style={{padding:20}} className={`border-[1px] border-yellow-900 rounded-[25px] flex mb-[8px] ml-[8px] ${props.type == 'title' ? 'text-[64px] font-extrabold text-[#CC5803] bg-white/33 items-center justify-center': 'bg-gradient-to-l from-[#ffe0aa] to-white/60 gap-[5px] justify-around drop-shadow-lg'}`} dir="rtl">
      {props.type == "title" ? (
        <h1>{props.title}</h1>
      ) : (
        <Flex >
          <div>
            <h1 className="text-[56px] font-bold max-[700px]:text-[40px]">{props.title}</h1>
            <p className="opacity-80 font-light max-[700px]:text-[14px]">{props.desc}</p>
          </div>
          {props.imgUrl && (
            <Image
              src={props.imgUrl}
              alt={props.title}
              width={500}
              height={500}
              className="w-[236px] h-[236px] max-[1000px]:w-[100px] max-[1000px]:h-[100px] self-center max-[530px]:hidden"
            />
          )}
        </Flex>
      )}
    </GridCol>
  );
};

export default Feature;
