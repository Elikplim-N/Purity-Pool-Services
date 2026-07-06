"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { verifyAdminCredentials } from "@/lib/auth";
import { createAdminSession } from "@/lib/session";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  next: z.string().optional(),
});

export type LoginFormState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") ?? undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { email, password, next } = parsed.data;

  let isValid: boolean;
  try {
    isValid = verifyAdminCredentials(email, password);
  } catch {
    return { error: "Admin login is not configured. Check server environment variables." };
  }

  if (!isValid) {
    return { error: "Invalid email or password" };
  }

  await createAdminSession(email);

  const destination = next && next.startsWith("/admin") ? next : "/admin";
  redirect(destination);
}
