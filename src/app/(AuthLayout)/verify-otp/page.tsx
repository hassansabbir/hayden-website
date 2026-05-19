"use client";

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

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: {
      verifyOtp: "",
    },
    mode: "onChange",
  });

  const otpValue = watch("verifyOtp");

  const onSubmit = (data: ContactUsFormValues) => {
    const payload = {
      otp: data.verifyOtp,
    };

    console.log("Submitted Data:", payload);

    toast.success("OTP verified successfully");

    router.push("/reset-password");
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
            <div className="w-full max-w-96">
              <SubmitButton
                isSubmitting={isSubmitting}
                title="Continue"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;