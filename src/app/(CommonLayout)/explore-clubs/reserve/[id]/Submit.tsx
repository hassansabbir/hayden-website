"use client";

import { Check, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

const Submit = () => {
  const updateSearchParams = useUpdateSearchParams();

  return (
    <div className="min-h-screen bg-[#fafbfa] font-sans text-slate-900 flex flex-col items-center pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Success Icon & Title */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
        <div className="bg-[#e9eee9] w-[100px] h-[100px] rounded-[24px] flex items-center justify-center mb-7">
          <div className="bg-[#10561c] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-[#10561c]/20">
            <Check strokeWidth={3.5} className="w-7 h-7" />
          </div>
        </div>
        <h1 className="text-[44px] sm:text-[50px] font-extrabold text-[#0a4a1b] tracking-tight mb-4 leading-tight">
          Request Submitted
        </h1>
        <p className="text-[#647167] text-[17px] leading-relaxed max-w-[420px] mx-auto">
          Your tee time has been sent to the clubhouse for confirmation. We've
          got you covered.
        </p>
      </div>

      <div className="w-full max-w-[1020px] flex flex-col lg:flex-row gap-7">
        {/* Left Column - Booking Summary Card */}
        <div className="flex-[1.25] bg-white rounded-[18px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden border border-gray-100 flex flex-col">
          {/* Image Header with Overlay */}
          <div className="relative h-[250px] w-full shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Golf Course"
              fill
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8">
              <div className="text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-1.5 opacity-90">
                CONFIRMED LOCATION
              </div>
              <div className="text-white text-[26px] font-bold tracking-tight">
                Oak Creek Championship Course
              </div>
            </div>
          </div>

          <div className="p-8 flex-1 flex flex-col justify-between">
            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div>
                <div className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                  BOOKING ID
                </div>
                <div className="font-bold text-[#10561c] text-[20px]">
                  MCG-88291-ZX
                </div>
              </div>
              <div>
                <div className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                  DATE
                </div>
                <div className="font-bold text-gray-900 text-[15.5px] mt-[5px]">
                  October 24, 2024
                </div>
              </div>
              <div>
                <div className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                  TEE TIME
                </div>
                <div className="font-bold text-gray-900 text-[15.5px] mt-[5px]">
                  08:15 AM
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#f4f6f4] rounded-[14px] p-5 flex justify-between items-center mt-auto">
              <div className="flex items-center gap-4">
                <div className="bg-[#c2dfc8] rounded-[12px] p-[10px] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#10561c]" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-[14px] mb-0.5">
                    4 Players
                  </div>
                  <div className="text-[12px] text-gray-500">
                    Standard Guest Booking
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 text-[15px] mb-0.5">
                  $320.00
                </div>
                <div className="text-[12px] text-gray-500">
                  Paid via Guest Checkout
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - What happens next & Button */}
        <div className="flex-[0.85] flex flex-col gap-5">
          <div className="bg-[#f0f2f0] rounded-[18px] p-8 flex-1 border border-gray-100/50">
            <h2 className="text-[20px] font-bold text-[#0a4a1b] mb-8">
              What happens next?
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="bg-[#0a4a1b] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-[14.5px] mb-1.5">
                    Confirmation Email
                  </div>
                  <div className="text-[13px] text-[#647167] leading-relaxed pr-2">
                    Check your inbox for a detailed summary and a unique
                    tracking link.
                  </div>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="bg-[#0a4a1b] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-[14.5px] mb-1.5">
                    Save this Information
                  </div>
                  <div className="text-[13px] text-[#647167] leading-relaxed pr-2">
                    You are expected to save the Tracking Number
                  </div>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="bg-[#0a4a1b] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-[14.5px] mb-1.5">
                    Arrive Early
                  </div>
                  <div className="text-[13px] text-[#647167] leading-relaxed pr-2">
                    Please arrive 20 minutes before your time for check-in and
                    warm-up.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="w-full bg-[#0a4a1b] hover:bg-[#073814] text-white font-bold py-[18px] rounded-[14px] transition-all shadow-[0_4px_14px_0_rgba(10,74,27,0.25)] hover:shadow-[0_6px_20px_rgba(10,74,27,0.3)] hover:-translate-y-px text-center text-[16px]"
          >
            Return to Home
          </Link>
          <button
            onClick={() => updateSearchParams("isSubmit", "")}
            className="w-full bg-[#0a4a1b] hover:bg-[#073814] text-white font-bold py-[18px] rounded-[14px] transition-all shadow-[0_4px_14px_0_rgba(10,74,27,0.25)] hover:shadow-[0_6px_20px_rgba(10,74,27,0.3)] hover:-translate-y-px text-center text-[16px]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submit;
