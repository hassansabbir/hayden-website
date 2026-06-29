import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { cookies } from "next/headers";
import { UserProvider } from "@/hooks/useUser";
import { Toaster } from "@/components/ui/sonner";
import { USER_CACHE_COOKIE, parseUserCacheCookie } from "@/lib/userCache";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialUser = parseUserCacheCookie(cookieStore.get(USER_CACHE_COOKIE)?.value);

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <UserProvider initialUser={initialUser}>
          {children}
          <Toaster richColors position="top-center" />
        </UserProvider>
      </body>
    </html>
  );
}

