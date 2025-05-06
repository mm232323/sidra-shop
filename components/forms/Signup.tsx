"use client";
import { signup } from "@/actions/auth-actions";
import { Flex, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Signup: React.FC = () => {
  const [state, action] = React.useActionState(signup, []);
  return (
    <Flex dir="rtl" direction="column" gap="md" className="w-[550px] ml-[25px] max-[740px]:w-19/20">
      <h1 className="font-medium text-[48px] max-[740px]:pr-[13px]">إنشاء حساب</h1>
      <p className="text-[18px] font-light text-[#231104] opacity-60 w-[342px] max-[740px]:pr-[13px] max-[740px]:text-[17px] max-[400px]:text-[15px] max-[400px]:w-[280px]">
        أنشئ حسابك على &quot;سدرة&quot; الآن واستمتع بتجربة تسوق مميزة لاكتشاف
        أفضل منتجات الأعسال الطبيعية بأسعار تنافسية!{" "}
      </p>
      <form className="flex flex-col gap-4 justify-center max-[600px]:items-center max-[600px]:w-full" action={action}>
        <TextInput
          error={(state as string[])?.includes("name") ? "تأكد من ادخال الاسم بشكل صحيح" : ""}
          name="name"
          size="lg"
          radius="md"
          placeholder="الإسم الثلاثي"
          className="max-[600px]:w-19/20"
        />
        <TextInput
          error={
            (state as string[])?.includes("phone")
              ? "تأكد من ادخال رقم الهاتف بشكل صحيح"
              : (state as string[])?.includes("exist")
              ? "يوجد حساب بهذا الرقم حاول مجدداً"
              : ""
          }
          name="phone"
          size="lg"
          radius="md"
          placeholder="رقم الهاتف"
          defaultValue={0}
          maxLength={11}
          minLength={11}
          className="max-[600px]:w-19/20"
        />
        <PasswordInput
          error={
            (state as string[])?.includes("password")
              ? "يجب ان تكون كلمة السر بين 8 إلي 16 حرف فقط"
              : ""
          }
          name="password"
          size="lg"
          radius="md"
          placeholder="كلمة السر (8 - 16 حرف)"
          className="max-[600px]:w-19/20"
        />
        <button className="w-full rounded-[15px] bg-[#FF9500] h-[55px] cursor-pointer hover:bg-[#ff9500ce] duration-300 border-[rgba(35,17,4,39%)] border-[.5px]">
          إنشئ حساب
        </button>
        <h3>
          لديك حساب بالفعل؟{" "}
          <Link href="/login">
            <span className="text-cyan-600">تسجيل دخول</span>
          </Link>
        </h3>
      </form>
    </Flex>
  );
};

export default Signup;
