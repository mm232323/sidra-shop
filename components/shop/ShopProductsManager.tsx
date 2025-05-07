"use client";
import { ProductType } from "@/util/types";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import ProductContainer from "./ProductContainer";
import { AnimatePresence, motion } from "framer-motion";
const ShopProductsManager: React.FC<{ products: ProductType[] }> = ({
  products,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("النوع");
  // const [selectedHoneyType, setSelectedHoneyType] =
    // useState<string>("صنف العسل");
  const handleChangeType = (inpType: string, event: React.ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    if (inpType === "search") {
      setSearchTerm(value);
    } else if (inpType === "type") {
      setSelectedType(value);
    } 
    // else if (inpType === "honeyType") {
    //   setSelectedHoneyType(value);
    // }
  };
  products = products.filter((prod) => prod.name.includes(searchTerm));
  if (selectedType !== "النوع") {
    products = products.filter(
      (prod) =>
        (prod.type == "product" && selectedType === "الاعسال") ||
        (prod.type == "gift" && selectedType == "الهدايا") ||
        (prod.type == "offer" && selectedType == "العروض")
    );
  }
  return (
    <div>
      <div
        className="flex items-center gap-[15px] justify-center w-full relative mb-[50px] border-1 border-black/20 p-[25px] bg-[rgba(255,159,28,.1)]"
        dir="rtl"
      >
        <div className="h-fit w-[45%] relative  max-[600px]:w-[70%]">
          <CiSearch
            className="absolute right-[30px] top-1/2 translate-y-[-50%] opacity-60"
            size={32}
          />
          <input
            dir="rtl"
            type="text"
            className="bg-white/65 border-1 border-[#45230A]/60 rounded-full pr-[70px] h-[75px] w-full focus:outline-none duration-300 focus:border-[#45230a]"
            placeholder="ادخل اسم المنتج"
            onChange={(event) => handleChangeType("search", event)}
          />
        </div>
        <select
          className="w-[18%] bg-white/65 border-1 border-[#45230A]/60 rounded-full pr-[20px] h-[75px] focus:outline-none duration-300 max-[600px]:w-3/10"
          onChange={(event) => handleChangeType("type", event)}
        >
          <option className="rounded-[20px] text-[#231104] hover:bg-[#231104] hover:text-white">
            النوع
          </option>
          <option className="rounded-[20px] text-[#231104] hover:bg-[#231104] hover:text-white">
            الاعسال
          </option>
          <option className="rounded-[20px] text-[#231104] hover:bg-[#231104] hover:text-white">
            العروض
          </option>
          <option className="rounded-[20px] text-[#231104] hover:bg-[#231104] hover:text-white">
            الهدايا
          </option>
        </select>
        {/* <select
          className={`w-[18%] bg-white/65 border-1 border-[#45230A]/60 rounded-full pr-[20px] h-[75px] focus:outline-none duration-300 ${
            selectedType !== "الاعسال" ? "opacity-50" : ""
          }`}
          disabled={selectedType !== "الاعسال"}
          onChange={(event) => handleChangeType("honeyType", event)}
        >
          <option className="rounded-[20px] text-[#231104] hover:bg-[#231104] hover:text-white">
            صنف العسل
          </option>
          <option className="rounded-[20px] text-[#231104] hover:bg-[#231104] hover:text-white">
            مزارع
          </option>
          <option className="rounded-[20px] text-[#231104] hover:bg-[#231104] hover:text-white">
            جبلي
          </option>
          <option className="rounded-[20px] text-[#231104] hover:bg-[#231104] hover:text-white">
            خلاطات علاجية
          </option>
        </select> */}
      </div>
      <div className="grid grid-cols-3 gap-x-[150px] gap-y-[40px] relative w-18/20 h-fit left-1/2 translate-x-[-50%] max-[1160px]:gap-x-[90px] max-[1050px]:grid-cols-2 max-[700px]:flex max-[700px]:flex-col max-[700px]:items-center">
        <AnimatePresence>
          {products.length == 0 ? (
            <motion.p
              className="absolute opacity-70 left-1/2 translate-x-[-50%]"
              variants={{
                show: { opacity: 0.6, y: 0 },
                hide: { opacity: 0, y: 20 },
              }}
              initial="hide"
              animate="show"
              exit="hide"
            >
              لا توجد منتجات
            </motion.p>
          ) : (
            <AnimatePresence mode="wait">

              {products.map((product: ProductType, idx: number) => (
                <ProductContainer key={idx} product={product} />
              ))}
            </AnimatePresence>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShopProductsManager;
