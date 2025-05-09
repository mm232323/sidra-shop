import React from "react";
import Title from "@/components/layout/Title";
import { FaRegNewspaper } from "react-icons/fa6";
import NewsContainer from "@/components/news/NewsContainer";
import { NewsType } from "@/util/types";
import { GetNews } from "@/util/admin-apis";
const NewsPage: React.FC = async () => {
  const news = await GetNews();
  return (
    <main>
      <Title icon={<FaRegNewspaper color="#231104" size={40} />}>
        المنشورات
      </Title>
      <center>
        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[20px] w-[87%] relative top-[20px]">
          {!news.length ? (
            <p className="text-[20px] text-[rgba(0,0,0,.4)] relative left-1/2 w-fit">
              لا يوجد منشورات جديده
            </p>
          ) : (
            news.map((item: NewsType) => <NewsContainer key={item._id} news={item} />)
          )}          
        </div>
      </center>
    </main>
  );
};

export default NewsPage;
