"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import {
  MapPin,
  ShieldCheck,
  Phone,
  ArrowRight,
  Star,
  Sparkles,
  CheckCircle2,
  Hospital,
  Zap,
  Eye,
  Clock3,
  Mail,
  BadgeCheck,
  ClipboardList,
  HeartPulse,
} from "lucide-react";

type CityKey = "delhi" | "mumbai";

type CityConfig = {
  name: string;
  shortName: string;
  headline: string;
  subheadline: string;
  hospitalLine: string;
  toneClass: string;
  accentClass: string;
  badge: string;
  tpaNote: string;
  overview: string;
};

const cityData: Record<CityKey, CityConfig> = {
  delhi: {
    name: "Delhi NCR",
    shortName: "Delhi",
    headline: "Clear vision care in Delhi NCR",
    subheadline:
      "A simple, patient-first LASIK and ICL landing page for people looking for informed guidance, screening, and a smooth consultation flow.",
    hospitalLine: "Access to eye care centres across Delhi NCR",
    toneClass: "from-slate-900 to-slate-800",
    accentClass: "#146b63",
    badge: "Delhi NCR",
    tpaNote: "Insurance support depends on policy terms",
    overview:
      "Delhi NCR has a wide network of eye care facilities, so the page highlights convenience, screening, and informed decision-making rather than making exaggerated promises.",
  },
  mumbai: {
    name: "Mumbai",
    shortName: "Mumbai",
    headline: "Vision correction support for Mumbai",
    subheadline:
      "Designed for users comparing LASIK and ICL with a clean, trust-focused flow, quick contact capture, and clear next-step guidance.",
    hospitalLine: "Access to eye care centres across Mumbai",
    toneClass: "from-[#1D646B] to-[#145A5C]",
    accentClass: "#1D646B",
    badge: "Mumbai",
    tpaNote: "Coverage and approval depend on insurance policy",
    overview:
      "Mumbai users usually value speed, clarity, and premium experience, so the page keeps the messaging straightforward, modern, and conversion-friendly.",
  },
};

export default function DynamicLasikLP() {
  const params = useParams();
  const rawCity = String(params?.city || "delhi").toLowerCase().replace("lasik-", "");
  const cityKey: CityKey = rawCity === "mumbai" ? "mumbai" : "delhi";
  const city = cityData[cityKey];

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    hasInsurance: false,
    service: `LASIK LP ${city.shortName}`,
  });

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([
        {
          phone: formData.phone,
          hasInsurance: formData.hasInsurance,
          service: formData.service,
          city: city.name,
          source: `LP_Campaign_${city.shortName}`,
        },
      ]);
      if (error) throw error;
      setSubmitted(true);
      setFormData({
        phone: "",
        hasInsurance: false,
        service: `LASIK LP ${city.shortName}`,
      });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-24 pb-16 lg:pt-32">
        <div
          className={`absolute right-0 top-0 -z-10 h-full w-2/3 bg-gradient-to-l ${city.toneClass} opacity-[0.05] blur-[120px]`}
        />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-700">
              <MapPin size={14} />
              Healviacare in {city.badge}
            </div>

            <h1 className="mt-8 max-w-3xl text-5xl font-black leading-[0.92] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              {city.headline}
              <span className="mt-4 block text-[#146b63]">with LASIK & ICL</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {city.subheadline}
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              {city.overview}
            </p>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  label: "Procedure",
                  val: "Quick consultation",
                  icon: <Zap className="text-[#146b63]" size={18} />,
                },
                {
                  label: "Screening",
                  val: "Pre-checkup first",
                  icon: <ClipboardList className="text-[#146b63]" size={18} />,
                },
                {
                  label: "Recovery",
                  val: "Depends on treatment",
                  icon: <Clock3 className="text-[#146b63]" size={18} />,
                },
                {
                  label: "Support",
                  val: city.tpaNote,
                  icon: <ShieldCheck className="text-[#146b63]" size={18} />,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                    {item.icon}
                    {item.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-700">
                    {item.val}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-xl bg-[#146b63] px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-[#0f5751]"
              >
                Book Free Consultation
              </button>
              <a
                href="tel:8882804301"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Call 8882804301
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-500" />
                Patient-first guidance
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse size={16} className="text-emerald-500" />
                Consultation-led approach
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck size={16} className="text-emerald-500" />
                Support for suitable candidates
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -top-6 -right-4 z-20 rotate-12 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-900 shadow-xl">
              Limited consultation slots
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-4 shadow-[0_50px_100px_-20px_rgba(29,100,107,0.18)]">
              <div className="relative aspect-[4/4.4] overflow-hidden rounded-[2rem]">
                <Image
                  src="https://images.unsplash.com/photo-1588776814546-ec7e84c1c4b3?q=80&w=1600"
                  alt={`Healviacare eye care in ${city.name}`}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/85 px-4 py-3 backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Eye size={16} className="text-[#146b63]" />
                    LASIK and ICL guidance for {city.shortName}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  "Eye screening first",
                  "Treatment suitability review",
                  "Transparent consultation flow",
                ].map((t) => (
                  <div
                    key={t}
                    className="rounded-2xl bg-slate-50 px-3 py-3 text-center text-xs font-semibold text-slate-600"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CARD */}
      <section className="px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 rounded-[2rem] bg-white p-5 shadow-lg shadow-slate-200/60 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
              <Phone className="text-[#146b63]" size={20} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Call
                </p>
                <p className="font-semibold text-slate-800">8882804301</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
              <Mail className="text-[#146b63]" size={20} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email
                </p>
                <p className="font-semibold text-slate-800">info@healviacare.in</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
              <ShieldCheck className="text-[#146b63]" size={20} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Insurance
                </p>
                <p className="font-semibold text-slate-800">Yes or No on the form</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              LASIK and ICL explained simply
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-600">
              This section keeps the content natural and educational so users can compare the two options before speaking with your team.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-lg ring-1 ring-slate-100">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1579154235828-ac51edfb3983?w=1600"
                  alt="LASIK vision correction"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                  LASIK
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Laser vision correction
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  LASIK is commonly discussed for suitable candidates who want a cornea-based laser procedure after full eye evaluation.
                </p>
                <ul className="mt-5 space-y-3 text-sm font-medium text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#146b63]" />
                    Requires proper candidacy assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#146b63]" />
                    Often chosen for convenience and speed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#146b63]" />
                    Recommendation depends on your eyes
                  </li>
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-[#0d2625] text-white shadow-lg ring-1 ring-slate-900/10">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1600"
                  alt="ICL vision correction"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2625]/70 to-transparent" />
              </div>
              <div className="p-7">
                <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  ICL
                </div>
                <h3 className="text-2xl font-black text-white">
                  Implantable contact lens
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  ICL may be discussed for select candidates when lens-based correction is considered more appropriate than laser correction.
                </p>
                <ul className="mt-5 space-y-3 text-sm font-medium text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-300" />
                    Suitable for selected prescriptions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-300" />
                    Decision based on evaluation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-300" />
                    Usually explained during consultation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Simple next steps
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              The flow is intentionally short so users can move from interest to lead capture without confusion.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Share details",
                text: "Enter your phone number and tell us if you have insurance.",
                icon: <Phone size={24} />,
              },
              {
                title: "Get a call",
                text: "A team member can reach out to discuss the right evaluation path.",
                icon: <ShieldCheck size={24} />,
              },
              {
                title: "Visit the centre",
                text: "Proceed to consultation only after your case is reviewed.",
                icon: <Hospital size={24} />,
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-[#146b63] p-3 text-white">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + FAQ */}
      <section id="lead-form" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Clear answers help reduce friction and improve the chance of a completed enquiry.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  q: "How do I know whether LASIK or ICL is better for me?",
                  a: "A proper eye examination is the only reliable way to decide. Factors include power, corneal thickness, dryness, and overall eye health.",
                },
                {
                  q: "Is insurance always applicable?",
                  a: "No. It depends on your insurer, policy wording, and how the treatment is classified under your plan.",
                },
                {
                  q: "Do I need to visit the centre first?",
                  a: "Yes, a consultation or screening is the right first step before any recommendation is made.",
                },
                {
                  q: "Can I contact Healviacare directly?",
                  a: "Yes. You can call 8882804301 or email info@healviacare.in for support and next-step guidance.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-800">
                    <span>{item.q}</span>
                    <Sparkles size={18} className="shrink-0 text-slate-400 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="rounded-[2rem] bg-white p-8 shadow-xl">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={34} />
                </div>
                <h3 className="text-center text-2xl font-black text-slate-900">
                  Request received
                </h3>
                <p className="mt-3 text-center leading-7 text-slate-600">
                  Thanks. Your details have been submitted successfully. A team member can reach out shortly.
                </p>
              </div>
            ) : (
              <div className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-100">
                <div className="mb-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                  Quick contact form
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Check eligibility
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Share your phone number and insurance preference.
                </p>

                <form onSubmit={handleLeadSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input
                        type="tel"
                        required
                        placeholder="Enter mobile number"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-[#146b63] focus:ring-2 focus:ring-[#146b63]/20"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                      <ShieldCheck size={14} className="text-[#146b63]" />
                      Do you have health insurance?
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, hasInsurance: true })
                        }
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                          formData.hasInsurance
                            ? "bg-[#146b63] text-white"
                            : "border border-slate-200 bg-white text-slate-500"
                        }`}
                      >
                        YES
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, hasInsurance: false })
                        }
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                          !formData.hasInsurance
                            ? "bg-[#146b63] text-white"
                            : "border border-slate-200 bg-white text-slate-500"
                        }`}
                      >
                        NO
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#146b63] px-5 py-4 font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-[#0f5751] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Submitting..." : "Get a callback"}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] bg-gradient-to-r from-[#0f8a7e] to-[#146b63] px-6 py-16 text-center text-white shadow-2xl sm:px-10">
            <div className="mx-auto max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                <Star size={14} />
                Healviacare
              </div>
              <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                Start with a simple enquiry.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-emerald-50">
                For LASIK or ICL guidance in Delhi or Mumbai, the next step is a quick contact form and an evaluation-driven conversation.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="tel:8882804301"
                  className="rounded-xl bg-white px-6 py-3 font-semibold text-[#146b63] transition hover:opacity-95"
                >
                  Call 8882804301
                </a>
                <a
                  href="mailto:info@healviacare.in"
                  className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  Email info@healviacare.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}