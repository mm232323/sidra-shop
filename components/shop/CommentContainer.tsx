import { CommentType } from "@/util/types";
import { Rating } from "@mantine/core";
import React from "react";

const CommentContainer: React.FC<{ comment: CommentType }> = ({ comment }) => {
  console.log(comment);
  return (
    <div className="relative w-full h-fit p-[25px] bg-white rounded-[11px] comment-shadow border-[.5px] border-[#231104ab]">
      <div
        className="w-full px-[8px] flex items-start justify-between"
        dir="rtl"
      >
        <h1>{comment.username}</h1>
        <div className="flex flex-col items-center gap-[6px]">
          <Rating defaultValue={comment.rating} readOnly size="sm" />
          <p className="text-[13px] opacity-60">{comment.date}</p>
        </div>
      </div>
      <h1 className="font-normal text-[36px] text-[#231104]" dir='rtl'>{comment.title}</h1>
      <p className="text-[19px] text-[#231104] opacity-85" dir='rtl'>{comment.comment}</p>
    </div>
  );
};

export default CommentContainer;
