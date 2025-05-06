"use client";
import React from "react";
import { Button } from "@mantine/core";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
const AuthActionLinks: React.FC<{
  isAuthenticated: boolean;
  theme: string;
  device: string;
}> = ({ isAuthenticated, theme, device }) => {
  const logout = () => {
    signOut({ redirect: false });
    redirect("/signup");
  };
  return (
    <div
      className={
        device == "computer"
          ? "max-[700px]:hidden flex gap-[10px]"
          : "flex flex-col gap-[25px]"
      }
    >
      {isAuthenticated ? (
        <>
          <Button
            variant="outline"
            color={
              device == "computer"
                ? theme == "light"
                  ? "black"
                  : "white"
                : "black"
            }
            onClick={() => logout()}
          >
            تسجيل خروج
          </Button>
          {device == "computer" && (
            <Link href="/dashboard">
              <CiUser size={23} />
            </Link>
          )}
        </>
      ) : (
        <>
          <Link href="/signup">
            <Button
              variant="outline"
              color={
                device == "computer"
                  ? theme == "light"
                    ? "black"
                    : "white"
                  : "black"
              }
            >
              إنشئ حساب
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              color={
                device == "computer"
                  ? theme == "light"
                    ? "black"
                    : "white"
                  : "black"
              }
            >
              تسجيل دخول
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthActionLinks;
