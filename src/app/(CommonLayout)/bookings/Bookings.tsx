"use client";

import React from 'react';
import { Mail, Ticket, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

type BookingFormValues = {
  email: string;
  bookingId: string;
};

const Bookings = () => {
  const { register, handleSubmit } = useForm<BookingFormValues>();

  const onSubmit = (data: BookingFormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1592937238247-cd0090e02f65?q=80&w=2000&auto=format&fit=crop"
          alt="Golf Course Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </motion.div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 w-full max-w-[540px] bg-white/75 backdrop-blur-[24px] rounded-[32px] p-8 sm:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-white/40"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-[11px] font-bold text-[#10561c] tracking-widest uppercase mb-3"
          >
            RESERVATION ACCESS
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-4xl sm:text-[42px] font-extrabold text-[#0a4a1b] tracking-tight mb-4"
          >
            Track My Booking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-[#4b5a4d] text-[15.5px] leading-relaxed max-w-[420px] mx-auto"
          >
            Enter your details below to manage your reservation, view tee times, or update your membership status.
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 mb-12"
        >
          <div className="space-y-2.5">
            <label htmlFor="email" className="block text-[11px] font-bold text-[#10561c] tracking-widest uppercase pl-1">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" strokeWidth={2} />
              </div>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email", { required: true })}
                className="w-full bg-white/90 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0a4a1b] transition-all outline-none shadow-sm text-[15px]"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label htmlFor="bookingId" className="block text-[11px] font-bold text-[#10561c] tracking-widest uppercase pl-1">
              BOOKING ID OR PHONE NUMBER
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Ticket className="h-5 w-5 text-gray-400" strokeWidth={2} />
              </div>
              <input
                id="bookingId"
                type="text"
                placeholder="ELITE-123456"
                {...register("bookingId", { required: true })}
                className="w-full bg-white/90 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0a4a1b] transition-all outline-none shadow-sm text-[15px]"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#10561c] text-white font-bold py-[18px] rounded-[14px] shadow-[0_4px_14px_0_rgba(16,86,28,0.25)] text-[16px] flex items-center justify-center gap-2 mt-8"
          >
            <span>View Booking Status</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <p className="text-[13px] text-[#4b5a4d] mb-1.5 font-medium">
            Having trouble finding your details?
          </p>
          <button type="button" className="text-[14px] font-bold text-[#10561c] hover:text-[#0a4a1b] transition-colors underline-offset-4 hover:underline">
            Contact Clubhouse Support
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Bookings;