import BlogCommentsManager from "@/components/news/BlogCommentsManager";
import { GetNews } from "@/util/admin-apis";
import { NewsType } from "@/util/types";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{
    newsId: string;
  }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const resolvedParams = await params;
  const session = await getServerSession();
  const isAuthed = session?.user !== undefined;
  const news = await GetNews();
  const blog = news.find((item: NewsType) => item._id === resolvedParams.newsId);
  
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
          src={blog.imgUrl}
          alt={`${blog.title} - Blog Image`}
          width={1330}
          height={707}
          className="h-full min-h-full min-w-[1330px] w-auto white-shadow"
          priority
        />
      </div>
      <div
        className="w-18/20 flex justify-between items-center relative left-1/2 translate-x-[-50%] max-[555px]:flex-col max-[555px]:mb-[20px]"
        dir="rtl"
      >
        <div className="flex flex-col items-start justify-start gap-[15px]">
          <h1 className="text-[60px] font-bold text-[#231104] max-[750px]:text-[45px] max-[400px]:text-[35px]">{blog.title}</h1>
          <p className="text-[20px] text-[#231104ab] mb-[15px]">{blog.text}</p>
        </div>
        <h3 className="opacity-75 text-[20px] min-[555px]:self-start">{date}</h3>
      </div>
        <BlogCommentsManager blogComments={blog.comments} blogId={blog._id} isAuthed={isAuthed} reactions={blog.reactions} phone={isAuthed ? session?.user?.email as string : ''} />
    </main>
  );
};
