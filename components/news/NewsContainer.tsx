import { NewsType } from "@/util/types";
import Image from "next/image";
import React from "react";
import { FaCommentAlt } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { format } from "date-fns";
import { AiOutlineEnter } from "react-icons/ai";
import Link from "next/link";

const NewsContainer: React.FC<{ news: NewsType }> = ({ news }) => {
  const date = format(new Date(news.date), "EEE, MMMM  dd, yyyy");

  return (
    <div className="flex items-center justify-between w-full h-fit bg-white border-[.6px] border-[#231104] rounded-[10px] pr-[20px] overflow-hidden relative news-shadow">
      <div className="w-1/2 h-full rounded-bl-[10px] rounded-tl-[10px] overflow-x-hidden flex justify-center items-center news-img-shadow">
        <Image
          src={`${news.imgUrl}?pinataGatewayToken=${process.env.Pinate_GATEWAY_Token}`}
          alt="News Image"
          width={700}
          height={700}
          className="w-auto h-[500px] min-w-auto max-w-[500px] min-h-[500px]"
        />
      </div>
      <div className="flex flex-col items-end justify-start gap-[10px] h-[500px] width-[70%] pl-[10px] relative">
        <p className="text-[15px] text-[rgba(0,0,0,.4)] font-[400] mt-[10px]">{date}</p>
        <h1 className="text-[32px] font-[600] m-0 text-[#45230a]">
          {news.title.slice(0, 20)}
        </h1>
        <p className="text-[18px] font-[400] m-0 text-[#45230ab4] text-end w-[300px]">
          {news.text.slice(0, 300)}
        </p>
        <div className="flex items-center justify-between w-[80%] absolute bottom-[30px] right-0">
          <div className="flex items-center justify-center gap-[4px]">
            <MdOutlineFavorite size={19} color="#231104" />
            <p style={{ marginRight: 10 }}>{news.reactions.length}</p>
            <FaCommentAlt size={17} color="#231104" />
            <p>{news.comments.length}</p>
          </div>
          <Link href={`/news/${news._id}`} className="decoration-0">
          <div className="cursor-pointer opacity-65 hover:opacity-100 duration-300 flex items-center justify-center gap-[10px]">
            <AiOutlineEnter size={20} color='#231104' className="scale-x-[-1]" />
            <p>إقرأ المزيد</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsContainer;
