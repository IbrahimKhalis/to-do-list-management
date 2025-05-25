"use server"
import { cookies } from "next/headers";

export const getCookie = async (cookieName) => {
    try {
        const cookieStore = await cookies();

        const data = cookieStore.get(cookieName).value;
        return data;
    } catch (error) {
        return null;
    }
};

export async function setCookie(key, value) {
    const cookieStore = await cookies();

    cookieStore.set(key, value,
        {
            httpOnly: true,
            secure: true,
            path: "/",
        }
    );
}

export async function deleteCookie(key) {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}
