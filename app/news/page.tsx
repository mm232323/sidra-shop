import React from "react";
import Title from "@/components/layout/Title";
import { FaRegNewspaper } from "react-icons/fa6";
import NewsContainer from "@/components/news/NewsContainer";
import { NewsType } from "@/util/types";
import { GetNews } from "@/util/admin-apis";
import { Metadata } from "next";
import { generateMetadata } from "@/components/SEO/SEOHead";

export const metadata: Metadata = generateMetadata({
  title: "Honey News & Articles",
  description: "Stay updated with the latest news, articles, and insights about honey, its health benefits, and sustainable beekeeping practices. Discover tips and information about natural honey products.",
  keywords: [
    "honey news",
    "honey articles",
    "honey benefits",
    "beekeeping",
    "natural honey",
    "honey health",
    "honey tips",
    "honey information",
    "honey blog",
    "honey insights",
    "أخبار العسل",
    "مقالات العسل",
    "فوائد العسل",
    "تربية النحل",
    "عسل طبيعي",
    "صحة العسل"
  ],
  url: "/news",
  type: "website",
});

const NewsPage: React.FC = async () => {
  const news = await GetNews();
  return (
    <main>
      <Title icon={<FaRegNewspaper color="#231104" size={40} />}>
        المنشورات
      </Title>
      <center>
        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[20px] w-[87%] relative top-[20px] max-[770px]:grid-cols-1">
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
