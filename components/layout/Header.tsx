"use client";
import { Flex, Tooltip } from "@mantine/core";
import React, { useState } from "react";
import Image from "next/image";
import { CiShoppingCart, CiMenuBurger } from "react-icons/ci";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import AuthActionLinks from "./AuthActionLinks";
import { usePathname } from "next/navigation";
import { userData } from "@/util/types";
import { BiMessageSquareDots } from "react-icons/bi";
const Header: React.FC<{ isAuthenticated: boolean,user?:userData }> = ({
  isAuthenticated,
  user
}) => {
  const path = usePathname();
  const theme = ["/", "/login", "/signup"].includes(path) ? "dark" : "light";
  const [navBar, setNavBar] = useState(false);
  const titleStyles = "text-[19px] font-thin";
  return (
    <div
      className={`w-full h-fit relative pt-[15px] z-[1000] ${
        theme == "dark" ? "text-white" : ""
      }`}
    >
      <Flex align="center" gap="xl" justify="space-around">
        <Flex gap="md">
          <CiMenuBurger
            size={26}
            className="hidden max-[930px]:block cursor-pointer"
            onClick={() => setNavBar(true)}
          />
          <AnimatePresence>
            {navBar && (
              <motion.div>
                <Flex>
                  <div
                    className={`fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm ${
                      navBar ? "block" : "hidden"
                    }`}
                    onClick={() => setNavBar(false)}
                  ></div>
                  <div
                    dir="rtl"
                    className={`fixed top-0 right-0 w-[300px] h-screen bg-[#FFF2E0] p-[20px] flex gap-[30px] flex-col border-l-1 border-l-[#231104] text-[#231104] z-[2000] ${
                      navBar ? "block" : "hidden"
                    }`}
                    onClick={() => setNavBar(false)}
                  >
                    <h1 className="text-[35px] font-bold">القائمة</h1>
                    <Link href="/shop">
                      <h1
                        className={`${titleStyles} cursor-pointer hover:bg-black/10 w-full h-fit p-[10px] duration-300 rounded-[6px]`}
                      >
                        السوق
                      </h1>
                    </Link>
                    <Link href="/news">
                      <h1
                        className={`${titleStyles} cursor-pointer hover:bg-black/10 w-full h-fit p-[10px] duration-300 rounded-[6px]`}
                      >
                        المنشورات
                      </h1>
                    </Link>
                    <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                      <h1
                        className={`${titleStyles} w-full h-fit p-[10px] duration-300 rounded-[6px] ${
                          !isAuthenticated
                            ? "opacity-50 cursor-default"
                            : "cursor-pointer hover:bg-black/10"
                        }`}
                      >
                        المستخدم
                      </h1>
                    </Link>
                    <Link href={isAuthenticated ? "/messages" : "/login"}>
                      <h1
                        className={`${titleStyles} w-full h-fit p-[10px] duration-300 rounded-[6px] ${
                          !isAuthenticated
                            ? "opacity-50 cursor-default"
                            : "cursor-pointer hover:bg-black/10"
                        }`}
                      >
                        الرسائل
                      </h1>
                    </Link>
                    <AuthActionLinks
                      isAuthenticated={isAuthenticated}
                      theme={theme}
                      device="mobile"
                    />
                  </div>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
          <AuthActionLinks
            isAuthenticated={isAuthenticated}
            theme={theme}
            device="computer"
          />
          <Link href={isAuthenticated ?"/cart": '/login'}>
          <Tooltip label={user ? `${user?.cart.length} منتج` : ''}>
            <CiShoppingCart
              size={23}
              className={!isAuthenticated ? "opacity-60" : ""}
            />
          </Tooltip>
          </Link>
          <Link href={isAuthenticated ?"/messages": '/login'}>
          <Tooltip label={user ? `${user?.messages.length} رساله` : ''}>
            <BiMessageSquareDots
              size={23}
              className={!isAuthenticated ? "opacity-60" : ""}
            />
          </Tooltip>
          </Link>
        </Flex>
        <Link href="/">
          <Image
            src={theme == "light" ? "/logo.svg" : "/whiteLogo.svg"}
            alt="Sidra Logo"
            width={110.98}
            height={110.98}
            className="max-[700px]:w-[90px] max-[700px]:h-[90px]"
          />
        </Link>
        <div
          dir="rtl"
          style={theme == "dark" ? { color: "white" } : {}}
          className="max-[930px]:hidden flex gap-[15px] items-center"
        >
          <Link href="/shop">
            <h1 className={titleStyles} style={{ cursor: "pointer" }}>
              السوق
            </h1>
          </Link>
          <Link href="/news">
            <h1 className={titleStyles} style={{ cursor: "pointer" }}>
              المنشورات
            </h1>
          </Link>
          <Link href={isAuthenticated ? "/dashboard" : "/login"}>
            <h1
              className={`${titleStyles} ${
                !isAuthenticated
                  ? "opacity-50 cursor-default"
                  : "cursor-pointer"
              }`}
            >
              المستخدم
            </h1>
          </Link>
          <Link href={isAuthenticated ? "/messages" : "/login"}>
            <h1
              className={`${titleStyles} ${
                !isAuthenticated
                  ? "opacity-50 cursor-default"
                  : "cursor-pointer"
              }`}
            >
              الرسائل
            </h1>
          </Link>
        </div>
      </Flex>
    </div>
  );
};

export default Header;
