"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/uiStore";
import { authService } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();
  const { openAuth } = useUIStore();

  useEffect(() => {
    if (authService.isLoggedIn()) {
      router.push("/account");
    } else {
      openAuth("login");
      router.push("/");
    }
  }, [openAuth, router]);

  return (
    <main className="w-full min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </main>
  );
}
