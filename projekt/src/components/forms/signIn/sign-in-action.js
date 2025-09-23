"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export default async function doTheLoginThing(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const schema = z.object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const validated = schema.safeParse({
    email,
    password,
  });

  if (!validated.success)
    return {
      success: false,
      ...z.treeifyError(validated.error),
    };

  try {
    const formData = new FormData();
    formData.append("email", validated.data.email);
    formData.append("password", validated.data.password);

    const response = await fetch("http://localhost:4000/auth/token", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          errors: ["Email or password is incorrect"],
        };
      }
      throw new Error("Authentication failed");
    }

    const authData = await response.json();

    const cookieStore = await cookies();
    cookieStore.set("token", authData.token, {
      maxAge: 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    cookieStore.set("userId", authData.userId.toString(), {
      maxAge: 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      errors: ["An error occurred. Please try again."],
    };
  }
}
