"use client"
import Image from "next/image";
import Link from "next/link";
import { Globe, Share2, AtSign } from "lucide-react";

export default function Footer() {

 const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("submitted"); // debug

  const formData = new FormData(e.currentTarget);
  const email = formData.get("email");

  console.log({ email });
};

  return (
    <footer className="w-full bg-[#04281E] text-[#86A79C] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col space-y-8 lg:col-span-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 relative shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=100"
                  alt="Tee It Up Logo"
                  fill
                  className="object-cover rounded-full"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-xl font-bold leading-tight">Tee It Up</span>
                <span className="text-[10px] tracking-[0.2em] text-[#86A79C] uppercase font-bold mt-1">Book Tee Time</span>
              </div>
            </div>
            <p className="text-[15px] leading-relaxed max-w-sm">
              Connecting discerning players with the world&lsquo;s most prestigious private courses and golf communities.
            </p>
            <div className="flex items-center space-x-5 pt-2">
              <Link href="#" className="text-white hover:text-green-400 transition-colors">
                <Globe className="w-[22px] h-[22px]" />
              </Link>
              <Link href="#" className="text-white hover:text-green-400 transition-colors">
                <Share2 className="w-[22px] h-[22px]" />
              </Link>
              <Link href="#" className="text-white hover:text-green-400 transition-colors">
                <AtSign className="w-[22px] h-[22px]" />
              </Link>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col space-y-6 lg:col-span-2">
            <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase">Company</h3>
            <ul className="flex flex-col space-y-5 text-[15px]">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Career
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col space-y-6 lg:col-span-2">
            <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase">Support</h3>
            <ul className="flex flex-col space-y-5 text-[15px]">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Partner Clubs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-6 lg:col-span-3">
            <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase">Newsletter</h3>
            <p className="text-[15px] leading-relaxed">
              Get the latest tournament news and exclusive club invites.
            </p>
            <form className="flex flex-col space-y-3 mt-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-[15px] text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-[#648A7B]"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#F4F9F7] hover:bg-white text-[#04281E] font-semibold rounded-md px-4 py-3 text-[15px] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[13px] space-y-4 md:space-y-0">
          <p>© 2024 FairwayElite Modern Clubhouse. All rights reserved.</p>
          <div className="flex items-center space-x-12">
            <Link href="#" className="hover:text-white transition-colors leading-tight">
              Cookies<br />Settings
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}