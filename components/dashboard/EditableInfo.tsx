"use client";
import { update } from "@/actions/auth-actions";
import { userData } from "@/util/types";
import { Button, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
const EditableInfo: React.FC<{ user: userData }> = ({ user }) => {
  const [state,action] = React.useActionState(update,[] as string[])
  const [toggleEdit, setToggleEdit] = useState(false);
  return (
    <div className="w-1/2 h-full border-1 rounded-[33px] border-[rgba(35,17,4,37%)] bg-[#FFE9CA] flex justify-center items-center gap-[15px] flex-col">
      {toggleEdit ? (
        <form className="self-end relative left-[-50px]" dir="rtl" action={action}>
          <h1 className="text-[30px] mb-[10px] mt-[5px]">الأسم</h1>
          <TextInput
            name="name"
            defaultValue={user.name}
            size="md"
            radius="lg"
            error={(state as string[])?.includes('name')}
          />
          <h1 className="text-[30px] mb-[10px] mt-[5px]">رقم الهاتف</h1>
          <TextInput
            name="phone"
            type='text'
            defaultValue={user.phone}
            size="md"
            radius="lg"
            error={(state as string[])?.includes('phone')}
          />
          <h1 className="text-[30px] mb-[10px] mt-[5px]">العنوان</h1>
          <TextInput
            name="address"
            defaultValue={user.address}
            size="md"
            radius="lg"
          />
          <div className="flex gap-[10px] top-0 left-[-250px] absolute">
            <Button variant="filled" color="#231104" type="submit">
              حفظ
            </Button>
            <Button
              variant="outline"
              color="rgba(35,17,4,60%)"
              onClick={() => setToggleEdit(false)}
            >
              إلغاء
            </Button>
          </div>
        </form>
      ) : (
        <>
          <h1 className="text-[36px]">الأسم</h1>
          <div className="flex gap-[10px] items-center" dir="rtl">
            <p className="opacity-70">{user.name}</p>
            <MdEdit
              size={11}
              cursor="pointer"
              onClick={() => setToggleEdit(true)}
            />
          </div>
          <h1 className="text-[36px]">رقم الهاتف</h1>
          <div className="flex gap-[10px] items-center" dir="rtl">
            <p className="opacity-70">{user.phone}</p>
            <MdEdit
              size={11}
              cursor="pointer"
              onClick={() => setToggleEdit(true)}
            />
          </div>
          <h1 className="text-[36px]">العنوان</h1>
          <div className="flex gap-[10px] items-center" dir="rtl">
            <p className="opacity-70">
              {user.address ? user.address : "العنوان غير موجود"}
            </p>
            <MdEdit
              size={11}
              cursor="pointer"
              onClick={() => setToggleEdit(true)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EditableInfo;
