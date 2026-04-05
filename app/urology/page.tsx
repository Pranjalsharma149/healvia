"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Scissors, 
  Gem, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  UserCheck 
} from "lucide-react";

export default function UrologyPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Urology" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const technologies = [
    {
      title: "Laser Stone Removal",
      desc: "Advanced RIRS & URSL procedures to remove kidney stones without major incisions.",
      icon: <Gem className="text-sky-600" />,
      tag: "Kidney Stones"
    },
    {
      title: "Holmium Laser (HoLEP)",
      desc: "The gold standard for Prostate (BPH) treatment. Faster recovery and minimal blood loss.",
      icon: <Zap className="text-blue-600" />,
      tag: "Prostate"
    },
    {
      title: "Painless Circumcision",
      desc: "ZSR Stapler technique: Bloodless, stitchless, and 10-minute procedure with quick healing.",
      icon: <Scissors className="text-cyan-600" />,
      tag: "ZSR Stapler"
    },
    {
      title: "No-Scalpel Vasectomy",
      desc: "A modern, minimally invasive approach to family planning with zero downtime.",
      icon: <ShieldCheck className="text-indigo-600" />,
      tag: "Family Planning"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([form]);
      if (error) throw error;
      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "Urology" });
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
        <section className="relative bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-white py-20 lg:py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:w-1/2"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#0369A1] text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                Advanced Laser Center
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                Modern Care for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">Urological Health.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-lg font-medium leading-relaxed">
                Pain-free laser treatments for Kidney Stones and Prostate. USFDA approved techniques with same-day discharge.
              </p>
              
              <div className="flex flex-wrap gap-4">
                 {["Laser Precision", "Same Day Discharge", "Cashless Surgery"].map((feature, i) => (
                   <div key={i} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-2xl shadow-sm border border-sky-100 text-sm font-bold text-slate-700">
                      <CheckCircle2 size={16} className="text-sky-500" /> {feature}
                   </div>
                 ))}
              </div>
            </motion.div>

            {/* FORM CARD */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-1/3 w-full"
            >
              {submitted ? (
                <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center border border-sky-100">
                  <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-sky-600" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Request Received</h2>
                  <p className="text-slate-500 mb-8 font-medium">Our urology counselor will call you within 15 minutes.</p>
                  <button onClick={() => setSubmitted(false)} className="text-sky-600 font-bold hover:underline">New Consultation</button>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
                  <h2 className="text-2xl font-black mb-2 text-[#0369A1]">Book Consultation</h2>
                  <p className="text-slate-500 text-sm mb-8 font-medium">Get a free call back from our senior urologist.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="text" placeholder="Patient Full Name" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#0369A1] font-medium"
                      value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input 
                      type="tel" placeholder="Mobile Number" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#0369A1] font-medium"
                      value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    />
                    <select 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#0369A1] font-medium cursor-pointer"
                      value={form.city} onChange={(e) => setForm({...form, city: e.target.value})}
                      required
                    >
                      <option value="">Select Your City</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                    </select>
                    <button 
                      disabled={loading}
                      className="w-full py-5 bg-[#0369A1] text-white rounded-2xl font-black text-lg hover:bg-[#075985] shadow-xl shadow-sky-900/20 transition-all"
                    >
                      {loading ? "Processing..." : "Book Free Call Back"}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
          
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-sky-200/40 blur-[120px] rounded-full"></div>
        </section>

        {/* --- TECHNOLOGY GRID --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Our Specializations</h2>
            <p className="text-slate-500 mt-4 text-lg font-medium italic">Leading-edge laser technology for precise, painless surgery.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((t, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="group p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-sky-500/20 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                  {t.icon}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-3">{t.tag}</div>
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- PATIENT FIRST SECTION --- */}
        <section className="py-20 bg-slate-950 text-white rounded-[60px] mx-6 mb-24 overflow-hidden relative shadow-2xl">
          <div className="max-w-7xl mx-auto px-10 flex flex-col lg:flex-row items-center gap-20">
             <div className="lg:w-1/2">
                <h2 className="text-4xl lg:text-6xl font-black mb-12 tracking-tight">Patient-First <br/><span className="text-sky-500">Approach.</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                   {[
                     {h: "Quick Recovery", p: "Most patients return home same day and work within 48 hours.", i: <Clock className="text-sky-400" />},
                     {h: "No Scarring", p: "Advanced laser procedures are minimally invasive with no visible scars.", i: <ShieldCheck className="text-sky-400" />},
                     {h: "Cashless Care", p: "Direct billing with all major insurance and TPA providers.", i: <CreditCard className="text-sky-400" />},
                     {h: "Expert Surgeons", p: "Performed by senior urologists with 15+ years of experience.", i: <UserCheck className="text-sky-400" />}
                   ].map((item, idx) => (
                     <div key={idx} className="space-y-4">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shadow-inner">
                          {item.i}
                        </div>
                        <h4 className="text-white font-black text-xl tracking-tight">{item.h}</h4>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.p}</p>
                     </div>
                   ))}
                </div>
             </div>
             <div className="lg:w-1/2 relative h-[500px] w-full rounded-[40px] overflow-hidden group shadow-2xl shadow-sky-500/10">
                <Image 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800" 
                  alt="Urology Care" fill className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}