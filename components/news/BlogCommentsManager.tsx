"use client";
import { SendReaction, SetBlogComment } from "@/util/user-apis";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import BlogComment from "./BlogComment";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAppContext } from "@/app/context";
import { redirect } from "next/navigation";
const BlogCommentsManager: React.FC<{
  isAuthed: boolean;
  reactions: string[];
  phone?: string;
  blogId: string;
  blogComments: string[];
}> = ({ blogId, reactions, phone, blogComments }) => {
  const {isAuthed} = useAppContext()
    const [opened, { open, close }] = useDisclosure(false);
  const [likes, setLikes] = React.useState<number>(reactions.length);
  const [comment, setComment] = React.useState<string>("");
  const [comments, setComments] = React.useState<string[]>(blogComments);
  const [isLiked, setIsLiked] = React.useState<boolean>(
    isAuthed && reactions.includes(phone as string)
  );
  const handleLike = () => {
    if (isAuthed) {
      if (!isLiked) setLikes((prevLikes) => prevLikes + 1);
      else setLikes((prevLikes) => prevLikes - 1);
      setIsLiked(!isLiked);
      SendReaction(
        blogId,
        phone as string,
        reactions.includes(phone as string)
      );
    } else return;
  };
  const handleComment = () => {
    SetBlogComment(blogId, comment, phone as string);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    const settedComment = `phone=${phone}&comment=${comment}&date=${formattedDate}`;
    setComments((prevComments) => {
      return [...prevComments, settedComment];
    });
  };
  return (
    <>
    <Modal opened={opened} onClose={close} dir="rtl">
      <h1 className="text-red-900 text-[35px] font-bold mb-[10px]">تنبيه هام</h1>
      <p className="text-red-900 opacity-75 text-[18px] font-thin mb-[10px]">يجب عليك تسجيل الدخول لكي تتمكن من كتابة تعليقك</p>
      <div className="flex items-center justify-center w-full gap-[10px]">
        <Button onClick={() => redirect('/login')} fullWidth variant="outline" color='green'>الانتقال لصفحة التسجيل</Button>
        <Button onClick={close} fullWidth variant="outline" color='red'>العودة إلي المنشور</Button>
      </div>
    </Modal>
      <div>
        <div
          className="flex items-center justify-start w-18/20 relative left-1/2 translate-x-[-50%] gap-[30px]"
          dir="rtl"
        >
          <div className="flex items-center justify-between gap-[10px]">
            {isLiked ? (
              <FaHeart
                size={33}
                color="#A91B1B"
                onClick={handleLike}
                cursor="pointer"
              />
            ) : (
              <FaRegHeart
                size={33}
                color="#A91B1B"
                className={!isAuthed ? "opacity-60" : ""}
                cursor="pointer"
                onClick={
                  isAuthed
                    ? handleLike
                    : () => alert("يرجي تسجيل الدخول للتفاعل مع المنشور")
                }
              />
            )}
            <h3 className="opacity-80">{likes}</h3>
          </div>
          <input
            type="text"
            placeholder="اكتب تعليقك هنا"
            className="bg-white/50 focus:outline-none border-[.4px] border-black pr-[10px] w-[516px] h-[60px] rounded-[8px]"
            onChange={(e) => setComment(e.target.value)}
          />
          <AnimatePresence>
            {comment && (
              <motion.button
                className="w-[150px] h-[60px] rounded-[8px] bg-[#231104] text-white cursor-pointer"
                variants={{
                  show: { opacity: 1, filter: "blur(0)", x: 0 },
                  hide: { opacity: 0, filter: "blur(8px)", x: -40 },
                }}
                initial="hide"
                animate="show"
                exit="hide"
                onClick={isAuthed ? handleComment : open}
              >
                ارسل التعليق
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <h1 className="text-[40px] font-semibold text-end pr-[70px] mt-[30px]">
          التعليقات
        </h1>
        <div
          className="grid grid-cols-3 w-18/20 gap-x-[20px] relative left-1/2 translate-x-[-50%] gap-y-[20px] mt-[50px]"
          dir="rtl"
        >
          <AnimatePresence mode="wait">
            {comments.map((comment, idx) => (
              <BlogComment
                key={comment + idx}
                idx={idx}
                comment={comment}
                isUserComment={
                  comment.split("&")[0].split("=")[1] == (phone as string)
                }
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default BlogCommentsManager;
