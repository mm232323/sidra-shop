import Signup from "@/components/forms/Signup";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const SignupPage: React.FC = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="absolute w-full top-0 h-full">
      <div className="relative overflow-hidden w-full h-[1300px] flex justify-center">
        <div className="relative w-[80%] h-[683px] bg-white/80 flex top-[290px] rounded-[44px] z-[100] container-shadow items-center gap-[20px] p-[12px] max-[740px]:flex-col max-[740px]:h-[900px] max-[515px]:w-full max-[515px]:rounded-none">
          <div className="border-[.6px] border-[#231104] rounded-[44px] side-shadow overflow-hidden w-[510px] h-[665px] max-[740px]:w-19/20 max-[740px]:h-[340px]">
            <Image
              src="/auth/signup1.jpg"
              alt="Signup Image Advertise"
              width={1920}
              height={1280}
              className="h-full min-w-[900px]"
            />
          </div>
          <Signup />
        </div>
        <div className="w-full h-full absolute bg-white/10 backdrop-blur-md overflow-x-hidden" />
        <Image
          src="/auth/auth-bg-img.jpg"
          alt="Signup Page Background"
          width={2000}
          height={2000}
          className="absolute z-[-2] h-full min-h-fit max-[700px]:hidden"
        />
        <Image
          src="/auth/auth-bg-img-mob.jpg"
          alt="Signup Page Background"
          width={2000}
          height={2000}
          className="absolute z-[-2] h-full min-h-fit hidden max-[700px]:block"
        />
      </div>
    </main>
  );
};

export default SignupPage;
