"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Waves, 
  Syringe, 
  Stethoscope, 
  Hospital, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Activity 
} from "lucide-react";

export default function VascularPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Vascular Surgery" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const treatments = [
    {
      title: "Varicose Veins",
      desc: "Advanced Endovenous Laser Treatment (EVLT). Painless, no stitches, and permanent results.",
      icon: <Waves className="text-rose-600" />,
      highlight: "EVLT Expert"
    },
    {
      title: "DVT Management",
      desc: "Expert treatment for Deep Vein Thrombosis to restore blood flow and prevent complications.",
      icon: <Activity className="text-indigo-600" />,
      highlight: "Emergency Care"
    },
    {
      title: "Diabetic Foot",
      desc: "Specialized care to improve circulation and heal non-healing ulcers in diabetic patients.",
      icon: <Stethoscope className="text-emerald-600" />,
      highlight: "Wound Care"
    },
    {
      title: "Dialysis Access",
      desc: "Precision surgical creation of AV Fistula and Shunts for long-term dialysis support.",
      icon: <Hospital className="text-blue-600" />,
      highlight: "AV Fistula"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([form]);
      if (error) throw error;
      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "Vascular Surgery" });
    } catch (error) {
      alert("System busy. Please try again or call our helpline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="relative bg-[#1e1b4b] py-20 lg:py-32 px-6 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-500/10 blur-[140px] rounded-full -translate-y-1/2"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 bg-rose-500/20 px-4 py-2 rounded-full text-rose-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-rose-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                USFDA Approved Laser Center
              </div>
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                Healthy Veins. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">Painless Life.</span>
              </h1>
              <p className="text-xl text-indigo-100/70 mb-10 max-w-lg font-medium leading-relaxed">
                India's top center for Laser Varicose Vein treatment. Walk home the same day with 100% cosmetic success and zero scars.
              </p>
              
              <div className="flex flex-wrap gap-8 border-t border-white/10 pt-10">
                <div>
                  <p className="text-3xl font-black text-rose-400">100%</p>
                  <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mt-1">Laser Based</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-rose-400">30 Min</p>
                  <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mt-1">Procedure</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-rose-400">Zero</p>
                  <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mt-1">Downtime</p>
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
                <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center border-b-8 border-rose-500">
                  <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-rose-600" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Booking Confirmed</h2>
                  <p className="text-slate-500 mb-8 font-medium">Our vascular coordinator will contact you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="text-rose-600 font-bold hover:underline">Book Another</button>
                </div>
              ) : (
                <div className="bg-white p-8 lg:p-10 rounded-[40px] shadow-2xl text-slate-900">
                  <h2 className="text-2xl font-black mb-2 text-[#1e1b4b]">Free Vein Screening</h2>
                  <p className="text-slate-500 text-sm mb-8 font-medium">Get a diagnosis from senior vascular specialists.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="text" placeholder="Patient Name" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-rose-500 font-medium transition-all"
                      value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input 
                      type="tel" placeholder="Mobile Number" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-rose-500 font-medium transition-all"
                      value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    />
                    <select 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-rose-500 font-medium cursor-pointer"
                      value={form.city} onChange={(e) => setForm({...form, city: e.target.value})}
                      required
                    >
                      <option value="">Select City</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                    <button 
                      disabled={loading}
                      className="w-full py-5 bg-rose-600 text-white rounded-2xl font-black text-lg hover:bg-rose-700 shadow-xl shadow-rose-900/20 transition-all"
                    >
                      {loading ? "Processing..." : "Secure Appointment"}
                    </button>
                  </form>
                  <p className="text-[10px] text-center text-slate-400 mt-6 font-bold uppercase tracking-wider">
                    Cashless Insurance & 0% EMI Available
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* --- TECHNOLOGY GRID --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Specialized Care</h2>
            <p className="text-slate-500 mt-4 text-lg font-medium italic">Precision diagnostics and laser intervention.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((t, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="group p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                  {t.icon}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.15em] text-rose-500 mb-3">{t.highlight}</div>
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- WHY LASER SECTION --- */}
        <section className="py-24 bg-slate-50 rounded-[80px] mx-6 mb-24 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-10 flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
               <div className="aspect-[16/10] bg-slate-200 rounded-[50px] overflow-hidden shadow-2xl">
                 <Image 
                    src="https://images.unsplash.com/photo-1559839734-2b71f1e59850?q=80&w=800" 
                    alt="Vascular Specialist" fill className="object-cover"
                 />
               </div>
               <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[35px] shadow-2xl max-w-xs border border-rose-100">
                  <p className="text-rose-600 font-black text-lg flex items-center gap-2">
                    <Zap size={20} /> 45-Min Surgery
                  </p>
                  <p className="text-sm text-slate-500 mt-2 font-medium">Minimally invasive EVLT allows for immediate mobility post-surgery.</p>
               </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-12 tracking-tight">The Laser Advantage</h2>
              <div className="space-y-8">
                {[
                  { h: "Zero Hospital Stay", p: "Walk into the clinic and walk out the same day—no overnight stay required.", i: <ShieldCheck /> },
                  { h: "Cosmetic Perfection", p: "Laser fibers leave no marks. Perfect for patients concerned about scars.", i: <Activity /> },
                  { h: "Painless Experience", p: "Performed under local anesthesia with a focus on maximum patient comfort.", i: <Zap /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-14 h-14 bg-white text-rose-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                      {item.i}
                    </div>
                    <div>
                      <h4 className="font-black text-xl text-slate-900 mb-2">{item.h}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed text-sm lg:text-base">{item.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}