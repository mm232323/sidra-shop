"use client";
import { login } from "@/actions/auth-actions";
import { Flex, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react"
import { SignupFormData } from "@/util/types";
import { redirect } from "next/navigation";
const Login: React.FC = () => {
  const [state, action] = React.useActionState(login, []);
  if ((state as string[]).includes('done')) {
    const data = state[1] as SignupFormData;
    signIn("credentials", {
      phone: data.phone,
      password: data.password,
      redirect: false,
    });
    redirect("/dashboard");
  }
  return (
    <Flex dir="rtl" direction="column" gap="md" className="w-[550px] ml-[25px]">
      <h1 className="font-medium text-[48px]">تسجيل دخول</h1>
      <p className="text-[18px] fonto-light text-[#231104] opacity-60 w-[342px]">
        سجل دخولك إلى حسابك على &quot;سدرا&quot; واستمتع بتجربة تسوق سلسة مع
        أفضل العروض على منتجات الأعسال الطبيعية!
      </p>
      <form className="flex flex-col gap-4 justify-center" action={action}>
        <TextInput
          error={(state as string[])?.includes("phone")}
          name="phone"
          size="lg"
          radius="md"
          placeholder="رقم الهاتف"
          defaultValue={0}
        />
        <PasswordInput
          error={(state as string[])?.includes("password") ? "البيانات المدخله خاطئه" : ""}
          name="password"
          size="lg"
          radius="md"
          placeholder="كلمة المرور"
        />
        <button className="w-full rounded-[15px] bg-[#FF9500] h-[55px] cursor-pointer hover:bg-[#ff9500ce] duration-300 border-[rgba(35,17,4,39%)] border-[.5px]">
          تسجيل دخول
        </button>
        <h3>
          ليس لديك حساب؟{" "}
          <Link href="/signup">
            <span className="text-cyan-600">إنشئ حساب جديد</span>
          </Link>
        </h3>
      </form>
    </Flex>
  );
};

export default Login;
