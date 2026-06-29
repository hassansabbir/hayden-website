"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { fetchUrl } from "@/lib/fetchUrl";
import useLoginUser from "@/hooks/useUser";
import LocationPicker from "@/components/map/LocationPicker";

type ContactFormValues = {
  fullName: string;
  email: string;
  inquiryType: string;
  message: string;
};

const AboutBottom = () => {
  const { register, handleSubmit, reset, setValue } = useForm<ContactFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useLoginUser();

  useEffect(() => {
    if (!user) return;
    setValue("fullName", user.name);
    setValue("email", user.email);
  }, [user, setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await fetchUrl("/contact", { method: "POST", body: data });
      toast.success("Your message has been sent. We'll be in touch soon.");
      reset();
    } catch (err: any) {
      toast.error(err.message || "Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 font-sans mt-10">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-[100px]">
        {/* Left Column: Connect With Us */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 lg:max-w-[480px]"
        >
          <h2 className="text-[32px] sm:text-[36px] font-bold text-[#0a4a1b] tracking-tight mb-4">
            Connect With Us
          </h2>
          <p className="text-[#647167] text-[15px] leading-relaxed mb-10 pr-4">
            Whether you're looking for membership inquiries or corporate events,
            our concierge team is here to assist.
          </p>

          <div className="space-y-8 mb-12">
            {/* Headquarters */}
            <div className="flex gap-5 items-start">
              <div className="bg-[#d5ecd9] rounded-[14px] p-3.5 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-[#0a4a1b]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#0a4a1b] mb-1.5">
                  Global Headquarters
                </h3>
                <p className="text-[#647167] text-[14.5px] leading-relaxed">
                  1200 Prestwick Drive, St. Andrews
                  <br />
                  Fife, Scotland KY16 9AL
                </p>
              </div>
            </div>

            {/* Direct Inquiries */}
            <div className="flex gap-5 items-start">
              <div className="bg-[#d5ecd9] rounded-[14px] p-3.5 shrink-0 mt-0.5">
                <Phone className="w-5 h-5 text-[#0a4a1b]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#0a4a1b] mb-1.5">
                  Direct Inquiries
                </h3>
                <p className="text-[#647167] text-[14.5px] leading-relaxed">
                  +44 (0) 1334 466666
                  <br />
                  concierge@fairwayelite.com
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full h-[240px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=Dhaka,%20Bangladesh&t=&z=12&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* <LocationPicker locations={[{ lat: 23.7539276, lng: 90.4125231 }]} /> */}
          </div>
        </motion.div>

        {/* Right Column: Send a Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex-1"
        >
          <div className="bg-white rounded-[24px] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
            <h2 className="text-[24px] font-bold text-[#0a4a1b] tracking-tight mb-8">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Full Name */}
                <div className="flex-1 space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-[10px] font-bold text-[#647167] tracking-widest uppercase"
                  >
                    FULL NAME
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your name"
                    {...register("fullName", { required: true })}
                    className="w-full bg-[#f4f5f4] border-0 rounded-xl px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0a4a1b] transition-all outline-none text-[14px]"
                  />
                </div>

                {/* Email Address */}
                <div className="flex-1 space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-[10px] font-bold text-[#647167] tracking-widest uppercase"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email", { required: true })}
                    className="w-full bg-[#f4f5f4] border-0 rounded-xl px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0a4a1b] transition-all outline-none text-[14px]"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div className="space-y-2">
                <label
                  htmlFor="inquiryType"
                  className="block text-[10px] font-bold text-[#647167] tracking-widest uppercase"
                >
                  INQUIRY TYPE
                </label>
                <div className="relative">
                  <select
                    id="inquiryType"
                    {...register("inquiryType", { required: true })}
                    className="w-full bg-[#f4f5f4] border-0 rounded-xl px-4 py-3.5 text-gray-800 appearance-none focus:ring-2 focus:ring-[#0a4a1b] transition-all outline-none text-[14px] cursor-pointer"
                  >
                    <option value="Membership Inquiry">
                      Membership Inquiry
                    </option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="General Question">General Question</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Your Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-[10px] font-bold text-[#647167] tracking-widest uppercase"
                >
                  YOUR MESSAGE
                </label>
                <textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={4}
                  {...register("message", { required: true })}
                  className="w-full bg-[#f4f5f4] border-0 rounded-xl px-4 py-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0a4a1b] transition-all outline-none text-[14px] resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#10561c] hover:bg-[#0c4714] text-white font-bold py-[15px] rounded-xl transition-all shadow-[0_4px_14px_0_rgba(16,86,28,0.25)] hover:shadow-[0_6px_20px_rgba(16,86,28,0.3)] hover:-translate-y-px text-[15px] mt-2 disabled:opacity-60 disabled:translate-y-0 flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutBottom;
