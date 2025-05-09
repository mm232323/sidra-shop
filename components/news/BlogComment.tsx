"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GetUser } from "@/util/auth-apis";
import { userData } from "@/util/types";
const BlogComment: React.FC<{ comment: string,idx:number,isUserComment:boolean }> = ({ comment,idx,isUserComment }) => {
  const [user, setUser] = useState<null | userData>(null);
  const extractedComment = comment.split("&");
  const phone = extractedComment[0].split("=")[1];
  useEffect(() => {
    const fetchUser= async () => {
        const user = await GetUser(phone,true)
        setUser(user)
    }
    fetchUser()
  },[phone])
  const commentText = extractedComment[1].split("=")[1];
  const date = extractedComment[2].split("=")[1];
  return (
    <motion.div
      variants={{
        show: { opacity: 1, filter: "blur(0)", y: 0 },
        hide: { opacity: 0, filter: "blur(8px)", y: 40 },
      }}
      initial="hide"
      animate="show"
      exit="hide"
      transition={{delay:idx*0.1}}
      className={`w-full h-[302px] rounded-[15px] border-[1px] border-[#2311049f] ${isUserComment ? 'bg-orange-100' : 'bg-white'} px-[15px]`}
    >
      <div className="flex w-full items-center justify-between mt-[20px]" dir='rtl'>
        <h1 className="text-[18px] font-medium max-[450px]:text-[16px]">{user?.name.slice(0,16)}</h1>
        <h3 className="opacity-65">{date}</h3>
      </div>
      <p className="text-end mt-[20px] opacity-90 max-[450px]:text-[15px]" dir='ltr' >{commentText}</p>
    </motion.div>
  );
};

export default BlogComment;
