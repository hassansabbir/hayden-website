"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainLogo } from "@/asset/asset";
import useLoginUser from "@/hooks/useUser";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Clubs", href: "/explore-clubs" },
  { name: "View Bookings", href: "/bookings" },
  { name: "About Us", href: "/about" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogin, logout } = useLoginUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const isHomePage = pathname === "/";
  const isExploreClubsDetails =
    pathname.startsWith("/explore-clubs/") && pathname !== "/explore-clubs";
  const isTransparentPage = isHomePage || isExploreClubsDetails;
  const isTransparent = isTransparentPage && !scrolled;
  const useWhiteText = isHomePage && isTransparent;

  return (
    <header
      className={cn(
        "w-full z-50 transition-all duration-300",
        isTransparentPage ? "fixed top-0 left-0 right-0" : "sticky top-0",
        isTransparent ? "bg-transparent" : "bg-[#ECF6F1] shadow-sm",
      )}
    >
      <div className="max-w-[1280px] mx-auto py-1 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="relative w-32 h-13 flex items-center">
            <Image
              src={MainLogo}
              alt="Tee It Up Logo"
              fill
              className="object-contain object-left mix-blend-multiply"
              unoptimized
              priority
              sizes="128px"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => {
            // Determine if active. Fallback to matching exactly or assuming 'Explore Clubs' is active for demo if path is /explore
            const isActive =
              pathname === link.href ||
              (pathname === "/" && link.name === "Home");

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[15px] font-medium transition-colors",
                  isActive
                    ? cn(
                        "underline underline-offset-8 decoration-2",
                        useWhiteText ? "text-white" : "text-[#1b8a5a]",
                      )
                    : cn(
                        useWhiteText
                          ? "text-white/90 hover:text-white"
                          : "text-gray-800 hover:text-[#1b8a5a]",
                      ),
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          {isLogin ? (
            <div className="flex items-center gap-5">
              <button
                className={cn(
                  "transition-colors relative",
                  useWhiteText
                    ? "text-white hover:text-white/80"
                    : "text-gray-800 hover:text-[#1b8a5a]",
                )}
              >
                <Bell className="w-[22px] h-[22px]" />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 outline-none cursor-pointer">
                    <Avatar className="w-10 h-10 border-2 border-[#0A3A20] rounded-lg shadow-sm overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="User Avatar"
                        fill
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-lg">US</AvatarFallback>
                    </Avatar>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 stroke-[3px]",
                        useWhiteText ? "text-white" : "text-gray-800",
                      )}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/my-bookings")}>
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="bg-[#0A3A20] hover:bg-[#072a17] text-white rounded-xl px-7 py-2 text-[15px] font-medium h-auto shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "md:hidden p-2 z-50",
            useWhiteText ? "text-white" : "text-gray-800",
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-6 md:hidden border-t border-gray-100 z-50">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (pathname === "/" && link.name === "Home");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium",
                    isActive ? "text-[#1b8a5a]" : "text-gray-800",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-2 pt-6 border-t border-gray-100 flex items-center justify-between">
            {isLogin ? (
              <div className="flex items-center gap-4 w-full">
                <Avatar className="w-12 h-12 border-2 border-[#0A3A20] rounded-lg overflow-hidden">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100"
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">US</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Link href="/profile" className="font-semibold text-gray-900">
                    Profile
                  </Link>
                  <Link href="/my-bookings" className="text-sm text-gray-500">
                    My Bookings
                  </Link>
                </div>
                <button className="text-gray-800 p-2 bg-gray-50 rounded-full hover:bg-gray-100">
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="w-full bg-[#0A3A20] hover:bg-[#072a17] text-white py-2 rounded-xl text-lg font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
