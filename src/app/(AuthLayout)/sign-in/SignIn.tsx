"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import InputField from "@/components/form/InputField";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFieldPassword from "@/components/form/InputFieldPassword";
import BottomDot from "../BottomDot";
import { useRouter } from "next/navigation";
import useLoginUser from "@/hooks/useUser";
import Link from "next/link";
import { toast } from "sonner";
import SubmitButton from "@/components/buttons/SubmitButton";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SigninFormValues = z.infer<typeof signinSchema>

const SignIn = () => {
  const router = useRouter();
  const { login } = useLoginUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = async (data: SigninFormValues) => {
    setIsSubmitting(true);
    const result = await login(data.email, data.password);
    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.message || "Unable to sign in.");
      return;
    }

    toast.success("Welcome back!");
    router.replace('/');
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
            Welcome back
          </h2>
          <p className="mt-2 text-[#6B7280] text-lg">
            Enter your details to access the clubhouse.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <InputField title="Email Address" name="email" placeholder="name@domain.com" register={register} error={errors.email} />
          <InputFieldPassword title="Password" name="password" placeholder="••••••••" register={register} error={errors.password} isForgotPassword={true} />

          <SubmitButton isSubmitting={isSubmitting} title="Sign In" className="mt-4 py-5 text-[17px]" />
          <p className="text-center">
            Don't have an account? <Link href="/sign-up" className="text-[#064e3b] font-bold">Sign Up</Link>
          </p>
        </form>
      </motion.div>
      {/* Footer Dots */}
      <BottomDot activeIndex={1} />
    </>
  );
};

export default SignIn;
