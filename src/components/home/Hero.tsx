"use client";

import React, { useRef, useState } from "react";
import { Calendar, Search } from "lucide-react";
import { HeroBg } from "@/asset/asset";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    router.push("/explore-clubs");
  };

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      if ("showPicker" in HTMLInputElement.prototype) {
        try {
          dateInputRef.current.showPicker();
        } catch (error) {
          dateInputRef.current.focus();
        }
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-20px)] flex items-center justify-center font-sans overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HeroBg.src})`,
        }}
      >
        {/* Subtle overlay for better text legibility */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 max-w-5xl mx-auto mt-10">
        {/* Hero Typography */}
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white mb-2 text-center drop-shadow-md leading-[1.1]">
          Get ready to <br />
          <span className="text-[#90f468]">Tee it Up</span>
        </h1>

        <p className="text-lg md:text-xl text-white font-normal mb-10 text-center drop-shadow-sm mt-4 tracking-wide">
          Reserve your tee time now and pay at the course
        </p>

        {/* Search Bar - Glassmorphism */}
        <div className="w-full max-w-4xl bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          {/* Club or Location Input */}
          <div className="flex-[1.2] flex flex-col px-4 md:pl-6 py-2 w-full justify-center">
            <label className="text-[10px] md:text-xs font-bold tracking-widest text-white/90 uppercase mb-1">
              Club or Location
            </label>
            <input
              type="text"
              placeholder="Where to play?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none outline-none text-white placeholder-white/70 w-full text-base md:text-lg font-medium focus:ring-0 p-0"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-white/30 mx-2" />

          {/* Date & Time Input */}
          <div className="flex-1 flex flex-col px-4 md:pl-6 py-2 w-full justify-center relative">
            <label className="text-[10px] md:text-xs font-bold tracking-widest text-white/90 uppercase mb-1">
              Date & Time
            </label>
            <input
              ref={dateInputRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent border-none outline-none text-white placeholder-white/70 w-full text-base md:text-lg font-medium focus:ring-0 p-0 [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0 px-2 md:px-0">
            <button
              type="button"
              onClick={handleCalendarClick}
              className="flex-1 md:flex-none p-3.5 md:p-4 bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-xl border border-white/20 text-white flex items-center justify-center group"
            >
              <Calendar
                className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
                strokeWidth={2}
              />
            </button>
            <button
              type="button"
              onClick={handleSearch}
              className="flex-1 md:flex-none p-3.5 md:p-4 bg-[#90f468] hover:bg-[#80e557] transition-all duration-300 rounded-xl text-[#0f3b06] flex items-center justify-center group shadow-[0_0_15px_rgba(144,244,104,0.3)] hover:shadow-[0_0_20px_rgba(144,244,104,0.5)]"
            >
              <Search
                className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
