"use client";

import Image from "next/image"
import { motion } from "framer-motion";
import { MainLogo } from "@/asset/asset";

const AuthLeft = () => {
  return (
    <div className="relative hidden basis-[50%] lg:block overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop"
          alt="Golf Course"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/10" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute left-12 top-12"
      >
        <div className="w-40 h-auto">
          <Image src={MainLogo} alt="Main Logo" width={1000} height={1000} className="w-full" />
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="absolute bottom-20 left-12 max-w-lg text-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-6 inline-block rounded-full border border-white/30 bg-white/10 px-5 py-1.5 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md"
        >
          Exclusive Access
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-6 text-[72px] font-bold leading-[0.95] tracking-tight"
        >
          Elevate your <br />
          <span className="text-white">swing game.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-lg font-medium text-white/90 leading-relaxed max-w-sm"
        >
          Experience the prestige of the world&apos;s finest fairways with
          FairwayElite&apos;s premier clubhouse community.
        </motion.p>
      </div>
    </div>
  )
}

export default AuthLeft