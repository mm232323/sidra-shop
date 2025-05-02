"use client";
import { ProductType } from "@/util/types";
import { PostQuantity, SendToCart } from "@/util/user-apis";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbShoppingCartPlus, TbShoppingCartMinus } from "react-icons/tb";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
const PricingCart: React.FC<{
  product: ProductType;
  cart: string[];
  isAuthed: boolean;
  userNumber: string;
}> = ({ product, cart, userNumber, isAuthed }) => {
  const [selectedWeight, setSelectedWeight] = useState<0 | 1 | 2>(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [prodCount, setProdCount] = useState(1);
  const [prodCart,setProdCart] = useState(cart)
  useEffect(() => {
    setIsAddedToCart(
      isAuthed
        ? prodCart.filter((prod) =>
            prod.includes(`${product._id}&w=${product.weight[selectedWeight]}`)
          ).length > 0
        : false
    );
  }, [isAuthed, product, selectedWeight, prodCart]);

  useEffect(() => {
    const selectedProd: string[] | string = prodCart.filter((prod) =>
      prod.includes(`${product._id}&w=${product.weight[selectedWeight]}`)
    )[0];
    if (!selectedProd) return;
    const quant = selectedProd.split("&")[2].split("=")[1];
    setProdCount(+quant);
  }, [prodCart, product._id, product.weight, selectedWeight]);

  const handleClick = () => {
    if (!isAuthed) {
      redirect("/signup");
    }
    if (
      prodCart.filter((prod) =>
        prod.includes(`${product._id}&w=${product.weight[selectedWeight]}`)
      ).length == 0
    ) {
      setProdCount(1)
      SendToCart(true, product._id, userNumber, selectedWeight);
      setIsAddedToCart(true);
    } else {
      SendToCart(false, product._id, userNumber, selectedWeight,prodCount);
      setIsAddedToCart(false);
    }
  };

  const handleQuantity = (state: string) => {
    const data = {
      state,
      prodId: product._id,
      weight: product.weight[selectedWeight],
      quant: prodCount,
      phone: userNumber,
    };
    PostQuantity(data);
    if (state == "inc") {
      setProdCount((prevCount) => prevCount + 1);
    } else {
      if (prodCount == 1) {
        setIsAddedToCart(false)
        setProdCart(prevCart => [...prevCart.filter(prodId => !prodId.includes(`${product._id}&w=${product.weight[selectedWeight]}`))])
      }
      setProdCount((prevCount) => prevCount - 1);
    }
  };
  return (
    <div className="fit-content">
      <div className="flex items-center gap-[18px] mt-[35px]">
        <div
          className={`duration-300  w-[125px] h-[43px] rounded-[16px] text-[17.5px] flex justify-center items-center cursor-pointer ${
            selectedWeight == 0
              ? "bg-[#231104] text-white"
              : "text-[rgba(35,17,4,.53)] bg-[rgba(0,0,0,.17)]"
          }`}
          onClick={() => setSelectedWeight(0)}
        >
          {+product.weight[0] == 1000 ? "1 كيلو" : `${product.weight[0]} جرام`}
        </div>
        {product.weight[1] && (
          <div
            className={` w-[125px] h-[43px] rounded-[16px] duration-300 text-[17.5px] flex justify-center items-center cursor-pointer ${
              selectedWeight == 1
                ? "bg-[#231104] text-white"
                : "text-[rgba(35,17,4,.53)] bg-[rgba(0,0,0,.17)]"
            }`}
            onClick={() => setSelectedWeight(1)}
          >
            {product.weight[1]} جرام
          </div>
        )}
        {product.weight[2] && (
          <div
            className={`w-[125px] h-[43px] duration-300 rounded-[16px] text-[17.5px] flex justify-center items-center cursor-pointer ${
              selectedWeight == 2
                ? "bg-[#231104] text-white"
                : "text-[rgba(35,17,4,.53)] bg-[rgba(0,0,0,.17)]"
            }`}
            onClick={() => setSelectedWeight(2)}
          >
            {product.weight[2]} جرام
          </div>
        )}
      </div>
      <div
        className="w-[447px] h-fit border-[.7px] border-[#231104] rounded-[10px] p-[15px] flex relative justify-between mt-[20px] mb-[20px]"
        dir="rtl"
      >
        <h2 className="text-[17.5px]">
          {product.type == "product"
            ? "العبوه الواحده"
            : product.type == "gift"
            ? "الهديه الواحده"
            : "العرض الواحد"}
        </h2>
        <h2 className="font-semibold text-[17.5px]">
          {product.price[selectedWeight]} ج.م
        </h2>
      </div>
      <AnimatePresence>
        {isAddedToCart && (
          <motion.div
            variants={{
              show: { opacity: 1, filter: "blur(0)", y: 0 },
              hide: { opacity: 0, filter: "blur(5px)", y: -50 },
            }}
            initial="hide"
            animate="show"
            exit="hide"
            className="w-[280px] h-[72px] flex justify-between items-center relative right-1/2 translate-x-[50%] mb-[20px]"
          >
            <button
              className="h-full w-[90px] rounded-[8px] bg-[rgba(162,111,75,.15)] flex justify-center items-center cursor-pointer border-[.3px] border-[#2311043b]"
              onClick={() => handleQuantity("inc")}
            >
              <FaPlus size={15} color="#794119" />
            </button>
            <div className="h-full w-[90px] rounded-[8px] bg-white flex justify-center items-center border-[.3px] border-[#2311043b] font-bold text-[20px] text-[#A26F4B]">
              {prodCount}
            </div>
            <button
              className="h-full w-[90px] rounded-[8px] bg-[rgba(162,111,75,.15)] flex justify-center items-center cursor-pointer border-[.3px] border-[#2311043b]"
              onClick={() => handleQuantity("dec")}
            >
              <FaMinus size={15} color="#794119" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {isAddedToCart ? (
        <button
          className="w-[447px] h-[72px] rounded-[10px] bg-[#2311043b] flex gap-[15px] justify-center items-center cursor-pointer duration-300"
          onClick={handleClick}
        >
          <h1 className="text-[20px]">الإزاله من السله</h1>{" "}
          <TbShoppingCartMinus size={24} />{" "}
        </button>
      ) : (
        <button
          className="w-[447px] h-[72px] rounded-[10px] bg-[#231104] text-white flex gap-[15px] justify-center items-center cursor-pointer cart-but duration-300"
          onClick={handleClick}
        >
          <h1 className="text-[20px]">اضف إلي السله</h1>{" "}
          <TbShoppingCartPlus color="white" size={24} />{" "}
        </button>
      )}
    </div>
  );
};

export default PricingCart;
