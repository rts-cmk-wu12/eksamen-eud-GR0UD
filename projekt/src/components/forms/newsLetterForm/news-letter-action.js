import { z } from "zod";

const emailSchema = z.object({
  email: z.string().min(1).email({ message: "You must enter a valid email" }),
});

export async function subscribeToNewsletter(prevState, formData) {
  const email = formData.get("email");

  if (!email || email.trim() === "") {
    return { success: false, error: "You must enter an email" };
  }

  const parseResult = emailSchema.safeParse({ email: email.trim() });
  if (!parseResult.success) {
    const firstError = parseResult.error?.errors?.[0]?.message;
    return {
      success: false,
      error: firstError || "You must enter a valid email",
    };
  }

  try {
    const response = await fetch("http://localhost:4000/api/v1/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.trim() }),
    });

    if (response.status === 204) {
      return { success: true };
    } else {
      const error = await response.text();
      return { success: false, error };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
}
