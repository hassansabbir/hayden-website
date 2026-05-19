"use client";

import FeatureClub from "@/components/home/FeatureClub";
import Hero from "@/components/home/Hero";
import Hero2 from "@/components/home/Hero2";
import RecomandedClub from "@/components/home/RecomandedClub";
import useLoginUser from "@/hooks/useUser";

export default function Home() {
  const { isLogin } = useLoginUser();

  return (
    <div>
      {!isLogin ? <Hero /> : <Hero2 />}
      {!isLogin ? <FeatureClub /> : <RecomandedClub />}
    </div>
  );
}