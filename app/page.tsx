"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

import {
  Eye,
  Droplets,
  HeartPulse,
  Bone,
  Brain,
  Stethoscope,
  Hospital,
} from "lucide-react";

import {
  UserGroupIcon,
  ClockIcon,
  BuildingOffice2Icon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/solid";

/* ---------------- SERVICES DATA ---------------- */
const services = [
  {
    title: "LASIK Eye Surgery",
    desc: "Freedom from glasses with SMILE Pro & Contoura Vision.",
    icon: Eye,
    href: "/lasik",
    color: "bg-[#E6F7F5]",
  },
  {
    title: "Cataract Surgery",
    desc: "Micro-incision surgery with premium lens options.",
    icon: Eye,
    href: "/cataract",
    color: "bg-[#EAF2FF]",
  },
  {
    title: "Urology",
    desc: "Laser treatment for Kidney Stones & Prostate.",
    icon: Droplets,
    href: "/urology",
    color: "bg-[#FFF4E6]",
  },
  {
    title: "Vascular Surgery",
    desc: "Modern Laser treatment for Varicose Veins & DVT.",
    icon: HeartPulse,
    href: "/vascular",
    color: "bg-[#FFECEF]",
  },
  {
    title: "Orthopedics",
    desc: "Knee/Hip Replacement & Spine Surgery.",
    icon: Bone,
    href: "/orthopedics",
    color: "bg-[#F1F5FF]",
  },
  {
    title: "Gastroenterology",
    desc: "Endoscopy, Colonoscopy & Liver care.",
    icon: Stethoscope,
    href: "/gastro",
    color: "bg-[#F0FFF4]",
  },
  {
    title: "Neurology",
    desc: "Stroke, Epilepsy & Brain treatments.",
    icon: Brain,
    href: "/neurology",
    color: "bg-[#F5F3FF]",
  },
  {
    title: "Internal Medicine",
    desc: "Typhoid, Dengue & General Admissions.",
    icon: Hospital,
    href: "/internalmedicine",
    color: "bg-[#FFF0F6]",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
      </section>

      {/* ---------------- SERVICES SECTION ---------------- */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-14">
          <h2 className="text-4xl font-bold text-[#1D646B]">
            Our Specialities
          </h2>
          <p className="text-slate-500 mt-3">
            Advanced surgical solutions for all your medical needs
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;

            return (
              <Link key={i} href={s.href}>
                <div className="group p-6 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full">
                  
                  <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-5 ${s.color} group-hover:scale-110 transition`}>
                    <Icon size={28} className="text-[#1D646B]" />
                  </div>

                  <h3 className="text-lg font-bold text-[#1D646B] mb-2">
                    {s.title}
                  </h3>

                  <p className="text-slate-500 text-sm mb-6 flex-grow">
                    {s.desc}
                  </p>

                  <div className="text-xs font-bold text-[#1D646B] uppercase">
                    Consult Now →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US (UPDATED MERGED VERSION) ---------------- */}
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-[#f8fbfb] to-[#eef6f6]">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1D646B]">
            Why Choose HealviaCare?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Expert Doctors",
              desc: "Connect with 500+ verified specialists for accurate and trusted treatment.",
              icon: <UserGroupIcon className="w-8 h-8 text-[#1D646B]" />,
            },
            {
              title: "Instant Callback",
              desc: "Get a call within 5–10 minutes and skip long waiting times.",
              icon: <ClockIcon className="w-8 h-8 text-[#1D646B]" />,
            },
            {
              title: "Trusted Hospitals",
              desc: "Partnered with NABH accredited hospitals across India.",
              icon: <BuildingOffice2Icon className="w-8 h-8 text-[#1D646B]" />,
            },
            {
              title: "Affordable Care",
              desc: "Transparent pricing with zero hidden costs.",
              icon: <CurrencyRupeeIcon className="w-8 h-8 text-[#1D646B]" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative rounded-3xl p-[2px] bg-gradient-to-br from-[#1D646B]/20 via-[#2D8E98]/20 to-[#7BC6A1]/20 hover:from-[#1D646B] hover:to-[#2D8E98] transition-all duration-500"
            >
              
              <div className="bg-white rounded-3xl p-8 text-center shadow-md group-hover:shadow-[0_20px_50px_rgba(29,100,107,0.25)] transition-all duration-500 group-hover:-translate-y-2">
                
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-[#1D646B]/10 group-hover:bg-[#1D646B]/20 transition">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-[#1D646B] mb-2 group-hover:text-[#2D8E98] transition">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm">
                  {item.desc}
                </p>
              </div>

              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-[#2D8E98]/30 -z-10"></div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- MISSION SECTION ---------------- */}
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-white to-[#f6fbfb]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1D646B]">Our Mission</h2>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
            Delivering accessible, affordable, and high-quality healthcare with compassion and trust.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#E6F7F5] mb-6 group-hover:scale-110 transition">💙</div>
            <h3 className="text-xl font-bold text-[#1D646B] mb-3">Patient First</h3>
            <p className="text-slate-500 text-sm">Every decision is centered around patient comfort, safety, and satisfaction.</p>
          </div>
          <div className="group bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#EAF2FF] mb-6 group-hover:scale-110 transition">🛡️</div>
            <h3 className="text-xl font-bold text-[#1D646B] mb-3">Transparent Care</h3>
            <p className="text-slate-500 text-sm">Honest guidance, clear pricing, and zero hidden surprises throughout your journey.</p>
          </div>
          <div className="group bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#FFF4E6] mb-6 group-hover:scale-110 transition">🏥</div>
            <h3 className="text-xl font-bold text-[#1D646B] mb-3">Seamless Experience</h3>
            <p className="text-slate-500 text-sm">From consultation to recovery, we handle everything for a stress-free experience.</p>
          </div>
        </div>
      </section>

      {/* ---------------- OUR VISION SECTION ---------------- */}
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-[#f6fbfb] to-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1D646B]">Our Vision</h2>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
            Transforming healthcare through innovation, trust, and patient-first technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-3xl p-8 bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D646B] to-[#3BA99C] opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#E6F7F5] mb-6 group-hover:bg-white/20 group-hover:scale-110 transition">🌍</div>
              <h3 className="text-xl font-bold text-[#1D646B] group-hover:text-white mb-3 transition">Accessible Healthcare</h3>
              <p className="text-slate-500 group-hover:text-white/90 text-sm transition">Making quality healthcare reachable for every individual across cities and towns.</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-3xl p-8 bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D646B] to-[#3BA99C] opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#E8FFF5] mb-6 group-hover:bg-white/20 group-hover:scale-110 transition">⚙️</div>
              <h3 className="text-xl font-bold text-[#1D646B] group-hover:text-white mb-3 transition">Innovation Driven</h3>
              <p className="text-slate-500 group-hover:text-white/90 text-sm transition">Leveraging technology to simplify medical journeys and improve outcomes.</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-3xl p-8 bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D646B] to-[#3BA99C] opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#F0FFF4] mb-6 group-hover:bg-white/20 group-hover:scale-110 transition">🤝</div>
              <h3 className="text-xl font-bold text-[#1D646B] group-hover:text-white mb-3 transition">Trusted Care</h3>
              <p className="text-slate-500 group-hover:text-white/90 text-sm transition">Building long-term trust through transparency, empathy, and expert care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- OUR VALUES SECTION ---------------- */}
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-white to-[#f4fbfb]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1D646B]">Our Values</h2>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
            Our core principles ensure every patient receives trusted, transparent, and world-class healthcare.
          </p>
        </div>
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          <div className="flex gap-6 w-max animate-scroll">
            <div className="value-card"><div className="icon">❤️</div><h3>Compassion</h3><p>We treat every patient with care, empathy, and respect.</p></div>
            <div className="value-card green"><div className="icon">🤝</div><h3>Trust</h3><p>We build strong relationships through honesty and reliability.</p></div>
            <div className="value-card"><div className="icon">⚡</div><h3>Efficiency</h3><p>Quick and seamless healthcare services without delays.</p></div>
            <div className="value-card light"><div className="icon">🔍</div><h3>Transparency</h3><p>No hidden costs, no confusion — just clear communication.</p></div>
            <div className="value-card"><div className="icon">🏥</div><h3>Excellence</h3><p>Top-quality treatments delivered by expert doctors.</p></div>
            <div className="value-card green"><div className="icon">💡</div><h3>Innovation</h3><p>Modern technology to improve patient outcomes.</p></div>
            {/* Duplicates for looping */}
            <div className="value-card"><div className="icon">❤️</div><h3>Compassion</h3><p>We treat every patient with care, empathy, and respect.</p></div>
            <div className="value-card green"><div className="icon">🤝</div><h3>Trust</h3><p>We build strong relationships through honesty and reliability.</p></div>
          </div>
        </div>
      </section>

      {/* ---------------- PATIENT EXPERIENCES ---------------- */}
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-br from-[#f8fbfb] to-[#eef6f6]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#1D646B] mb-6">Real Patient Experiences</h2>
            <p className="text-slate-500 text-lg mb-8 max-w-md">Hear directly from our patients about their treatment journey with HealviaCare.</p>
            <Link href="/testimonials">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white font-semibold shadow-lg hover:scale-105 transition">
                Book Free Consultation
              </button>
            </Link>
          </div>
          <div className="relative flex items-center justify-center">
            <Link href="/testimonials">
              <div className="relative w-[260px] h-[420px] rounded-3xl overflow-hidden shadow-xl group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[#cfeeee] to-[#e6f7f5]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/70 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition">▶</div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-md rounded-xl px-4 py-2 text-sm font-semibold text-[#1D646B]">LASIK Patient Story</div>
              </div>
            </Link>
            <Link href="/testimonials">
              <div className="absolute bottom-0 left-0 translate-x-[-40%] translate-y-[30%] w-[180px] h-[260px] rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[#dff7f5] to-[#f0fffc]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition">▶</div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/70 backdrop-blur-md rounded-lg px-3 py-1 text-xs font-semibold text-[#1D646B]">Piles Patient Story</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- CTA SECTION ---------------- */}
      <section className="relative py-28 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D3E] via-[#145A5C] to-[#1D646B]"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0F3D3E]/80 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Talk to a Specialist Today</h2>
          <p className="text-lg text-white/80 mb-10">Get expert guidance for the right treatment from trusted doctors.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            <Link href="/contact">
              <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#1D646B] to-[#3BA99C] text-white font-semibold shadow-xl hover:scale-105 transition">
                Book Free Consultation
              </button>
            </Link>
            <a href="tel:8700508321">
              <button className="px-10 py-4 rounded-xl bg-black/40 backdrop-blur-md text-white font-semibold shadow-xl hover:scale-105 transition">
                Call Now: 8700508321
              </button>
            </a>
          </div>
          <p className="text-white/70 text-sm tracking-wide">
            No cost consultation&nbsp;&nbsp;|&nbsp;&nbsp;Quick response&nbsp;&nbsp;|&nbsp;&nbsp;100% assistance
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}