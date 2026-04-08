"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f4fbfb] to-[#0F3D3E]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(29,100,107,0.25),transparent_60%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-bold text-[#1D646B] mb-3">
            HealviaCare
          </h2>

          <p className="text-gray-600 mb-3">
            Your Health, Our Priority
          </p>

          <p className="text-gray-500 text-sm mb-6">
            Simplifying surgical care with trusted doctors, advanced treatments,
            and complete patient support across India.
          </p>

          <div className="space-y-3 text-sm text-gray-600">
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
            <li><Link href="/#why-choose-us">About Us</Link></li>
            <li><Link href="/#talk-to-specialist">Contact Us</Link></li>
            <li><Link href="/book-now">Book Consultation</Link></li>
          </ul>
        </div>

        {/* TREATMENTS */}
        <div>
          <h3 className="text-lg font-semibold text-[#1D646B] mb-4">
            Our Treatments
          </h3>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li><Link href="/lasik">LASIK Eye Surgery</Link></li>
            <li><Link href="/cataract">Cataract Surgery</Link></li>
            <li><Link href="/urology">Urology (Kidney Stones)</Link></li>
            <li><Link href="/vascular">Vascular (Varicose Veins)</Link></li>
            <li><Link href="/orthopedics">Orthopedics</Link></li>
            <li><Link href="/gastro">Gastroenterology</Link></li>
            <li><Link href="/piles">Piles (Proctology)</Link></li>
            <li><Link href="/internalmedicine">Internal Medicine</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-[#1D646B] mb-4">
            Need Help?
          </h3>

          <p className="text-gray-600 text-sm mb-5">
            Talk to our medical experts and get guidance for the right treatment.
            We’re available 24/7 for your support.
          </p>

          <Link href="/book-now">
            <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white text-sm font-semibold shadow hover:scale-105 transition">
              Book Free Consultation
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
          500+ Doctors | NABH Hospitals | 24/7 Patient Support
        </div>
      </div>

    </footer>
  );
}