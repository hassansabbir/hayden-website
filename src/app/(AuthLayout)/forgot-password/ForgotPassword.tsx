"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import InputField from "@/components/form/InputField";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BottomDot from "../BottomDot";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchUrl } from "@/lib/fetchUrl";
import SubmitButton from "@/components/buttons/SubmitButton";

const forgotSchema = z.object({
  email: z.string().email()
});

type ForgotFormValues = z.infer<typeof forgotSchema>

const ForgotPassword = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: ForgotFormValues) => {
    setIsSubmitting(true);
    try {
      await fetchUrl("/auth/forgot-password", { method: "POST", body: { email: data.email } });
      // The OTP step needs the email again but doesn't collect it itself —
      // carry it forward in sessionStorage rather than a query param.
      window.sessionStorage.setItem("reset-email", data.email);
      toast.success("If an account exists for this email, an OTP has been sent.");
      router.push('/verify-otp');
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[500px] rounded-[20px] bg-white p-4 lg:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] border border-gray-100"
      >
        <div className="mb-10">
          <h2 className="text-[40px] font-bold tracking-tight text-[#111827]">
            Forgot Password
          </h2>
          <p className="mt-2 text-[#6B7280] text-lg">
            Enter your email address to get otp.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <InputField title="Email Address" name="email" placeholder="name@domain.com" register={register} error={errors.email} />

          <SubmitButton isSubmitting={isSubmitting} title="Get OTP" className="mt-4 py-5 text-[17px]" />
          <Link href="/sign-in" className="text-center text-[#4B6548] block font-semibold hover:text-[#042f24]">Back to Sign In</Link>
        </form>
      </motion.div>
      {/* Footer Dots */}
      <BottomDot activeIndex={0} />
    </>
  );
};

export default ForgotPassword;
