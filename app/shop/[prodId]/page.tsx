import Comments from "@/components/shop/Comments";
import PricingCart from "@/components/shop/PricingCart";
import { GetProducts } from "@/util/admin-apis";
import { GetUser } from "@/util/auth-apis";
import { ProductType, userData } from "@/util/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
interface ProductPageProps {
  params: Promise<{
    prodId: string;
  }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const products: ProductType[] = await GetProducts();
  const product = products.find(prod => prod._id == resolvedParams.prodId);
  
  if (!product) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#231104] mb-4">Product Not Found</h1>
          <p className="text-[rgba(35,17,4,.6)]">The requested product could not be found.</p>
        </div>
      </main>
    );
  }

  const session = await getServerSession();
  let user = null;
  if (session?.user) {
    user = (await GetUser(session?.user?.email as string, true)) as userData;
  }
  const imgUrl = product.imgUrl.replace("cut", "").replace("png", "jpg");
  
  return (
    <main className="">
      <div className="w-full relative flex items-center justify-center gap-[90px] mt-[60px] px-[20px] max-[850px]:flex-col max-[850px]:gap-[40px] max-[850px]:text-center mb-[40px]">
        <div className="w-fit relative">
          <Image
            src={imgUrl}
            alt={`${product.name} - Premium Natural Honey`}
            width={612}
            height={749}
            className="rounded-[32px] product-shadow mb-[20px]"
            priority
          />
          <div className="flex items-center gap-[25px] justify-center">
            <div className="shadow-xl rounded-full relative overflow-hidden">
              <Image
                src={product.imgUrl}
                alt={`${product.name} - Hexagonal product image`}
                width={90}
                height={90}
              />
            </div>
            <div className="shadow-xl rounded-full relative overflow-hidden">
              <Image
                src={product.imgUrl}
                alt={`${product.name} - Hexagonal product image`}
                width={90}
                height={90}
              />
            </div>
            <div className="shadow-xl rounded-full relative overflow-hidden">
              <Image
                src={product.imgUrl}
                alt={`${product.name} - Hexagonal product image`}
                width={90}
                height={90}
              />
            </div>
          </div>
        </div>
        <div dir="rtl" className="relative max-[500px]:flex max-[500px]:flex-col max-[500px]:items-center max-[500px]:justify-center">
          <h1 className="text-[70px] font-extrabold text-[#231104] mb-[14px] max-[500px]:text-[55px]">
            {product.name}
          </h1>
          <p
            dir="rtl"
            className="text-[20px] text-[rgba(35,17,4,.35)] w-[415px] text-justify p-shadow p-stroke max-[850px]:text-center max-[500px]:text-[17px] max-[500px]:w-[320px]"
          >
            {" "}
            صحية وآمنة: مصنوعة من خشب طبيعي خالٍ من المواد الكيميائية، مثالية
            لتناول الطعام دون أي تفاعلات غير مرغوب فيها. أنيقة ومتينة: بتصميمها
            البسيط والمتين، تضيف لمسة دافئة وجميلة إلى أدوات مائدتك.
          </p>
          <div className="flex justify-center items-center w-[160px] h-[58px] rounded-[8px] text-white text-[20px] bg-[#231104] top-[20px] relative max-[850px]:w-full max-[500px]:w-14/20">
            <div className="w-[150px] h-[50px] border-white border-[.7px] border-dashed flex justify-center items-center relative rounded-[8px] max-[850px]:w-[98.5%]">
              الحجم
            </div>
          </div>
          <PricingCart
            product={product}
            userNumber={user !== null ? user.phone : ""}
            isAuthed={user !== null}
            cart={user !== null ? user.cart : []}
          />
        </div>
      </div>
      <Comments
        prodComments={product.comments}
        prodId={resolvedParams.prodId}
        username={user?.name}
      />
    </main>
  );
}
