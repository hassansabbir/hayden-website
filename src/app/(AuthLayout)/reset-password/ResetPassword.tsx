"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFieldPassword from "@/components/form/InputFieldPassword";
import BottomDot from "../BottomDot";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchUrl } from "@/lib/fetchUrl";
import SubmitButton from "@/components/buttons/SubmitButton";

const resetSchema = z.object({
  password: z.string().min(6).max(72),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetFormValues = z.infer<typeof resetSchema>

const ResetPassword = () => {
  const router = useRouter();
  const [resetTicket, setResetTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  })

  useEffect(() => {
    const storedTicket = window.sessionStorage.getItem("reset-ticket");
    if (!storedTicket) {
      // Landed here without verifying an OTP first
      router.replace("/forgot-password");
      return;
    }
    setResetTicket(storedTicket);
  }, [router]);

  const onSubmit = async (data: ResetFormValues) => {
    if (!resetTicket) return;
    setIsSubmitting(true);
    try {
      await fetchUrl("/auth/reset-password", {
        method: "POST",
        body: { resetTicket, password: data.password },
      });
      window.sessionStorage.removeItem("reset-email");
      window.sessionStorage.removeItem("reset-ticket");
      toast.success("Password reset successfully. Please sign in.");
      router.push('/sign-in');
    } catch (err: any) {
      toast.error(err.message || "Failed to reset password.");
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
            Reset Password
          </h2>
          <p className="mt-2 text-[#6B7280] text-lg">
            Enter your details to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <InputFieldPassword title="New Password" name="password" placeholder="••••••••" register={register} error={errors.password} />
          <InputFieldPassword title="Confirm Password" name="confirmPassword" placeholder="••••••••" register={register} error={errors.confirmPassword} />

          <SubmitButton isSubmitting={isSubmitting} title="Reset Password" className="mt-4 py-5 text-[17px]" />
        </form>
      </motion.div>
      {/* Footer Dots */}
      <BottomDot activeIndex={1} />
    </>
  );
};

export default ResetPassword;
