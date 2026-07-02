"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero2 from "@/components/home/Hero2";
import RecomandedClub from "@/components/home/RecomandedClub";
import useLoginUser from "@/hooks/useUser";

export default function ProfilePage() {
  const { isLogin, isLoading } = useLoginUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLogin) {
      router.push("/sign-in");
    }
  }, [isLoading, isLogin, router]);

  if (isLoading || !isLogin) return null;

  return (
    <div>
      <Hero2 />
      <RecomandedClub />
    </div>
  );
}
