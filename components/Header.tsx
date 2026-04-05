"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-4">
          <img
            src="/l1.ico"
            alt="HealviaCare Logo"
            className="h-16 w-16 object-contain"
          />

          <div className="leading-tight">
            <h1 className="text-2xl font-bold text-[#1D646B]">
              HealviaCare
            </h1>
            <p className="text-sm text-gray-500">
              Your Health, Our Priority
            </p>
          </div>
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          <Link href="/" className="hover:text-[#1D646B] transition">Home</Link>
          <Link href="/blog" className="hover:text-[#1D646B] transition">Blog</Link>
          <Link href="/hospitals" className="hover:text-[#1D646B] transition">Partner Hospitals</Link>
          <Link href="/specialities" className="hover:text-[#1D646B] transition">Specialities</Link>
        </nav>

        {/* CTA BUTTON (FIXED ✅) */}
        <div>
          <Link
            href="/book-now"
            className="bg-[#1D646B] text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:bg-[#155a60] transition hover:scale-105 inline-block"
          >
            Free Consultation
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;