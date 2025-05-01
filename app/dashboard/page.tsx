import EditableInfo from "@/components/dashboard/EditableInfo";
import { GetUser } from "@/util/auth-apis";
import { userData } from "@/util/types";
import { Flex } from "@mantine/core";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { MdMessage, MdShoppingCartCheckout } from "react-icons/md";
const Dashboard: React.FC = async () => {
  const session = await getServerSession();
  if (!session) redirect("/login");
  const user = session.user;
  const data: userData = await GetUser(user?.email as string, true);
  return (
    <div className="w-[1170px] h-[782px] relative left-1/2 translate-x-[-50%] top-[70px] mb-[110px] flex flex-col gap-[30px]">
      <div className="w-full h-[782px] relative">
        <Flex
          gap="md"
          align="center"
          justify="space-between"
          className="w-full h-1/2 mb-[18px]"
        >
          {user?.name && user?.email ? <EditableInfo user={data} /> : null}
          <Flex
            className="w-1/2 h-full"
            direction="column"
            gap="md"
            align="center"
            justify="space-between"
          >
            <div
              className="w-full h-1/2 border-1 rounded-[33px] border-[rgba(35,17,4,37%)] bg-[#EBFFCA] flex items-center justify-around"
              dir="rtl"
            >
              <h1 className="text-[36px] text-[#231104]">عدد الرسائل</h1>
              <p className="opacity-80 text-[#231104]">
                {data.messages?.length} رساله
              </p>
            </div>
            <div className="w-full h-1/2 border-1 rounded-[33px] border-[rgba(35,17,4,37%)] bg-[#FFFFCA] flex flex-col justify-center items-center">
              <div
                className="flex items-center justify-around w-full"
                dir="rtl"
              >
                <h1 className="text-[36px] text-[#231104]">منتجات السله</h1>
                <p className="opacity-80 text-[#231104]">
                  {data.cart?.length} منتج
                </p>
              </div>
              <div
                className="flex items-center justify-around w-full"
                dir="rtl"
              >
                <h1 className="text-[36px] text-[#231104] self-end">
                  المنتجات المفضله
                </h1>
                <p className="opacity-80 text-[#231104]">
                  {data.fav?.length} منتج
                </p>
              </div>
            </div>
          </Flex>
        </Flex>
      </div>
      <Flex gap="md" className="w-full">
        <Link href="/fav" className="w-full relative">
          <button
            className="w-full flex gap-[10px] rounded-full justify-center items-center h-[76px] relative bg-[#9a1414] text-white cursor-pointer hover:bg-[#9a1414be] duration-300"
            dir="rtl"
            color="#9A1414"
          >
            اذهب إلي الرسائل <MdMessage size={20} />
          </button>
        </Link>
        <Link href="/cart" className="w-full relative">
          <button
            className="w-full flex gap-[10px] rounded-full justify-center items-center h-[76px] relative bg-[#FF9F1C] cursor-pointer hover:bg-[#ffa01cb4] duration-300"
            dir="rtl"
            color="#FF9F1C"
          >
            اذهب إلي السله <MdShoppingCartCheckout size={20} />
          </button>
        </Link>
      </Flex>
    </div>
  );
};

export default Dashboard;
