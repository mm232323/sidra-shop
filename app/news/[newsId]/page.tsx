import BlogCommentsManager from "@/components/news/BlogCommentsManager";
import { GetNews } from "@/util/admin-apis";
import { NewsType } from "@/util/types";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";


export default async function BlogPage({params}) {
  const session = await getServerSession();
  const isAuthed = session?.user !== undefined;
  const news = await GetNews();
  const blog = news.find((item: NewsType) => item._id === params.newsId);
  
  if (!blog) {
    return notFound();
  }

  const date = format(new Date(blog.date), "EEE, MMM dd, yyyy");
  return (
    <main>
      <div className="flex items-center justify-center w-18/20 h-[703px] rounded-[24px] overflow-hidden relative left-1/2 translate-x-[-50%] top-[30px] news-shadow mb-[70px]">
        <Image
          src="/news/blog-bg.png"
          alt="Blog Background"
          width={1330}
          height={707}
          className="min-h-full min-w-[1330px] absolute z-[-200]"
        />
        <Image
          src={`${blog.imgUrl}?pinataGatewayToken=${process.env.Pinate_GATEWAY_Token}`}
          alt="Blog Image"
          width={1330}
          height={707}
          className="h-full min-h-full min-w-auto w-auto white-shadow"
        />
      </div>
      <div
        className="w-18/20 flex justify-between items-center relative left-1/2 translate-x-[-50%]"
        dir="rtl"
      >
        <div className="flex flex-col items-start justify-start gap-[15px]">
          <h1 className="text-[60px] font-bold text-[#231104]">{blog.title}</h1>
          <p className="text-[20px] text-[#231104ab] mb-[15px]">{blog.text}</p>
        </div>
        <h3 className="opacity-75 text-[20px]">{date}</h3>
      </div>
        <BlogCommentsManager blogComments={blog.comments} blogId={blog._id} isAuthed={isAuthed} reactions={blog.reactions} phone={isAuthed ? session?.user?.email as string : ''} />
    </main>
  );
};
