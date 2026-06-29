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

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email(),
  phone: z.string().min(5, "Enter a valid phone number").max(20),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>

const SignUp = () => {
  const router = useRouter();
  const { signup } = useLoginUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    }
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    const result = await signup({
      fullName: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.message || "Failed to create account.");
      return;
    }

    toast.success("Account created! Welcome to Tea It Up.");
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
            Create Account
          </h2>
          <p className="mt-2 text-[#6B7280] text-lg">
            Enter your details to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField title="Full Name" name="name" placeholder="John Doe" register={register} error={errors.name} />
          <InputField title="Email Address" name="email" placeholder="name@domain.com" register={register} error={errors.email} />
          <InputField title="Phone Number" name="phone" placeholder="+1 555 123 4567" register={register} error={errors.phone} />
          <div className="grid grid-cols-2 gap-4">
            <InputFieldPassword title="Password" name="password" placeholder="••••••••" register={register} error={errors.password} />
            <InputFieldPassword title="Confirm Password" name="confirmPassword" placeholder="••••••••" register={register} error={errors.confirmPassword} />
          </div>

          <SubmitButton isSubmitting={isSubmitting} title="Sign Up" className="mt-4 py-5 text-[17px]" />
          <p className="text-center">
            Already have an account? <Link href="/sign-in" className="text-[#064e3b] font-bold">Sign In</Link>
          </p>
        </form>
      </motion.div>
      {/* Footer Dots */}
      <BottomDot activeIndex={1} />
    </>
  );
};

export default SignUp;
