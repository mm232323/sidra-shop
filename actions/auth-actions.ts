"use server";

import { CheckExist, GetUser, SetUser, UpdateUser } from "@/util/auth-apis";
import { SignupFormData, updateFormData } from "@/util/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function signup(state: unknown, event: FormData) {
    const data = Object.fromEntries(
        Array.from(event.entries()).filter(([key]) =>
            ["name", "phone", "password"].includes(key)
        )
    ) as unknown as SignupFormData;
    const errors = [];
    if (data.name.length < 3) {
        errors.push("name");
    }
    if (data.phone.length !== 11 || Number.isNaN((+data.phone))) {
        errors.push("phone");
    }
    if (data.password.length < 8 || data.password.length > 16) {
        errors.push("password");
    }
    if (errors.length > 0) return errors;

    const isExit = await CheckExist(data.phone);
    if (isExit) return ["exist"];
    await SetUser(data);
    redirect("/login");
}

export async function login(state: unknown, event: FormData) {
    const data = Object.fromEntries(
        Array.from(event.entries()).filter(([key]) =>
            ["phone", "password"].includes(key)
        )
    ) as unknown as SignupFormData;
    const user = await GetUser(data.phone, false, data.password);
    if (user.status == 404) return ["phone", "password"];
    return ["done", data];
}

export async function update(state: unknown, event: FormData) {
    const session = await getServerSession()!
    const user = await GetUser(session?.user?.email as string, true)
    const data = Object.fromEntries(
        Array.from(event.entries()).filter(([key]) =>
            ["phone", "name", "address"].includes(key)
        )
    ) as unknown as updateFormData;
    const errors = []
    if (data.phone.length < 11 || Number.isNaN((+data.phone))) errors.push('phone')
    if (data.name.length < 3) errors.push('name')
    if (errors.length > 0) return errors
    await UpdateUser(user.userId, data.name, data.phone, data.address)
    return ['done']
}
