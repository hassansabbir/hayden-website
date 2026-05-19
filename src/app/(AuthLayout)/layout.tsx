import type { Metadata } from "next";
import AuthLeft from "./AuthLeft";

export const metadata: Metadata = {
  title: "Hayden Auth",
  description: "Hayden Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full">
      <main className="flex min-h-screen w-full font-sans bg-white overflow-hidden">
        <AuthLeft />
        <div className="flex basis-[100%] flex-col items-center justify-center lg:basis-[50%] px-2 lg:px-6">
          {children}
        </div>
      </main>
    </div>
  );

}