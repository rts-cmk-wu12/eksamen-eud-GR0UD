"use server";

import { z } from "zod";

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "You must enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
});

export async function signUpUser(prevState, formData) {
  if (!formData) return prevState;

  const email = formData.get("email");
  const password = formData.get("password");
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");

  const result = signUpSchema.safeParse({
    email,
    password,
    firstname,
    lastname,
  });

  if (!result.success) {
    const flattened = z.flattenError(result.error);

    const errorStructure = {};

    if (flattened.fieldErrors.email) {
      errorStructure.email = { errors: flattened.fieldErrors.email };
    }

    if (flattened.fieldErrors.password) {
      errorStructure.password = { errors: flattened.fieldErrors.password };
    }

    if (flattened.fieldErrors.firstname) {
      errorStructure.firstname = { errors: flattened.fieldErrors.firstname };
    }

    if (flattened.fieldErrors.lastname) {
      errorStructure.lastname = { errors: flattened.fieldErrors.lastname };
    }

    return {
      success: false,
      error: errorStructure,
      data: { email, password, firstname, lastname },
      errors: flattened.formErrors || [],
    };
  }

  try {
    const res = await fetch("http://localhost:4000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));

      if (res.status === 400 && errorData.message?.includes("email")) {
        return {
          error: { email: { errors: ["Email already exists"] } },
          data: { email, password, firstname, lastname },
        };
      }

      return {
        error: {
          global: { errors: ["Failed to create account. Please try again."] },
        },
        data: { email, password, firstname, lastname },
      };
    }

    const userData = await res.json();

    return {
      success: true,
      message: "Account created successfully!",
      user: userData,
    };
  } catch (error) {
    return {
      error: {
        global: { errors: ["Network error. Please check your connection."] },
      },
      data: { email, password, firstname, lastname },
    };
  }
}
