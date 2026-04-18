"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
  ChevronDown,
  BadgeCheck,
  Heart,
  Stethoscope,
  Award,
  Users,
  TrendingUp,
  Sun,
  Moon,
  Activity,
  Mail,
  MapPin,
  Play,
  Quote,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Animated counter hook ─────────────────────────────────────────────────
function useCounter(end: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);
  return count;
}

// ─── Stat Counter Component ────────────────────────────────────────────────
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(value, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-[#0f8a7e] lg:text-5xl">
        {count}{suffix}
      </div>
      <div className="mt-1.5 text-sm font-medium text-slate-500">{label}</div>
    </div>
  );
}

// ─── FAQ Item ──────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${open ? "border-[#146b63]/30 bg-emerald-50/50 shadow-md" : "border-slate-200 bg-white"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-slate-800 text-sm leading-snug">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#146b63] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-6 pb-5 text-sm leading-7 text-slate-600">{a}</p>
      </div>
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────
function TestimonialCard({ name, city, text, rating, procedure }: {
  name: string; city: string; text: string; rating: number; procedure: string;
}) {
  return (
    <div className="rounded-[1.75rem] bg-white p-6 shadow-md border border-slate-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
        ))}
        <span className="ml-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">{procedure}</span>
      </div>
      <Quote size={20} className="text-emerald-200 mb-3" />
      <p className="text-sm leading-7 text-slate-600 italic">{text}</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{name}</p>
          <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} />{city}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function LasikIclLandingPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [insurance, setInsurance] = useState<"yes" | "no" | "">("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // ── scroll reveal ──
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    setPhoneError("");
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([{
        name,
        phone,
        city,
        insurance: insurance || "not specified",
        service: "LASIK & ICL",
        source: "landing-page-lasik-icl",
      }]);
      if (error) throw error;
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please call us directly at 8882804301.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "Is LASIK or ICL painful?",
      a: "No — both procedures use numbing eye drops and take under 30 minutes. Most patients are surprised by how comfortable the experience is. You may feel mild pressure briefly, but no pain.",
    },
    {
      q: "How do I know which procedure is right for me?",
      a: "Your corneal thickness, spectacle power, dry-eye status, and lifestyle determine the best fit. Our specialists conduct a comprehensive 90-minute eye mapping before recommending LASIK or ICL.",
    },
    {
      q: "How long is recovery — can I return to work next day?",
      a: "Most LASIK patients see clearly within 24–48 hours and return to desk work the next day. ICL recovery is equally smooth. Strenuous activity resumes in 1 week.",
    },
    {
      q: "What is the minimum / maximum age for LASIK or ICL?",
      a: "LASIK requires stable power for 1+ year, typically from age 18. ICL is popular for 21–45 year olds, especially those with high powers not suitable for LASIK. Upper age limit depends on lens health.",
    },
    {
      q: "Does health insurance cover the cost?",
      a: "Standard insurance rarely covers elective vision correction. However, some corporate plans do — we check your coverage during the first consultation at no charge.",
    },
    {
      q: "What if I'm not eligible for LASIK?",
      a: "ICL is an excellent alternative for thin corneas, very high powers, or dry eyes. During screening, we evaluate both options and present the safest recommendation with no pressure.",
    },
    {
      q: "Are the results permanent?",
      a: "LASIK reshapes the cornea permanently. ICL is a removable implant, though most patients enjoy it for life. Natural age-related changes (like presbyopia after 40) are separate from the correction.",
    },
    {
      q: "How safe is LASIK in 2024?",
      a: "FDA-cleared for over 25 years, LASIK has a 96%+ satisfaction rate — the highest of any elective surgery. Advanced platforms like SMILE Pro and Contoura Vision have made it even safer and more precise.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Mehta",
      city: "Delhi",
      text: "I had -6.5 power in both eyes. After LASIK at Healviacare, I woke up the next morning with 6/6 vision. The team was incredibly calm and professional throughout.",
      rating: 5,
      procedure: "LASIK",
    },
    {
      name: "Rohan Sharma",
      city: "Gurugram",
      text: "I was told I wasn't eligible for LASIK due to thin corneas. Healviacare recommended ICL and it completely changed my life. 20/20 without any glasses — unbelievable.",
      rating: 5,
      procedure: "ICL",
    },
    {
      name: "Ananya Kapoor",
      city: "Noida",
      text: "The screening was so thorough. They mapped 22,000 points on my cornea. I felt completely confident going into surgery. Zero pain, back to work in two days.",
      rating: 5,
      procedure: "Contoura LASIK",
    },
  ];

  return (
    <main className="bg-[#f7f7fb] text-slate-900 overflow-x-hidden">
      <Header />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* HERO                                                              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#061a19] via-[#0a2e2b] to-[#0d3a36]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#0f8a7e]/20 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#146b63]/20 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT: Hero content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 backdrop-blur">
                <Sparkles size={13} />
                Advanced Vision Correction · HealviaCare
              </div>

              <div>
                <h1 className="text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-[5.5rem]">
                  See Life<br />
                  <span className="bg-gradient-to-r from-[#0f8a7e] to-emerald-400 bg-clip-text text-transparent">
                    Without Limits.
                  </span>
                </h1>
                <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
                  LASIK and ICL vision correction by India&apos;s top ophthalmologists.
                  Walk in wearing glasses — walk out seeing the world in HD.
                  Painless. Precise. Permanent.
                </p>
              </div>

              {/* Quick trust badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Zap size={13} />, label: "15-min Procedure" },
                  { icon: <ShieldCheck size={13} />, label: "FDA Cleared" },
                  { icon: <BadgeCheck size={13} />, label: "98% Success Rate" },
                  { icon: <Activity size={13} />, label: "Back to Work Next Day" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur"
                  >
                    <span className="text-emerald-400">{b.icon}</span>
                    {b.label}
                  </div>
                ))}
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
                    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80",
                    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&q=80",
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80",
                  ].map((src, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-[#0a2e2b] overflow-hidden">
                      <Image src={src} alt="patient" width={36} height={36} className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">50,000+ patients trust HealviaCare</p>
                </div>
              </div>

              {/* CTA on desktop */}
              <div className="hidden lg:flex items-center gap-4">
                <a
                  href="tel:8882804301"
                  className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#146b63] shadow-lg transition hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Phone size={16} />
                  Call 8882804301
                </a>
                <button
                  onClick={() => document.getElementById("procedures")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  <Play size={14} className="fill-white" />
                  See Procedures
                </button>
              </div>
            </div>

            {/* RIGHT: Hero form */}
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#0f8a7e]/30 to-emerald-400/10 blur-2xl" />

              {submitted ? (
                <div className="relative rounded-[2rem] bg-white p-10 shadow-2xl text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 size={40} className="text-[#146b63]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Consultation Booked!</h3>
                  <p className="mt-3 text-slate-500 leading-7">
                    Our vision specialist will call you within <strong className="text-[#146b63]">30 minutes</strong> to schedule your comprehensive eye evaluation.
                  </p>
                  <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
                    <p className="text-sm text-emerald-700 font-semibold">📞 Or call us directly</p>
                    <p className="text-lg font-black text-[#146b63] mt-1">8882804301</p>
                    <p className="text-xs text-slate-400">Mon–Sat · 8am–8pm · Toll-free</p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative rounded-[2rem] bg-white p-7 shadow-2xl sm:p-8"
                >
                  {/* Form header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 mb-3">
                      <Clock3 size={12} />
                      Free · Takes 30 seconds · No spam
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">
                      Book Free Consultation
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Get a personalised LASIK / ICL recommendation in 24 hours
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-[#146b63] focus:ring-2 focus:ring-[#146b63]/15"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                        Mobile Number <span className="text-red-500 normal-case">*required</span>
                      </label>
                      <div className="flex">
                        <span className="flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-3 text-sm font-semibold text-slate-500">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit mobile number"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                            setPhoneError("");
                          }}
                          className="flex-1 rounded-r-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-[#146b63] focus:ring-2 focus:ring-[#146b63]/15"
                        />
                      </div>
                      {phoneError && <p className="mt-1.5 text-xs text-red-500">{phoneError}</p>}
                    </div>

                    {/* City */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Your city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-[#146b63] focus:ring-2 focus:ring-[#146b63]/15"
                      />
                    </div>

                    {/* Insurance toggle */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <ShieldCheck size={13} className="text-[#146b63]" />
                        Do you have health insurance?
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setInsurance("yes")}
                          className={`rounded-xl py-3 text-sm font-bold transition-all ${
                            insurance === "yes"
                              ? "bg-[#146b63] text-white shadow-md"
                              : "border border-slate-200 bg-white text-slate-500 hover:border-[#146b63]/40"
                          }`}
                        >
                          ✓ Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setInsurance("no")}
                          className={`rounded-xl py-3 text-sm font-bold transition-all ${
                            insurance === "no"
                              ? "bg-slate-700 text-white shadow-md"
                              : "border border-slate-200 bg-white text-slate-500 hover:border-slate-400"
                          }`}
                        >
                          ✗ No
                        </button>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0f8a7e] to-[#146b63] px-5 py-4 font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:shadow-xl hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <><div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Booking...</>
                      ) : (
                        <><Phone size={17} /> Get Free Callback Now <ArrowRight size={17} /></>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                      <ShieldCheck size={11} />
                      100% confidential · No spam calls · Cancel anytime
                    </p>
                  </div>
                </form>
              )}

              {/* Contact strip below form */}
              <div className="relative mt-4 grid grid-cols-3 gap-3">
                {[
                  { icon: <Phone size={15} />, label: "Helpline", value: "8882804301" },
                  { icon: <Mail size={15} />, label: "Email", value: "info@healviacare.in" },
                  { icon: <Clock3 size={15} />, label: "Hours", value: "Mon–Sat 8–8" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/90 backdrop-blur p-3 text-center shadow border border-white">
                    <span className="text-[#146b63] flex justify-center mb-1">{item.icon}</span>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                    <p className="text-xs font-bold text-slate-700 leading-tight mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ANIMATED STATS                                                    */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 shadow-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCounter value={50000} suffix="+" label="Happy Patients" />
            <StatCounter value={98} suffix="%" label="Success Rate" />
            <StatCounter value={15} suffix=" yrs" label="Clinical Experience" />
            <StatCounter value={25} suffix="+" label="Cities Served" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* WHY HEALVIACARE                                                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 items-center">
            {/* Image collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-3xl h-52 shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1588776814546-ec7e84c1c4b3?w=600&q=80"
                      alt="Eye examination"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl h-36 shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1579154235828-ac51edfb3983?w=600&q=80"
                      alt="LASIK surgery"
                      width={400}
                      height={220}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-3xl h-36 shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80"
                      alt="ICL procedure"
                      width={400}
                      height={220}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl h-52 shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80"
                      alt="Happy patient"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Award size={24} className="text-[#146b63]" />
                </div>
                <div>
                  <p className="font-black text-slate-900">NABH Accredited</p>
                  <p className="text-xs text-slate-400">All partner hospitals</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-5">
                <Heart size={12} />
                Why 50,000+ patients choose us
              </div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">
                Vision Care That <span className="text-[#0f8a7e]">Puts You First.</span>
              </h2>
              <p className="mt-5 text-slate-600 leading-7">
                We don&apos;t just perform surgery — we walk with you through every step. From the first call to your last follow-up, our team is committed to outcomes that change lives.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: <Eye size={20} />,
                    title: "22,000-point Corneal Mapping",
                    desc: "Contoura Vision topography creates a precise fingerprint of your eye for a personalised treatment plan.",
                  },
                  {
                    icon: <ShieldCheck size={20} />,
                    title: "Zero Surprise Pricing",
                    desc: "Fixed all-inclusive packages. What we quote is what you pay — nothing hidden, ever.",
                  },
                  {
                    icon: <Users size={20} />,
                    title: "Dedicated Patient Coordinator",
                    desc: "A single point of contact manages your appointment, paperwork, insurance, and follow-ups.",
                  },
                  {
                    icon: <TrendingUp size={20} />,
                    title: "Lifetime Enhancement Policy",
                    desc: "If your vision changes over time and you need a touch-up, we cover the enhancement at no extra cost.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-[#146b63] flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PROCEDURES                                                        */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section id="procedures" className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-4">
              <Stethoscope size={12} />
              Procedures
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Two Paths to <span className="text-[#0f8a7e]">Perfect Vision</span>
            </h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              Not everyone is the same. That&apos;s why we offer both — and help you choose the right one after a thorough evaluation.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* LASIK card */}
            <div className="group rounded-[2rem] overflow-hidden bg-white shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1579154235828-ac51edfb3983?w=1200&q=80"
                  alt="LASIK Procedure"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
                    LASIK
                  </span>
                </div>
                <div className="absolute top-5 right-5 rounded-xl bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-bold text-slate-700">
                  From ₹25,000/eye
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-slate-900">Laser Vision Correction</h3>
                <p className="mt-3 text-slate-600 leading-7 text-sm">
                  A 15-minute procedure where a cool laser beam reshapes your cornea to correct your spectacle power permanently. The most popular vision correction surgery worldwide.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    "SMILE Pro (Flapless)",
                    "Contoura Vision",
                    "Bladeless LASIK",
                    "Standard LASIK",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={14} className="text-[#146b63] flex-shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { icon: <Sun size={13} />, text: "Next-day recovery" },
                    { icon: <Eye size={13} />, text: "Permanent correction" },
                    { icon: <Zap size={13} />, text: "Painless" },
                  ].map((b) => (
                    <span key={b.text} className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      {b.icon}{b.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ICL card */}
            <div className="group rounded-[2rem] overflow-hidden bg-[#061a19] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80"
                  alt="ICL Procedure"
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a19]/80 via-[#061a19]/20 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full bg-teal-400 px-3 py-1 text-xs font-black uppercase tracking-widest text-slate-900">
                    ICL
                  </span>
                </div>
                <div className="absolute top-5 right-5 rounded-xl bg-white/15 backdrop-blur px-3 py-1.5 text-xs font-bold text-white">
                  From ₹75,000/eye
                </div>
              </div>
              <div className="p-8 text-white">
                <h3 className="text-2xl font-black">Implantable Contact Lens</h3>
                <p className="mt-3 text-slate-300 leading-7 text-sm">
                  A premium micro-lens is implanted inside the eye — ideal for patients with thin corneas, very high powers, or dry eyes who are not suitable for LASIK.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    "EVO Visian ICL",
                    "High Myopia Fix",
                    "Reversible Implant",
                    "UV Protection",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle2 size={14} className="text-teal-400 flex-shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { icon: <Moon size={13} />, text: "Thin corneas OK" },
                    { icon: <ShieldCheck size={13} />, text: "High powers" },
                    { icon: <Heart size={13} />, text: "Reversible" },
                  ].map((b) => (
                    <span key={b.text} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-teal-300">
                      {b.icon}{b.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 px-6 text-left font-bold text-slate-500 bg-slate-50">Feature</th>
                  <th className="py-4 px-6 text-center font-black text-[#146b63]">LASIK</th>
                  <th className="py-4 px-6 text-center font-black text-slate-900">ICL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Procedure Time", "15 minutes", "20–30 minutes"],
                  ["Power Range", "Up to -10D", "Up to -20D"],
                  ["Thin Corneas", "Not suitable", "Ideal option"],
                  ["Dry Eyes", "Worsens slightly", "No impact"],
                  ["Reversible", "No (permanent)", "Yes"],
                  ["Recovery", "24–48 hours", "2–5 days"],
                ].map(([feature, lasik, icl], i) => (
                  <tr key={i} className={i % 2 === 0 ? "" : "bg-slate-50/50"}>
                    <td className="py-3.5 px-6 font-medium text-slate-700">{feature}</td>
                    <td className="py-3.5 px-6 text-center text-[#146b63] font-semibold">{lasik}</td>
                    <td className="py-3.5 px-6 text-center text-slate-700 font-semibold">{icl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS                                                      */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-4">
              <FileText size={12} />
              Your Journey
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              From Glasses to Freedom — <span className="text-[#0f8a7e]">5 Simple Steps</span>
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-200 to-transparent hidden lg:block" />

            <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-4">
              {[
                { step: "01", icon: <Phone size={22} />, title: "Enquiry", desc: "Share your phone number. Our coordinator calls within 30 min." },
                { step: "02", icon: <Eye size={22} />, title: "Eye Screening", desc: "90-min comprehensive evaluation — corneal mapping, dry eye test, power check." },
                { step: "03", icon: <FileText size={22} />, title: "Recommendation", desc: "Doctor presents LASIK vs ICL options with clear reasoning — no pressure." },
                { step: "04", icon: <Zap size={22} />, title: "Procedure Day", desc: "Arrive, relax, and walk out in 2 hours with transformed vision." },
                { step: "05", icon: <Heart size={22} />, title: "Follow-up Care", desc: "3 post-op visits included. Lifetime enhancement policy for eligible cases." },
              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0f8a7e] to-[#146b63] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4">
                    {s.icon}
                  </div>
                  <span className="text-xs font-black text-slate-300 mb-1">{s.step}</span>
                  <h4 className="font-black text-slate-900">{s.title}</h4>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-[160px]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* LIFE AFTER LASIK                                                  */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 bg-gradient-to-br from-[#061a19] to-[#0a2e2b]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              <Sparkles size={12} />
              Life After Surgery
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white">
              What You Gain is More Than Vision
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Our patients describe it as one of the best decisions of their lives.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { emoji: "🏊", title: "Sports & Adventure", desc: "Swim, dive, run, and travel without glasses or contacts getting in the way." },
              { emoji: "💼", title: "Professional Confidence", desc: "Walk into every meeting and presentation looking your absolute best." },
              { emoji: "😴", title: "Wake Up Seeing", desc: "Open your eyes each morning to crystal-clear vision — no fumbling for glasses." },
              { emoji: "💰", title: "Save ₹40,000+ Per Year", desc: "Stop spending on glasses, frames, contacts, and solutions every year." },
            ].map((b) => (
              <div key={b.title} className="rounded-[1.75rem] bg-white/5 border border-white/10 backdrop-blur p-6 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4">{b.emoji}</div>
                <h4 className="font-black text-white text-lg">{b.title}</h4>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Hero lifestyle image */}
          <div className="mt-10 overflow-hidden rounded-[2rem] h-72 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80"
              alt="Freedom after LASIK"
              width={1600}
              height={500}
              className="w-full h-full object-cover object-center opacity-80"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS                                                      */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-4">
              <Star size={12} />
              Patient Stories
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Real Patients. <span className="text-[#0f8a7e]">Real Results.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>

          {/* Google rating bar */}
          <div className="mt-10 flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg">4.9 / 5.0</p>
                <p className="text-xs text-slate-500">Google Rating · 2,800+ reviews</p>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div className="text-center">
              <p className="font-black text-slate-900 text-lg">96%</p>
              <p className="text-xs text-slate-500">Would recommend to family</p>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div className="text-center">
              <p className="font-black text-slate-900 text-lg">50,000+</p>
              <p className="text-xs text-slate-500">Successful procedures</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* PRICING                                                           */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Transparent, <span className="text-[#0f8a7e]">All-Inclusive Pricing</span>
            </h2>
            <p className="mt-3 text-slate-500">No hidden costs. No surprise bills. Everything included.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Standard LASIK", price: "₹25,000", per: "per eye", features: ["Bladeless LASIK", "Pre-op screening", "1 year follow-up", "Protective glasses"], highlight: false },
              { name: "Contoura Vision", price: "₹45,000", per: "per eye", features: ["22,000-pt mapping", "Superior sharpness", "Lifetime enhancement", "VIP coordinator"], highlight: true },
              { name: "EVO ICL", price: "₹75,000", per: "per eye", features: ["Premium micro-lens", "High power eligible", "Reversible implant", "Priority scheduling"], highlight: false },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[2rem] p-7 shadow-lg transition-all hover:-translate-y-1 ${
                  plan.highlight
                    ? "bg-gradient-to-br from-[#0f8a7e] to-[#146b63] text-white shadow-emerald-900/20"
                    : "bg-white border border-slate-100"
                }`}
              >
                {plan.highlight && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white mb-4">
                    <Star size={11} className="fill-white" />
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-black ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-[#146b63]"}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? "text-white/70" : "text-slate-400"}`}>{plan.per}</span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-white/90" : "text-slate-600"}`}>
                      <CheckCircle2 size={14} className={plan.highlight ? "text-emerald-200" : "text-[#146b63]"} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })}
                  className={`mt-6 w-full rounded-xl py-3 text-sm font-bold transition ${
                    plan.highlight
                      ? "bg-white text-[#146b63] hover:bg-emerald-50"
                      : "bg-[#146b63] text-white hover:bg-[#0f5751]"
                  }`}
                >
                  Get Free Evaluation
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} className="text-[#146b63]" />
              <div>
                <p className="font-bold text-slate-900">Easy EMI Available</p>
                <p className="text-sm text-slate-500">0% interest · 6–24 months · Instant approval</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BadgeCheck size={24} className="text-[#146b63]" />
              <div>
                <p className="font-bold text-slate-900">Insurance Assistance</p>
                <p className="text-sm text-slate-500">We verify your policy coverage for free</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* FAQ                                                               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Questions We Get <span className="text-[#0f8a7e]">Every Day</span>
            </h2>
            <p className="mt-3 text-slate-500">Straight answers. No medical jargon.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* FINAL CTA                                                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section id="final-cta" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#061a19] via-[#0a2e2b] to-[#0f5751]">
            {/* Background texture */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#0f8a7e]/20 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-[80px]" />

            <div className="relative grid gap-12 p-10 lg:grid-cols-2 lg:p-16 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-6">
                  ⏰ Limited slots — Book today
                </div>
                <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                  Stop Adjusting<br />
                  <span className="text-emerald-400">Your Glasses.</span><br />
                  Start Living.
                </h2>
                <p className="mt-5 text-slate-300 leading-7">
                  Join 50,000 people who chose clarity over compromise. Your comprehensive evaluation — worth ₹2,000 — is completely free when you book today.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    "Free 90-minute eye evaluation (₹2,000 value)",
                    "Expert LASIK vs ICL recommendation",
                    "Insurance and EMI assistance on same day",
                    "No obligation — decide at your own pace",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-white/90">
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-4 flex-wrap">
                  <a
                    href="tel:8882804301"
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[#146b63] shadow-lg hover:shadow-xl transition hover:-translate-y-0.5"
                  >
                    <Phone size={16} />
                    Call 8882804301
                  </a>
                  <a
                    href="mailto:info@healviacare.in"
                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white hover:bg-white/20 transition"
                  >
                    <Mail size={16} />
                    Email Us
                  </a>
                </div>
              </div>

              {/* Repeat form */}
              {submitted ? (
                <div className="rounded-[2rem] bg-white p-8 text-center">
                  <CheckCircle2 size={48} className="text-[#146b63] mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-slate-900">We&apos;ll Call You Soon!</h3>
                  <p className="mt-2 text-slate-500 text-sm">Expect a call within 30 minutes from our vision specialist.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-7 shadow-2xl">
                  <h3 className="text-xl font-black text-slate-900 mb-5">
                    Claim Your <span className="text-[#146b63]">Free Evaluation</span>
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none focus:border-[#146b63] focus:ring-2 focus:ring-[#146b63]/15 transition"
                    />
                    <div className="flex">
                      <span className="flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-3 text-sm font-semibold text-slate-500">🇮🇳 +91</span>
                      <input
                        type="tel"
                        required
                        placeholder="Mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="flex-1 rounded-r-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none focus:border-[#146b63] focus:ring-2 focus:ring-[#146b63]/15 transition"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setInsurance("yes")}
                        className={`rounded-xl py-3 text-sm font-bold transition ${insurance === "yes" ? "bg-[#146b63] text-white" : "border border-slate-200 bg-slate-50 text-slate-500"}`}
                      >
                        ✓ Have Insurance
                      </button>
                      <button
                        type="button"
                        onClick={() => setInsurance("no")}
                        className={`rounded-xl py-3 text-sm font-bold transition ${insurance === "no" ? "bg-slate-700 text-white" : "border border-slate-200 bg-slate-50 text-slate-500"}`}
                      >
                        No Insurance
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0f8a7e] to-[#146b63] px-5 py-4 font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
                    >
                      {loading ? "Booking..." : <><Phone size={16} /> Book Free Consultation <ArrowRight size={16} /></>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}