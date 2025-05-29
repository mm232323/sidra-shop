"use client";
import { login } from "@/actions/auth-actions";
import { Flex, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { SignupFormData } from "@/util/types";
import { redirect } from "next/navigation";
const Login: React.FC = () => {
  const [state, action] = React.useActionState(login, []);
  const { data: session } = useSession();
  if (session?.user !== undefined) redirect("/dashboard");

  useEffect(() => {
    if ((state as string[]).includes("done")) {
      const data = state[1] as SignupFormData;
      signIn("credentials", {
        phone: data.phone,
        password: data.password,
        redirect: false,
      });
    }
    const timer = setTimeout(() => {
      if ((state as string[]).includes("done")) {
        redirect("/dashboard");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <Flex
      dir="rtl"
      direction="column"
      gap="md"
      className="w-[550px] ml-[25px] max-[740px]:w-19/20"
    >
      <h1 className="font-medium text-[48px] max-[740px]:pr-[13px] max-[600px]:text-[42px]">
        تسجيل دخول
      </h1>
      <p className="text-[18px] fonto-light text-[#231104] opacity-60 w-[342px] max-[740px]:pr-[13px] max-[740px]:text-[15px] max-[400px]:text-[13px] max-[400px]:w-[280px]">
        سجل دخولك إلى حسابك على &quot;سدرة&quot; واستمتع بتجربة تسوق سلسة مع
        أفضل العروض على منتجات الأعسال الطبيعية!
      </p>
      <form
        className="flex flex-col gap-4 justify-center max-[600px]:items-center max-[600px]:w-full"
        action={action}
      >
        <TextInput
          error={(state as string[])?.includes("phone")}
          name="phone"
          size="lg"
          radius="md"
          placeholder="رقم الهاتف"
          defaultValue={0}
          inputMode="numeric"
          className="max-[600px]:w-19/20"
        />
        <PasswordInput
          error={
            (state as string[])?.includes("password")
              ? "البيانات المدخله خاطئه"
              : ""
          }
          name="password"
          size="lg"
          radius="md"
          placeholder="كلمة المرور"
          className="max-[600px]:w-19/20"
        />
        <button className="w-full rounded-[15px] bg-[#FF9500] h-[55px] cursor-pointer hover:bg-[#ff9500ce] duration-300 border-[rgba(35,17,4,39%)] border-[.5px] max-[600px]:w-19/20">
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
