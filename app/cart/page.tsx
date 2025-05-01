import CartProdContainer from "@/components/cart/CartProdContainer";
import PaymentInfoActions from "@/components/cart/PaymentInfoActions";
import Title from "@/components/layout/Title";
import { GetProduct } from "@/util/admin-apis";
import { GetUser } from "@/util/auth-apis";
import { Badge } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
const CartPage: React.FC = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");
  const user = await GetUser(session.user.email as string, true);
  const cart = user.cart;
  let prodsSum = 0;
  for (let i = 0; i < cart.length; i++) {
    const extractedId = cart[i].split("&");
    const product = await GetProduct(extractedId[0]);
    const weight = extractedId[1].split("=")[1];
    const weightIdx = product.weight.indexOf(weight);
    const quant = +extractedId[2].split("=")[1];
    const finalPrice = +product.price[weightIdx] * quant;
    prodsSum += finalPrice;
  }
  return (
    <main>
      <Title icon={<FaCartShopping size={25} />}>السله</Title>
      <div className="w-[95%] flex gap-[20px] left-1/2 relative translate-x-[-50%]">
        <div className="relative w-[66.9106881406%]">
          <div
            className="w-full h-[85px] bg-[rgba(202,140,23,.15)] border-[.5px] border-[rgba(0,0,0,.65)] rounded-[20px] flex justify-around items-center mb-[30px]"
            dir="rtl"
          >
            <Badge
              color="rgba(230,14,14,.11)"
              size="xl"
              radius="md"
              style={{ color: "black", fontWeight: "lighter" }}
            >
              المنتج
            </Badge>
            <Badge
              color="rgba(230,14,14,.11)"
              size="xl"
              radius="md"
              style={{ color: "black", fontWeight: "lighter" }}
            >
              الاسم
            </Badge>
            <Badge
              color="rgba(230,14,14,.11)"
              size="xl"
              radius="md"
              style={{ color: "black", fontWeight: "lighter" }}
            >
              الحجم
            </Badge>
            <Badge
              color="rgba(230,14,14,.11)"
              size="xl"
              radius="md"
              style={{ color: "black", fontWeight: "lighter" }}
            >
              الكمية
            </Badge>
            <Badge
              color="rgba(230,14,14,.11)"
              size="xl"
              radius="md"
              style={{ color: "black", fontWeight: "lighter" }}
            >
              السعر
            </Badge>
          </div>
          <div
            className="w-full h-[600px] relative flex flex-col justify-center items-center gap-[30px] overflow-y-scroll"
          >
            <AnimatePresence mode="wait">
              {cart.length == 0 ? (
                <p
                className="text-[20px] opacity-70"
                >
                  لا توجد منتجات في السله
                </p>
              ) : (
                cart.map((prod: string) => (
                  <CartProdContainer
                    key={prod}
                    prodId={prod}
                    phone={user.phone}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
        <PaymentInfoActions prodsSum={prodsSum} phone={user.phone} />
      </div>
    </main>
  );
};

export default CartPage;
