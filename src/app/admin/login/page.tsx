import type { Metadata } from "next";
import Link from "next/link";
import { Waves } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
};

type SearchParams = Promise<{ next?: string }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-600 via-blue-600 to-sky-500 px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl shadow-blue-950/20">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Waves className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Purity Pool Services
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to manage your store
          </p>
        </div>

        <div className="mt-6">
          <LoginForm next={next} />
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-600">
            &larr; Back to store
          </Link>
        </p>
      </div>
    </div>
  );
}
