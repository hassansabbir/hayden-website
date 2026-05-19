"use client";

import { useForm } from "react-hook-form";
import { MapPin, Calendar, Users, Lock, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useQueryParam } from "@/hooks/useQueryParam";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

type ReserveFormValues = {
  fullName: string;
  phoneNumber: string;
  email: string;
  specialRequests: string;
  agreeToTerms: boolean;
};

const Reserve = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReserveFormValues>();
  const updateSearchParams = useUpdateSearchParams();

  const onSubmit = (data: ReserveFormValues) => {
    console.log("Form Submitted:", data);
    updateSearchParams("isSubmit", "true");
  };

  return (
    <div className="min-h-screen bg-[#fafbfa] font-sans text-slate-900 flex justify-center py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1150px]">
        {/* Breadcrumb */}
        <div className="flex items-center text-[11px] font-bold tracking-widest uppercase mb-10 text-gray-500">
          <span>RESERVATIONS</span>
          <span className="mx-2.5">&gt;</span>
          <span className="text-[#0a4a1b]">SECURE BOOKING</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[100px]">
          {/* Left Column - Form */}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-[44px] font-extrabold text-[#0a4a1b] tracking-tight mb-5 leading-tight">
              Request Your Tee Time
            </h1>
            <p className="text-gray-500 text-lg mb-12 max-w-[500px] leading-relaxed">
              Provide your player information to finalize your request. Our
              clubhouse concierge will confirm your slot within 15 minutes.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2.5">
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] font-bold text-gray-800 tracking-widest uppercase"
                  >
                    FULL NAME
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="E.g. Alexander Sterling"
                    {...register("fullName", { required: true })}
                    className="w-full bg-[#f4f5f4] border-0 rounded-xl px-4 py-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0a4a1b] focus:bg-white transition-all outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2.5">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-[11px] font-bold text-gray-800 tracking-widest uppercase"
                  >
                    PHONE NUMBER
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...register("phoneNumber", { required: true })}
                    className="w-full bg-[#f4f5f4] border-0 rounded-xl px-4 py-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0a4a1b] focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2.5">
                <label
                  htmlFor="email"
                  className="block text-[11px] font-bold text-gray-800 tracking-widest uppercase"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="a.sterling@example.com"
                  {...register("email", { required: true })}
                  className="w-full bg-[#f4f5f4] border-0 rounded-xl px-4 py-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0a4a1b] focus:bg-white transition-all outline-none"
                />
              </div>

              {/* Special Requests */}
              <div className="space-y-2.5">
                <label
                  htmlFor="specialRequests"
                  className="block text-[11px] font-bold text-gray-800 tracking-widest uppercase"
                >
                  SPECIAL REQUESTS (OPTIONAL)
                </label>
                <textarea
                  id="specialRequests"
                  placeholder="Mention equipment rentals, caddy preference, or dietary needs..."
                  rows={4}
                  {...register("specialRequests")}
                  className="w-full bg-[#f4f5f4] border-0 rounded-xl px-4 py-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0a4a1b] focus:bg-white transition-all outline-none resize-none"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-4 p-5 bg-[#e8ebe9] rounded-xl">
                <div className="flex items-center h-6 pt-1">
                  <input
                    id="agreeToTerms"
                    type="checkbox"
                    {...register("agreeToTerms", { required: true })}
                    className="w-5 h-5 text-[#0a4a1b] bg-white border-gray-300 rounded focus:ring-[#0a4a1b] focus:ring-offset-0 cursor-pointer accent-[#0a4a1b]"
                  />
                </div>
                <label
                  htmlFor="agreeToTerms"
                  className="text-[14.5px] text-gray-600 leading-relaxed cursor-pointer pr-4"
                >
                  I agree to the FairwayElite{" "}
                  <span className="font-semibold text-[#0a4a1b]">
                    Membership Terms
                  </span>{" "}
                  and understand the 24-hour cancellation policy for premium
                  clubhouse reservations.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#10561c] hover:bg-[#0c4714] text-white font-bold py-[18px] rounded-xl transition-all shadow-[0_4px_14px_0_rgba(16,86,28,0.25)] hover:shadow-[0_6px_20px_rgba(16,86,28,0.3)] hover:-translate-y-px text-[17px] mt-6"
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-[480px]">
            <div className="bg-white rounded-[2rem] p-9 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
              <h2 className="text-[28px] font-bold text-[#0a4a1b] mb-7">
                Booking Summary
              </h2>

              {/* Image Container */}
              <div className="relative rounded-[20px] overflow-hidden mb-9 h-56 group">
                <Image
                  src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Golf Course at Sunrise"
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <div className="absolute top-5 left-5 bg-[#10561c]/95 backdrop-blur-sm text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  PREMIUM CHOICE
                </div>
              </div>

              {/* Info Rows */}
              <div className="space-y-7">
                {/* Location */}
                <div className="flex gap-5 items-center">
                  <div className="bg-[#f4f5f4] rounded-[14px] p-3.5 h-[52px] w-[52px] flex items-center justify-center shrink-0">
                    <MapPin
                      className="w-6 h-6 text-[#10561c]"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                      CLUBHOUSE
                    </div>
                    <div className="font-bold text-gray-900 text-[17px]">
                      The Oak Ridge Estate
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex gap-5 items-center">
                  <div className="bg-[#f4f5f4] rounded-[14px] p-3.5 h-[52px] w-[52px] flex items-center justify-center shrink-0">
                    <Calendar
                      className="w-6 h-6 text-[#10561c]"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                      DATE & TIME
                    </div>
                    <div className="font-bold text-gray-900 text-[17px]">
                      Tuesday, May 14 &bull; 08:30 AM
                    </div>
                  </div>
                </div>

                {/* Party Size */}
                <div className="flex gap-5 items-center">
                  <div className="bg-[#f4f5f4] rounded-[14px] p-3.5 h-[52px] w-[52px] flex items-center justify-center shrink-0">
                    <Users
                      className="w-6 h-6 text-[#10561c]"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                      PARTY SIZE
                    </div>
                    <div className="font-bold text-gray-900 text-[17px]">
                      4 Players (Private Group)
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 my-8 w-full"></div>

              {/* Total */}
              <div className="flex justify-between items-end mb-8">
                <div>
                  <div className="text-[15px] font-medium text-gray-500 mb-1">
                    Estimated Total
                  </div>
                  <div className="text-xs text-gray-400">Pay at Clubhouse</div>
                </div>
                <div className="text-[40px] font-black text-[#0a4a1b] leading-none">
                  $420.00
                </div>
              </div>

              {/* Discount Alert */}
              <div className="bg-[#f2f7f3] border border-[#e8efe9] rounded-xl p-4 flex gap-3.5 items-start">
                <BadgeCheck
                  className="w-[20px] h-[20px] text-[#10561c] shrink-0 mt-px"
                  strokeWidth={2.5}
                />
                <p className="text-[13.5px] text-[#0f4d19] leading-relaxed">
                  <span className="font-bold">Elite Membership applies:</span>{" "}
                  You are saving $80.00 on this reservation.
                </p>
              </div>
            </div>

            {/* Encrypted Notice */}
            <div className="flex items-center justify-center gap-2 mt-8 text-gray-400 font-bold text-[11.5px] uppercase tracking-widest">
              <Lock className="w-[14px] h-[14px]" strokeWidth={2.5} />
              <span>ENCRYPTED SUBMISSION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
