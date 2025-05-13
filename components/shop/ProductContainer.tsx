import { ProductType, userData } from "@/util/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiShoppingCart2Line, RiShoppingCartFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SendToCart } from "@/util/user-apis";
import { GetUser } from "@/util/auth-apis";
import { useAppContext } from "@/app/context";
const ProductContainer: React.FC<{ product: ProductType }> = ({ product }) => {
  const {handleCart} = useAppContext()
  const { data: session } = useSession();
  const [user, setUser] = useState<null | userData>(null);
  const ses = session?.user;
  useEffect(() => {
    async function getUser() {
      if (ses) {
        const user = await GetUser(ses?.email as string, true);
        setUser(user);
      }
    }
    getUser();
  }, [ses]);
  const [toggleCart, setToggleCart] = useState(false);
  useEffect(() => {
    if (user) {
      setToggleCart(user.cart.filter(prod => prod.includes(product._id)).length > 0);
    }
  }, [product._id, user]);
  const HandleCart = () => {
    if (!user) {
      return;
    }
    if (toggleCart) {
      const selectProd:string = user?.cart.filter(prod => prod.includes(product._id))[0]
      const weight = selectProd.split("&")[1].split("=")[1]
      const quant = selectProd.split("&")[2].split("=")[1]
      const weightIdx = product.weight.indexOf(weight)
      handleCart('dec',+quant)
        SendToCart(false,product._id,(user as unknown as userData).phone as string,weightIdx,+quant)
    }
    else {
      handleCart('inc')
      SendToCart(
        true,
        product._id.toString(),
        (user as unknown as userData).phone as string,0
      );
    }
    setToggleCart((prevToggle) => !prevToggle);
  };
  return (
    <motion.div
      className="relative w-[290px] h-[502px] flex justify-cent items-center flex-col overflow-hidden duration-[300]"
      variants={{
        show: { opacity: 1, y: 0, filter: "blur(0)" },
        hide: { opacity: 0, y: 20, filter: "blur(6px)" },
      }}
      initial="hide"
      key={product.name}
      animate="show"
      exit="hide"
    >
      <Image
        src="/shop/prodContainer.svg"
        alt="product container"
        width={303}
        height={502}
        loading="eager"
        className="absolute w-full h-full z-[-5]"
      />
      <Link href={`/shop/${product._id.toString()}`}>
        <div className="w-[303px] h-[304px]">
          <Image
            src={product.imgUrl}
            alt={product.name}
            width={967}
            height={971}
            loading='eager'
            className="relative w-full h-full hover:opacity-0 hover:blur-lg duration-[400ms]"
          />
          <Image
            src={product.designUrl}
            alt={product.name}
            width={967}
            height={971}
            className="absolute top-0 max-w-[120%] w-[105%] z-[-2]"
          />
        </div>
      </Link>
      <h1 className="text-white text-[30px] font-bold text-center mt-[15px] mb-[10px]">
        {product.name}
      </h1>
      <h3 dir="rtl" className="text-[27px] text-[#FED780]">
        <span> ج.م </span>
        {product.price[0]}
      </h3>
      {user && (
        <div className="relative flex gap-[20px] top-[25px]">
          {toggleCart ? (
            <RiShoppingCartFill
              size={27}
              color="white"
              cursor="pointer"
              onClick={HandleCart}
            />
          ) : (
            <RiShoppingCart2Line
              size={27}
              color="white"
              cursor="pointer"
              onClick={HandleCart}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProductContainer;
