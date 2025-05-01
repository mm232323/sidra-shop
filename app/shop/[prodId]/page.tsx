import Comments from "@/components/shop/Comments";
import PricingCart from "@/components/shop/PricingCart";
import { GetProduct } from "@/util/admin-apis";
import { GetUser } from "@/util/auth-apis";
import { ProductType, userData } from "@/util/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";


export default async function ProductPage({params}) {
  const product: ProductType = await GetProduct(params.prodId);
  const session = await getServerSession();
  let user = null;
  if (session?.user) {
    user = (await GetUser(session?.user?.email as string, true)) as userData;
  }
  const imgUrl = product.imgUrl.replace("cut", "").replace("png", "jpg");
  return (
    <main className="">
      <div className="w-full relative flex items-center justify-center gap-[90px] mt-[60px]">
        <div className="w-fit relative">
          <Image
            src={imgUrl}
            alt="Product Image"
            width={612}
            height={749}
            className="rounded-[32px] product-shadow mb-[20px]"
          />
          <div className="flex items-center gap-[25px] justify-center">
            <div className="shadow-xl rounded-full relative overflow-hidden">
              <Image
                src={product.imgUrl}
                alt="Hexagonal product image"
                width={90}
                height={90}
              />
            </div>
            <div className="shadow-xl rounded-full relative overflow-hidden">
              <Image
                src={product.imgUrl}
                alt="Hexagonal product image"
                width={90}
                height={90}
              />
            </div>
            <div className="shadow-xl rounded-full relative overflow-hidden">
              <Image
                src={product.imgUrl}
                alt="Hexagonal product image"
                width={90}
                height={90}
              />
            </div>
          </div>
        </div>
        <div dir="rtl">
          <h1 className="text-[70px] font-extrabold text-[#231104] mb-[14px]">
            {product.name}
          </h1>
          <p
            dir="rtl"
            className="text-[20px] text-[rgba(35,17,4,.35)] w-[415px] text-justify p-shadow p-stroke"
          >
            {" "}
            صحية وآمنة: مصنوعة من خشب طبيعي خالٍ من المواد الكيميائية، مثالية
            لتناول الطعام دون أي تفاعلات غير مرغوب فيها. أنيقة ومتينة: بتصميمها
            البسيط والمتين، تضيف لمسة دافئة وجميلة إلى أدوات مائدتك.
          </p>
          <div className="flex justify-center items-center w-[160px] h-[58px] rounded-[8px] text-white text-[20px] bg-[#231104] top-[20px] relative">
            <div className="w-[150px] h-[50px] border-white border-[.7px] border-dashed flex justify-center items-center relative rounded-[8px]">
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
        prodId={params.prodId}
        username={user!.name}
      />
    </main>
  );
}
