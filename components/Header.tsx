"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Partner Hospitals", href: "/hospitals" },
    { name: "Specialities", href: "/specialities" },
  ];

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-5 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 md:gap-4 group shrink-0">
          <img
            src="/l1.png"
            alt="HealviaCare Logo"
            className="h-10 w-10 md:h-16 md:w-16 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="leading-tight">
            <h1 className="text-lg md:text-2xl font-bold text-[#1D646B] tracking-tight">
              HealviaCare
            </h1>
            <p className="hidden xs:block text-[10px] md:text-sm text-gray-500 font-medium">
              Your Health, Our Priority
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-semibold">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-[#1D646B] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1D646B] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/auth"
            className="hidden sm:inline-block text-[#1D646B] border-2 border-[#1D646B] px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#1D646B] hover:text-white transition-all active:scale-95"
          >
            Login
          </Link>

          {/* RESPONSIVE CTA BUTTON */}
          <Link
            href="/book-now"
            className="bg-gradient-to-r from-[#1D646B] to-[#2D8E98] text-white 
                       px-3 py-2 text-xs 
                       md:px-6 md:py-3 md:text-sm 
                       rounded-lg md:rounded-xl font-bold shadow-lg hover:shadow-[#1D646B]/30 transition-all hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
          >
            Free Consultation
          </Link>

          {/* HAMBURGER ICON */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 md:p-2 text-[#1D646B] hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} className="md:w-7 md:h-7" /> : <Menu size={24} className="md:w-7 md:h-7" />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-[90]"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-[110] lg:hidden p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-[#1D646B] font-bold text-xl">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-4 rounded-xl text-gray-700 font-bold hover:bg-[#1D646B]/5 hover:text-[#1D646B] transition"
                  >
                    {link.name}
                    <ChevronRight size={18} className="opacity-50" />
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <Link
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-4 rounded-xl border-2 border-[#1D646B] text-[#1D646B] font-bold"
                >
                  Login / Sign Up
                </Link>
                <p className="text-center text-xs text-gray-400">
                  © 2026 HealviaCare.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;