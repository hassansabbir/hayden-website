"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import InputField from "@/components/form/InputField";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BottomDot from "../BottomDot";
import Link from "next/link";
import { useRouter } from "next/navigation";

const forgotSchema = z.object({
  email: z.string().email()
});

type ForgotFormValues = z.infer<typeof forgotSchema>

const ForgotPassword = () => {
  const router = useRouter();
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

  const onSubmit = (data: any) => {
    console.log(data);
    router.push('/verify-otp')
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

          <button
            type="submit"
            className="mt-4 w-full rounded-2xl bg-[#064e3b] py-5 text-[17px] font-bold text-white transition-all hover:bg-[#042f24] hover:shadow-lg active:scale-[0.99]"
          >
            Get OTP
          </button>
          <Link href="/sign-in" className="text-center text-[#4B6548] block font-semibold hover:text-[#042f24]">Back to Sign In</Link>
        </form>
      </motion.div>
      {/* Footer Dots */}
      <BottomDot activeIndex={0} />
    </>
  );
};

export default ForgotPassword;