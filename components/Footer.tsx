"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* BACKGROUND MIX (WHITE + GREEN REFLECTION) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f4fbfb] to-[#0F3D3E]"></div>

      {/* SOFT GREEN OVERLAY */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(29,100,107,0.25),transparent_60%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-bold text-[#1D646B] mb-3">
            HealviaCare
          </h2>

          <p className="text-gray-600 mb-4">
            Your Health, Our Priority
          </p>

          <p className="text-gray-500 text-sm mb-6">
            Simplifying surgical care with trusted doctors and seamless support.
          </p>

          <div className="space-y-3 text-sm text-gray-600">

            <div className="flex items-center gap-2">
              <Phone size={16} /> 8700508321
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} /> info@healviacare.in
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} /> India
            </div>

          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-[#1D646B] mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/treatments">Treatments</Link></li>
            <li><Link href="/hospitals">Hospitals</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-lg font-semibold text-[#1D646B] mb-4">
            Treatments
          </h3>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li>LASIK</li>
            <li>Piles</li>
            <li>Cataract</li>
            <li>Sinus</li>
            <li>Rhinoplasty</li>
          </ul>
        </div>

        {/* EXTRA */}
        <div>
          <h3 className="text-lg font-semibold text-[#1D646B] mb-4">
            Support
          </h3>

          <p className="text-gray-600 text-sm mb-4">
            We are here to assist you with all your healthcare needs.
          </p>

          <Link href="/contact">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white text-sm font-semibold shadow hover:scale-105 transition">
              Contact Support
            </button>
          </Link>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="relative z-10 border-t border-white/30 mx-6"></div>

      {/* BOTTOM */}
      <div className="relative z-10 text-center py-6 text-sm text-gray-600">
        © 2026 HealviaCare. All rights reserved.
        <div className="mt-2 text-xs text-gray-500">
          Partnered with leading hospitals & certified doctors
        </div>
      </div>

    </footer>
  );
}