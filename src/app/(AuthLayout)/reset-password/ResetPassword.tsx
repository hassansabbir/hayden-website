"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFieldPassword from "@/components/form/InputFieldPassword";
import BottomDot from "../BottomDot";
import { useRouter } from "next/navigation";

const resetSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

type ResetFormValues = z.infer<typeof resetSchema>

const ResetPassword = () => {
  const router = useRouter();
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

  const onSubmit = (data: any) => {
    console.log(data);
    router.push('/sign-in')
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

          <button
            type="submit"
            className="mt-4 w-full rounded-2xl bg-[#064e3b] py-5 text-[17px] font-bold text-white transition-all hover:bg-[#042f24] hover:shadow-lg active:scale-[0.99]"
          >
            Sign In
          </button>
        </form>
      </motion.div>
      {/* Footer Dots */}
      <BottomDot activeIndex={1} />
    </>
  );
};

export default ResetPassword;