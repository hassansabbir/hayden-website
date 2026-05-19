"use client";


import { motion } from "framer-motion";
import { Users, Info, Lock, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface TeeTime {
  id: number;
  time: string;
  session: string;
  players: string;
  status: string;
  statusType: "instant" | "shared" | "member";
  price: string;
  available: boolean;
}

const teeTimes: TeeTime[] = [
  {
    id: 1,
    time: "07:45 AM",
    session: "MORNING MIST",
    players: "Up to 4 Players",
    status: "Instant Booking",
    statusType: "instant",
    price: "210.00",
    available: true,
  },
  {
    id: 2,
    time: "09:15 AM",
    session: "PRIME MORNING",
    players: "Up to 2 Players",
    status: "Shared Cart Only",
    statusType: "shared",
    price: "245.00",
    available: true,
  },
  {
    id: 3,
    time: "01:30 PM",
    session: "AFTERNOON SESSION",
    players: "4 Players",
    status: "Member Only",
    statusType: "member",
    price: "185.00",
    available: false,
  },
];

const TeaTimes = () => {
  const router = useRouter();
  return (
    <section className="py-20 px-4 md:px-8 bg-white max-w-7xl mx-auto font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[52px] font-bold text-[#0a4a1b] leading-tight mb-4"
          >
            Available Tee Times
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#647167] text-lg md:text-xl font-medium"
          >
            Today, October 24th — Limited availability for non-members.
          </motion.p>
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-3.5 bg-[#e5e7eb] hover:bg-[#d1d5db] transition-all rounded-xl font-bold text-[#4a554d] flex items-center gap-2 text-[15px]">
            Filter By Time
          </button>
          <button className="px-6 py-3.5 bg-[#e5e7eb] hover:bg-[#d1d5db] transition-all rounded-xl font-bold text-[#4a554d] flex items-center gap-2 text-[15px]">
            Party Size
          </button>
        </div>
      </div>

      {/* Tee Times List */}
      <div className="space-y-4">
        {teeTimes.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`relative flex flex-col md:flex-row items-center justify-between p-8 bg-white rounded-2xl transition-all ${item.available
              ? "hover:shadow-xl hover:shadow-black/5 cursor-pointer ring-1 ring-gray-100"
              : "opacity-80 ring-1 ring-gray-50"
              }`}
          >
            {/* Left Accent Border */}
            <div
              className={`absolute left-0 top-8 bottom-8 w-[5px] rounded-r-full ${item.available ? "bg-[#0a4a1b]" : "bg-gray-200"
                }`}
            />

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 w-full">
              {/* Time Section */}
              <div className="flex flex-col items-center md:items-start min-w-[160px] pl-2">
                <span className={`text-[32px] md:text-[40px] font-bold leading-none ${item.available ? "text-[#0a4a1b]" : "text-gray-400"}`}>
                  {item.time}
                </span>
                <span className="text-[11px] font-bold text-gray-400 tracking-[0.2em] mt-2 uppercase">
                  {item.session}
                </span>
              </div>

              {/* Vertical Divider (Hidden on mobile) */}
              <div className="hidden md:block h-14 w-px bg-gray-100" />

              {/* Player Count */}
              <div className="flex items-center gap-3 text-[#4a554d] min-w-[160px]">
                <Users size={20} className="text-gray-400" strokeWidth={2.5} />
                <span className="font-bold text-[15px]">{item.players}</span>
              </div>

              {/* Status Section */}
              <div className="flex items-center gap-3 min-w-[200px]">
                {item.statusType === "instant" && (
                  <>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
                    <span className="text-[15px] font-bold text-[#0a4a1b]/80">{item.status}</span>
                  </>
                )}
                {item.statusType === "shared" && (
                  <>
                    <Info size={20} className="text-gray-400" />
                    <span className="text-[15px] font-bold text-gray-500">{item.status}</span>
                  </>
                )}
                {item.statusType === "member" && (
                  <>
                    <Lock size={20} className="text-[#f87171]" />
                    <span className="text-[15px] font-bold text-[#f87171]">{item.status}</span>
                  </>
                )}
              </div>
            </div>

            {/* Price and Action Section */}
            <div className="flex items-center gap-8 mt-8 md:mt-0 w-full md:w-auto justify-between md:justify-end">
              <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-1">
                  <span className={`text-[28px] font-bold ${item.available ? "text-[#0a4a1b]" : "text-gray-400"}`}>
                    ${item.price}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">per player</span>
              </div>

              <button
                onClick={() => router.push(`/explore-clubs/reserve/1`)}
                disabled={!item.available}
                className={`px-10 py-4 rounded-xl font-bold transition-all duration-300 min-w-[210px] text-[15px] text-center  ${item.available
                  ? "bg-[#0a4a1b] text-white hover:bg-[#073614] shadow-lg shadow-[#0a4a1b]/10 active:scale-95"
                  : "bg-[#f3f4f6] text-[#9ca3af] cursor-not-allowed"
                  }`}
              >
                {item.available ? "Reserve" : "Unavailable"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-16 flex justify-center"
      >
        <button className="flex items-center gap-3 text-[#0a4a1b] font-bold text-[17px] hover:translate-x-1 transition-transform group">
          View Full Weekly Schedule
          <Calendar size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};

export default TeaTimes;