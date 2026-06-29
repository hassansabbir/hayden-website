"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import SubmitButton from "@/components/buttons/SubmitButton";
import { fetchUrl } from "@/lib/fetchUrl";

// Schema
const contactUsFormSchema = z.object({
  verifyOtp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
});

// Type
type ContactUsFormValues = z.infer<typeof contactUsFormSchema>;

const VerifyOtp = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const storedEmail = window.sessionStorage.getItem("reset-email");
    if (!storedEmail) {
      // Landed here without going through Forgot Password first
      router.replace("/forgot-password");
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: {
      verifyOtp: "",
    },
    mode: "onChange",
  });

  const otpValue = watch("verifyOtp");

  const onSubmit = async (data: ContactUsFormValues) => {
    if (!email) return;
    setIsSubmitting(true);
    try {
      const result = await fetchUrl("/auth/verify-otp", {
        method: "POST",
        body: { email, otp: data.verifyOtp },
      });
      window.sessionStorage.setItem("reset-ticket", result.data.resetTicket);
      toast.success("OTP verified successfully");
      router.push("/reset-password");
    } catch (err: any) {
      toast.error(err.message || "Invalid or expired OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    try {
      await fetchUrl("/auth/forgot-password", { method: "POST", body: { email } });
      toast.success("A new OTP has been sent.");
    } catch (err: any) {
      toast.error(err.message || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="p-2">

      <div className="p-6 sm:p-10 md:p-14">
        <div className="mb-10 text-center">
          <h1 className="text-[42px] font-bold tracking-tight text-[#1A1A1A]">
            Verify OTP
          </h1>

          <p className="mt-2 text-gray-600">
            We already sent you a 6-digit code to your registered email. Please enter it below to continue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(value) =>
                  setValue("verifyOtp", value, {
                    shouldValidate: true,
                  })
                }
              >
                <InputOTPGroup className="gap-2 sm:gap-4">
                  <InputOTPSlot
                    index={0}
                    className="size-9 rounded-sm border border-gray-300 text-sm md:text-xl md:size-12 lg:size-16"
                  />
                  <InputOTPSlot
                    index={1}
                    className="size-9 rounded-sm border border-gray-300 text-sm md:text-xl md:size-12 lg:size-16"
                  />
                  <InputOTPSlot
                    index={2}
                    className="size-9 rounded-sm border border-gray-300 text-sm md:text-xl md:size-12 lg:size-16"
                  />
                  <InputOTPSlot
                    index={3}
                    className="size-9 rounded-sm border border-gray-300 text-sm md:text-xl md:size-12 lg:size-16"
                  />
                  <InputOTPSlot
                    index={4}
                    className="size-9 rounded-sm border border-gray-300 text-sm md:text-xl md:size-12 lg:size-16"
                  />
                  <InputOTPSlot
                    index={5}
                    className="size-9 rounded-sm border border-gray-300 text-sm md:text-xl md:size-12 lg:size-16"
                  />
                </InputOTPGroup>
              </InputOTP>

              {errors.verifyOtp && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.verifyOtp.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center pt-4">
            <div className="w-full max-w-96 space-y-3">
              <SubmitButton
                isSubmitting={isSubmitting}
                title="Continue"
              />
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="w-full text-center text-sm font-semibold text-[#064e3b] hover:underline disabled:opacity-60"
              >
                {isResending ? "Resending..." : "Didn't get a code? Resend OTP"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
