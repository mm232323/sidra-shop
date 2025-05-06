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
  if (session.user == undefined) redirect("/login");
  const user = session.user;
  const data: userData = await GetUser(user?.email as string, true);
  return (
    <div className="w-1170/1440 h-[515px] relative left-1/2 translate-x-[-50%] top-[70px] mb-[110px] flex flex-col gap-[30px] max-[850px]:w-19/20 max-[670px]:h-[680px] max-[500px]:w-full">
      <div className="w-full h-[370px] relative max-[670px]:h-[577px]">
        <Flex
          gap="md"
          align="center"
          justify="space-between"
          className="w-full h-full mb-[18px] max-[670px]:flex-col "
        >
          {user?.name && user?.email ? <EditableInfo user={data} /> : null}
          <Flex
            className="w-1/2 h-full max-[670px]:w-19/20  max-[500px]:w-full"
            direction="column"
            gap="md"
            align="center"
            justify="space-between"
          >
            <div
              className="w-full h-1/2 border-1 rounded-[33px] border-[rgba(35,17,4,37%)] bg-[#EBFFCA] flex items-center justify-around max-[670px]:p-[20px] max-[500px]:rounded-none"
              dir="rtl"
            >
              <h1 className="text-[36px] text-[#231104]">عدد الرسائل</h1>
              <p className="opacity-80 text-[#231104]">
                {data.messages?.length} رساله
              </p>
            </div>
            <div className="w-full h-1/2 border-1 rounded-[33px] border-[rgba(35,17,4,37%)] bg-[#FFFFCA] flex flex-col justify-center items-center max-[670px]:p-[20px] max-[500px]:rounded-none">
              <div
                className="flex items-center justify-around w-full"
                dir="rtl"
              >
                <h1 className="text-[36px] text-[#231104]">منتجات السله</h1>
                <p className="opacity-80 text-[#231104]">
                  {data.cart?.length} منتج
                </p>
              </div>
            </div>
          </Flex>
        </Flex>
      </div>
      <Flex gap="md" className="w-full">
        <Link href="/messages" className="w-1/2 relative">
          <button
            className="w-full flex gap-[10px] rounded-full justify-center items-center h-[76px] relative bg-[#9a1414] text-white cursor-pointer hover:bg-[#9a1414be] duration-300 max-[500px]:rounded-bl-none max-[500px]:rounded-tl-none"
            dir="rtl"
            color="#9A1414"
          >
            اذهب إلي الرسائل <MdMessage size={20} />
          </button>
        </Link>
        <Link href="/cart" className="w-1/2 relative">
          <button
            className="w-full flex gap-[10px] rounded-full justify-center items-center h-[76px] relative bg-[#FF9F1C] cursor-pointer hover:bg-[#ffa01cb4] duration-300 max-[500px]:rounded-br-none max-[500px]:rounded-tr-none"
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
