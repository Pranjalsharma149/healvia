"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { 
  CheckCircle2, 
  ShieldCheck, 
  PhoneCall, 
  Zap, 
  Eye, 
  Calendar, 
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";

export default function LasikIclLanding() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    hasInsurance: false,
    service: "LASIK & ICL Landing",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([formData]);
      if (error) throw error;
      setSubmitted(true);
      setFormData({ phone: "", hasInsurance: false, service: "LASIK & ICL Landing" });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white font-sans selection:bg-emerald-100">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0B1E22] overflow-hidden">
        {/* Background Image with Overlay */}
        <Image
          src="https://images.unsplash.com/photo-1588776814546-ec7e84c1c4b3?q=80&w=2000"
          alt="Advanced Eye Care"
          fill
          priority
          className="object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E22] via-[#0B1E22]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl w-full px-6 grid lg:grid-cols-2 gap-16 items-center py-20">
          
          {/* LEFT CONTENT */}
          <div className="text-white space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-500/30">
              <Sparkles size={14} /> FDA Approved Technologies
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
              Wake Up To <br />
              <span className="text-emerald-400 italic">HD Vision.</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
              From 10-minute <strong>SMILE Pro</strong> laser to premium <strong>EVO ICL</strong> lenses, we bring you the world's best vision correction.
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                { label: "10 Min Procedure", icon: <Zap size={14}/> },
                { label: "0% EMI Available", icon: <CheckCircle2 size={14}/> },
                { label: "Pain-Free Recovery", icon: <ShieldCheck size={14}/> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl text-sm font-bold">
                  <span className="text-emerald-400">{item.icon}</span> {item.label}
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-3 text-slate-400 font-medium">
              <span className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B1E22] bg-slate-700" />)}
              </span>
              <p className="text-sm">Trusted by 5,000+ happy patients this year</p>
            </div>
          </div>

          {/* RIGHT FORM CARD */}
          <div className="relative">
             {submitted ? (
                <div className="bg-white rounded-[40px] p-12 text-center shadow-2xl animate-in zoom-in duration-500 border-4 border-emerald-50">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <PhoneCall size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Request Received!</h3>
                    <p className="text-slate-500">Our eye specialist will call you within 5-10 minutes to explain the procedure and costs.</p>
                </div>
             ) : (
                <div className="bg-white rounded-[40px] shadow-2xl p-10 w-full max-w-md mx-auto border border-slate-100">
                    <h3 className="text-2xl font-black text-slate-900 mb-2 text-center">
                    Check Eligibility
                    </h3>
                    <p className="text-sm text-slate-500 text-center mb-8 font-medium">
                    Get a personalized quote & free screening
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Mobile Number</label>
                        <input
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1D646B] transition-all font-bold text-lg"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                        <p className="text-xs mb-4 font-black text-slate-600 uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck size={14} className="text-[#1D646B]"/> Do you have health insurance?
                        </p>
                        <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, hasInsurance: true })}
                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                            formData.hasInsurance ? "bg-[#1D646B] text-white shadow-lg" : "bg-white text-slate-400 border border-slate-200"
                            }`}
                        >YES</button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, hasInsurance: false })}
                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                            !formData.hasInsurance ? "bg-[#1D646B] text-white shadow-lg" : "bg-white text-slate-400 border border-slate-200"
                            }`}
                        >NO</button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-[#1D646B] text-white rounded-[20px] font-black text-lg hover:bg-[#154d52] transition-all shadow-xl shadow-teal-900/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? "Processing..." : "Get Free Expert Call"}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                    </form>
                </div>
             )}
          </div>
        </div>
      </section>

      {/* ================= COMPARISON SECTION ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">LASIK vs ICL: Which is for you?</h2>
            <p className="text-slate-500 mt-4 font-medium">Both deliver 6/6 vision, but the technology differs.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
            {/* SMILE Pro */}
            <div className="group bg-white p-10 rounded-[40px] border border-slate-100 hover:border-emerald-200 hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Zap size={32} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">SMILE Pro LASIK</h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium">Fastest laser procedure. Reshapes your cornea in just seconds. Ideal for active lifestyles and sports lovers.</p>
                <ul className="space-y-4 mb-10">
                    {["Flapless & Blade-free", "Return to work in 24 hours", "No dry-eye complications", "Best for power up to -8"].map((li, i) => (
                        <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                            <CheckCircle2 size={18} className="text-emerald-500" /> {li}
                        </li>
                    ))}
                </ul>
                <div className="relative h-64 rounded-3xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1579154235828-ac51edfb3983?w=1000" fill alt="LASIK" className="object-cover" />
                </div>
            </div>

            {/* EVO ICL */}
            <div className="group bg-[#0B1E22] p-10 rounded-[40px] text-white hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 bg-white/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Eye size={32} />
                </div>
                <h3 className="text-3xl font-black mb-4">EVO ICL Lenses</h3>
                <p className="text-slate-300 mb-8 leading-relaxed font-medium">Premium Collamer lens placed inside the eye. The "gold standard" for thin corneas or very high power.</p>
                <ul className="space-y-4 mb-10">
                    {["Fully Reversible procedure", "Exceptional Night Vision", "UV protection built-in", "Best for power up to -18"].map((li, i) => (
                        <li key={i} className="flex items-center gap-3 font-bold text-slate-200">
                            <CheckCircle2 size={18} className="text-emerald-400" /> {li}
                        </li>
                    ))}
                </ul>
                <div className="relative h-64 rounded-3xl overflow-hidden opacity-80">
                    <Image src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1000" fill alt="ICL" className="object-cover" />
                </div>
            </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center text-slate-900 mb-16 uppercase tracking-tighter">The Path to Freedom</h2>
            <div className="grid md:grid-cols-3 gap-12">
                {[
                    { t: "Elite Screening", d: "Comprehensive 18-step eye checkup to find your perfect fit.", i: <Calendar size={28}/> },
                    { t: "Swift Procedure", d: "10-minute surgery using world-class FDA approved lasers.", i: <Zap size={28}/> },
                    { t: "Life Renewed", d: "Instant clarity. Walk out with perfect vision the same day.", i: <Sparkles size={28}/> }
                ].map((step, i) => (
                    <div key={i} className="relative text-center group">
                        <div className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100 group-hover:bg-[#1D646B] group-hover:text-white transition-all duration-300">
                            {step.i}
                        </div>
                        <h3 className="font-black text-2xl text-slate-900 mb-4 tracking-tight">{step.t}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{step.d}</p>
                        {i < 2 && <div className="hidden lg:block absolute top-10 -right-1/4 w-1/2 h-[2px] bg-slate-200" />}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 bg-[#1D646B] text-center text-white px-6">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Stop Searching, <br/> Start Seeing.
            </h2>
            <p className="text-teal-100 text-lg mb-10 font-medium">Join 50,000+ people who have transformed their lives with our network of hospitals.</p>
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-[#1D646B] px-10 py-5 rounded-[20px] font-black text-xl shadow-2xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto"
            >
            Get Free Consultation <ArrowRight />
            </button>
            <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-60 text-xs font-bold uppercase tracking-widest">
                <span>NABH Accredited</span>
                <span>FDA Approved</span>
                <span>ISO Certified</span>
            </div>
        </div>
      </section>

    </main>
  );
}