"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Activity, 
  ChevronRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Stethoscope,
  ArrowRight,
  Target,
  Flame
} from "lucide-react";

export default function PilesPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Piles (Proctology)" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const treatments = [
    {
      title: "Laser Piles Treatment",
      desc: "Advanced LHP (Laser Hemorrhoidoplasty) for painless removal without cuts or stitches.",
      icon: <Flame className="text-orange-500" />,
      tag: "Painless"
    },
    {
      title: "Fissure Surgery",
      desc: "Precision laser treatment for chronic fissures ensuring rapid healing and no recurrence.",
      icon: <Target className="text-blue-500" />,
      tag: "No Stitches"
    },
    {
      title: "Fistula (VAAFT)",
      desc: "Video-assisted treatment for complex fistulas to preserve sphincter control.",
      icon: <Activity className="text-emerald-500" />,
      tag: "High Success"
    },
    {
      title: "Pilonidal Sinus",
      desc: "Minimally invasive EPSiT procedure for deep-seated sinus with minimal scarring.",
      icon: <Zap className="text-purple-500" />,
      tag: "Fast Recovery"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([form]);
      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      alert("Connectivity issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="relative bg-[#0F172A] py-20 lg:py-32 px-6 overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1D646B]/10 blur-[120px] rounded-full -translate-y-1/2"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-teal-400 text-xs font-black uppercase tracking-widest mb-8 border border-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                USFDA Approved Laser Care
              </div>
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                Pain-Free <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Piles Relief.</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-lg font-medium leading-relaxed">
                India's leading experts in Laser Proctology. Get treated in 30 minutes and go home the same day. 0% EMI options available.
              </p>
              
              <div className="flex flex-wrap gap-8 border-t border-white/10 pt-10">
                <div>
                  <p className="text-3xl font-black text-white">25,000+</p>
                  <p className="text-teal-500 text-sm font-bold uppercase tracking-wider">Successful Procedures</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">100%</p>
                  <p className="text-teal-500 text-sm font-bold uppercase tracking-wider">Confidentiality</p>
                </div>
              </div>
            </motion.div>

            {/* FORM CARD */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-1/3 w-full"
            >
              {submitted ? (
                <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center border-4 border-emerald-50 text-slate-900">
                  <CheckCircle2 size={60} className="text-emerald-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-black mb-2">Request Sent!</h2>
                  <p className="text-slate-500 mb-6 font-medium">Our medical counselor will call you within 15 minutes for a private consultation.</p>
                  <button onClick={() => setSubmitted(false)} className="text-teal-600 font-bold hover:underline">Book for another patient</button>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl text-slate-900 border border-slate-100">
                  <h2 className="text-2xl font-black mb-2 text-[#1D646B]">Consult Specialist</h2>
                  <p className="text-slate-500 text-sm mb-8 font-medium">Book a confidential call with a top Proctologist.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="text" placeholder="Patient Name" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B] font-medium"
                      value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input 
                      type="tel" placeholder="Phone Number" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B] font-medium"
                      value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    />
                    <select 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B] font-medium appearance-none cursor-pointer"
                      value={form.city} onChange={(e) => setForm({...form, city: e.target.value})}
                      required
                    >
                      <option value="">Select City</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                    </select>
                    <button 
                      disabled={loading}
                      className="w-full py-5 bg-[#1D646B] text-white rounded-2xl font-black text-lg hover:bg-[#144b50] shadow-xl shadow-teal-900/20 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? "Booking..." : "Get Free Expert Call"} <ArrowRight size={20} />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* --- SPECIALTY GRID --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Our Laser Expertise</h2>
            <p className="text-slate-500 mt-4 text-lg font-medium">Advanced, minimally invasive care for rectal health.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((t, i) => (
              <div key={i} className="group p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-teal-500/20 transition-all duration-500">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-teal-50 transition-all duration-300">
                  {t.icon}
                </div>
                <div className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-widest rounded-lg mb-4">
                  {t.tag}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- RECOVERY HIGHLIGHT --- */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
                <div className="aspect-[4/5] bg-slate-200 rounded-[60px] overflow-hidden shadow-2xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800" 
                    alt="Piles Care Excellence" fill className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-2xl max-w-xs border border-teal-50">
                   <div className="flex items-center gap-3 mb-3">
                     <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                         <Activity size={20} />
                     </div>
                     <p className="text-[#1D646B] font-black text-lg">Quick Discharge</p>
                   </div>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium">95% of our laser patients resume normal light activity within 48 hours.</p>
                </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-10 tracking-tight leading-tight">Modern Care Protocol</h2>
              <div className="space-y-10">
                {[
                  {h: "Laser Precision", d: "German laser technology targets the affected tissue without touching healthy skin.", i: "01"},
                  {h: "Daycare Procedure", d: "Surgery usually takes 20-30 minutes, allowing for same-day discharge.", i: "02"},
                  {h: "Minimal Follow-ups", d: "No major dressings or painful wound cleaning required post-procedure.", i: "03"}
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="w-16 h-16 bg-white border border-slate-200 text-[#1D646B] rounded-[24px] flex items-center justify-center shrink-0 font-black text-xl shadow-sm group-hover:bg-[#1D646B] group-hover:text-white transition-all duration-300">
                        {item.i}
                    </div>
                    <div>
                      <h4 className="font-black text-2xl text-slate-900 mb-2">{item.h}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-12 flex items-center gap-3 text-[#1D646B] font-black text-lg group"
              >
                Start your journey to recovery <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}