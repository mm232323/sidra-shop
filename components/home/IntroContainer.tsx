import { Flex } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Button from "../UI/Button";
import Cursor from "../UI/Cursor";
import { motion } from "framer-motion";
const IntroContainer: React.FC<{
  title: string;
  children: string;
  backgroundUrl: string;
  imgUrl: string;
  id: number;
  HandleSelect: (id: number) => void;
}> = ({ title, children, backgroundUrl, imgUrl, id, HandleSelect }) => {
  return (
    <motion.div
      className=" h-[802px] text-white flex  items-center w-full absolute top-0"
      variants={{
        show: { opacity: 1, filter: "blur(0)" },
        hide: { opacity: 0, filter: "blur(8px)" },
      }}
      initial="hide"
      animate="show"
      exit="hide"
    >
      <Image
        src={backgroundUrl}
        alt="Background Img"
        width={1441}
        height={802}
        className="absolute z-[-100] top-0 h-[747px] w-[1441px] max-w-[1441px] right-[-20px] "
      />
      <Flex align="center" justify="space-around" className="gap-[200px]">
        {/* <Image
          src={imgUrl}
          alt="Img"
          width={372}
          height={372}
          className="w-[230px] h-[200px]"
        /> */}
        <Flex dir="rtl" direction="column" gap="lg"  className="relative top-[25px] pr-[110px] w-screen max-[650px]:items-center max-[650px]:pr-0">
          <h1 className="text-[64px] font-bold max-[600px]:text-[40px] max-[410px]:text-[34px]">{title}</h1>
          <p className="text-[24px] font-normal opacity-80 w-[522px] max-[650px]:text-center max-[550px]:text-[18px] max-[550px]:w-[300px]">
            {children}
          </p>
          <Button href='/shop'>تسوق الأن</Button>
          <Cursor idx={id} onHandleSelect={HandleSelect} />
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default IntroContainer;
