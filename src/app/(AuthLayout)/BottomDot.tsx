"use client";

import { motion } from "framer-motion";

const BottomDot = ({ activeIndex }: { activeIndex: number }) => {
  const activeColor = (index: number) => {
    if (index === activeIndex) return "bg-[#064e3b]";
    else return "bg-[#E5E7EB]";
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-16 flex items-center justify-center gap-6"
    >
      <div className="h-[2px] w-12 bg-[#E5E7EB]" />
      <div className="flex gap-2">
        <div className={`h-1.5 w-1.5 rounded-full ${activeColor(0)}`} />
        <div className={`h-1.5 w-1.5 rounded-full ${activeColor(1)}`} />
        <div className={`h-1.5 w-1.5 rounded-full ${activeColor(2)}`} />
      </div>
      <div className="h-[2px] w-12 bg-[#E5E7EB]" />
    </motion.div>
  );
};

export default BottomDot;