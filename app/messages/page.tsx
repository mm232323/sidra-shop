import Title from "@/components/layout/Title";
import { getMessages } from "@/util/user-apis";
import { Alert } from "@mantine/core";
import React, { ReactNode } from "react";
import { LuMessageSquareText } from "react-icons/lu";
import { IoMdInformationCircleOutline, IoIosWarning } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import { BiMessageRoundedDots } from "react-icons/bi";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const MessagesPage: React.FC = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");
  const phone = session?.user.email;
  const mes = await getMessages(phone);
  const messages = mes.map((message: string) => {
    const extractedMes = message.split("&");
    const title = extractedMes[0].split("=")[1];
    const body = extractedMes[1].split("=")[1];
    const type = extractedMes[2].split("=")[1];
    return { title, body, type };
  });
  const infoIco = <IoMdInformationCircleOutline size={20} color="#228be6" />;
  const goodIco = <GrStatusGood size={20} color="#12b785" />;
  const warningIco = <IoIosWarning size={20} color="#fa5252" />;
  const normalIco = <BiMessageRoundedDots size={20} color="#f8af05" />;
  return (
    <main>
      <Title icon={<LuMessageSquareText size={30} color="#231104" />}>
        الرسائل
      </Title>
      <div className="flex flex-col items-center justify-center mt-[30px] gap-[15px] w-16/20 relative left-1/2 translate-x-[-50%]">

      {messages.map(
        (
          message: { title: string; body: string; type: string },
          idx: number
        ) => {
          let selectedColor = "";
          let selectedIcon: ReactNode;
          console.log(message.type);
          switch (message.type) {
            case "good":
              selectedColor = "green";
              selectedIcon = goodIco;
              break;
            case "info":
              selectedColor = "blue";
              selectedIcon = infoIco;
              break;
            case "warning":
              selectedColor = "red";
              selectedIcon = warningIco;
              break;
            default:
              selectedColor = "yellow";
              selectedIcon = normalIco;
              break;
          }

          return (
            <Alert
              key={message.title + message.body + idx}
              color={selectedColor}
              icon={selectedIcon}
              title={message.title}
              dir="rtl"
              variant="outline"
              className="w-full"
            >
              {message.body}
            </Alert>
          );
        }
      )}
      </div>
    </main>
  );
};

export default MessagesPage;
