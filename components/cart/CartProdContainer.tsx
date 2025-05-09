"use client";
import { GetProduct } from "@/util/admin-apis";
import { ProductType } from "@/util/types";
import { SendToCart } from "@/util/user-apis";
import { Modal, NumberFormatter } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const CartProdContainer: React.FC<{ prodId: string; phone: string }> = ({
  prodId,
  phone,
}) => {
  const [prod, setProd] = useState<null | ProductType>(null);
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    async function getProd() {
      setProd(await GetProduct(prodId));
    }
    getProd();
  }, [prodId]);
  const extractedProps = prodId.split("&");
  const weight = extractedProps[1].split("=")[1];
  const quant = extractedProps[2].split("=")[1];
  const weightIdx = prod?.weight.indexOf(weight);
  const price = prod?.price[weightIdx as number];
  const imgUrl = prod?.imgUrl.replace("cut", "");
  const handleDelete = () => {
    SendToCart(
      false,
      extractedProps[0],
      phone,
      weightIdx as number,
      +quant as number
    );
    close();
  };
  return (
    <motion.div
      key={prodId}
      layout
      variants={{
        show: { opacity: 1, filter: "blur(0)", y: 0 },
        hide: { opacity: 0, filter: "blur(5px)", y: 50 },
      }}
      initial="hide"
      animate="show"
      exit="hide"
      className='w-full relative'
    >
      <Modal
        opened={opened}
        onClose={close}
        title="معلومات المنتج"
        dir="rtl"
        size="xl"
        centered
        transitionProps={{ transition: "fade-right" }}
      >
        <h1 className="text-[28px] font-bold text-[#231104]">{prod?.name}</h1>
        <div
          className="w-full h-fit border-[.7px] border-[#231104] rounded-[10px] p-[15px] flex relative justify-between mt-[20px] mb-[20px]"
          dir="rtl"
        >
          <h2 className="text-[17.5px]">
            {prod?.type == "product"
              ? "العبوه الواحده"
              : prod?.type == "gift"
              ? "الهديه الواحده"
              : "العرض الواحد"}
          </h2>
          <h2 className="font-semibold text-[17.5px]">
            {prod?.price[weightIdx as number]} ج.م
          </h2>
        </div>
        <div
          className="w-full h-fit border-[.7px] border-[#231104] rounded-[10px] p-[15px] flex relative justify-between mt-[20px] mb-[20px]"
          dir="rtl"
        >
          <h2 className="text-[17.5px] text-red-800">{quant} X منتج</h2>
          <h2 className="font-semibold text-[17.5px]">
            {(+(prod?.price[weightIdx as number] as string) as number) *
              (+quant as number)}{" "}
            ج.م
          </h2>
        </div>
        <div className="flex w-full justify-center items-center gap-[15px]">
          <Link href={`/shop/${extractedProps[0]}`} className="w-1/2">
            <button className="w-full h-[60px] rounded-md text-white font-thin border-none bg-yellow-700 duration-300 hover:bg-yellow-600 cursor-pointer">
              الانتقال إلي المنتج
            </button>
          </Link>
          <button
            className="w-1/2 h-[60px] rounded-md text-white font-thin border-none bg-red-700 duration-300 hover:bg-red-600 cursor-pointer"
            onClick={handleDelete}
          >
            الإزاله من السله
          </button>
        </div>
      </Modal>
      <div
        className="w-full h-fit flex items-center justify-around max-[650px]:gap-[80px] max-[650px]:px-[20px] py-[30px] rounded-[20px] bg-[#fbab3c2a] border-1 border-black/35 cursor-pointer hover:drop-shadow-2xl duration-300 hover:bg-[#fbab3c57] max-[650px]:overflow-x-scroll"
        dir="rtl"
        onClick={open}
      >
        <Image
          src={imgUrl ? imgUrl : "/cart/placeholder.gif"}
          alt="Product Img"
          width={200}
          height={300}
          className="rounded-[20px] w-[140px] h-auto"
        />
        <h1 className="text-[25px] text-[#231104] w-[100px] text-center">
          {prod?.name}
        </h1>
        <h1 className="text-[25px] text-[#231104]">
          {+weight > 999 ? `${+weight / 1000} كيلو` : `${weight} جرام`}
        </h1>
        <h1 className="text-[25px] text-[#231104]">
          {prod?.type == "product"
            ? `${quant} عبوه`
            : prod?.type == "gift"
            ? `${quant} هديه`
            : `${quant} عرض`}
        </h1>

        <h1 className="text-[25px] text-[#231104] font-bold">
          <NumberFormatter
            prefix="ج.م"
            value={+(price as string) * +quant}
            thousandSeparator
          />
        </h1>
      </div>
    </motion.div>
  );
};

export default CartProdContainer;
