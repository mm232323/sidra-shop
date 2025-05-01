"use client";
import { CommentType } from "@/util/types";
import { SendComment } from "@/util/user-apis";
import { Button, Modal, Rating } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import CommentContainer from "./CommentContainer";

const Comments: React.FC<{
  prodComments: CommentType[];
  username: string;
  prodId: string;
}> = ({ prodComments, username, prodId }) => {
  const [comment, setComment] = useState<CommentType>({
    title: "",
    comment: "",
    rating: 0,
    username,
    date:''
  });
  const [comments,setComments] = useState<CommentType[]>(prodComments);
  const [opened, { open, close }] = useDisclosure(false);
  const commentsLength = prodComments.length
  let averageRate = 0;
  for (let i = 0; i < commentsLength; i++) {
    averageRate += prodComments[i].rating;
  }
  averageRate /= commentsLength
  const handleComment = () => {
    if (!comment.title || !comment.comment) {
      alert("يرجى ملء جميع الحقول");
      return;
    }
    SendComment(prodId, { ...comment, username });
    close();
    setComments(prevComments => [...prevComments,comment])
  };
  return (
    <>
      <Modal opened={opened} onClose={close} dir="rtl" centered size="lg">
        <h1 className="text-[30px] font-bold text-[#231104]">اكتب تعليقك</h1>
        <div className="flex flex-col gap-[20px] mt-[10px]">
          <Rating
            defaultValue={0}
            fractions={2}
            size="xl"
            dir="rtl"
            onChange={(value: number) =>
              setComment((prevComment) => {
                return { ...prevComment, rating: value };
              })
            }
          />
          <input
            type="text"
            placeholder="عنوان التعليق"
            className="w-full h-[60px] rounded-[7px] border-[.5px] border-black/20 duration-300 focus:border-black/50 p-[15px] outline-none focus:outline-none"
            onChange={(e) =>
              setComment((prevComment) => {
                return { ...prevComment, title: e.target.value };
              })
            }
          />
          <textarea
            placeholder="*التعليق"
            className="w-full h-[300px] rounded-[7px] border-[.5px] border-black/20 max-w-full min-w-full max-h-[500px] min-h-[100px] duration-300 focus:border-black/50 p-[15px] outline-none focus:outline-none"
            onChange={(e) =>
              setComment((prevComment) => {
                return { ...prevComment, comment: e.target.value };
              })
            }
          />
          <Button
            fullWidth
            size="md"
            color="#231104"
            variant="outline"
            style={{ fontWeight: 100 }}
            onClick={handleComment}
          >
            إرسال التعليق
          </Button>
        </div>
      </Modal>
      <div dir="rtl" className="relative">
        <div className="flex items-center gap-[35px] relative right-[50px]">
          <Rating defaultValue={averageRate} readOnly dir="rtl" size="xl" />
          <h1 className="text-[32px]">التعليقات</h1>
          <p className="text-[30px]">
            {commentsLength > 1000000
              ? `${commentsLength}M`
              : commentsLength > 1000
              ? `${commentsLength}K`
              : commentsLength}
          </p>
        </div>
        <button
          className="bg-[#ffa01c3a] w-[223px] h-[64px] rounded-[8px] text-[#a26b23d3] cursor-pointer duration-300 hover:bg-[#ffa01c83] relative right-[50px] top-[20px]"
          onClick={open}
        >
          اترك تعليقاً
        </button>
      </div>
      <div className="grid grid-cols-2 gap-[20px] mt-[70px] w-[90%] left-1/2 relative translate-x-[-50%]" dir='rtl'>
        {comments.map((comment,idx) => <CommentContainer key={idx} comment={comment} />)}
      </div>
    </>
  );
};

export default Comments;
