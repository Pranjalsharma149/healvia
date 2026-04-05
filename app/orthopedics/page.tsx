"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Ensure your file is named supabase.ts in /lib
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Activity, 
  Bone, 
  Stethoscope, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  MapPin
} from "lucide-react";

export default function OrthopedicsPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Orthopedics" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const treatments = [
    {
      title: "Knee Replacement",
      desc: "Robotic-assisted precision for total and partial knee replacement.",
      icon: <Bone className="text-teal-600" />,
    },
    {
      title: "Hip Replacement",
      desc: "Minimally invasive hip surgery for faster recovery and mobility.",
      icon: <Activity className="text-blue-600" />,
    },
    {
      title: "Spine & Slip Disc",
      desc: "Advanced endoscopic spine surgery for sciatica and chronic pain.",
      icon: <Stethoscope className="text-emerald-600" />,
    },
    {
      title: "Sports Injuries",
      desc: "Arthroscopic ACL/MCL repair and shoulder reconstruction.",
      icon: <Zap className="text-orange-600" />,
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Using Supabase instead of Axios for direct lead capture
      const { error } = await supabase.from("leads").insert([form]);
      if (error) throw error;
      
      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "Orthopedics" });
    } catch (error) {
      alert("Error saving lead. Please check your internet connection.");
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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-teal-400 text-xs font-black uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Robotic-Assisted Joint Replacement
              </div>
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-[1.1]">
                Regain Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Mobility.</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-lg font-medium">
                India's leading center for Knee, Hip, and Spine care. Advanced robotic precision and 0% EMI options.
              </p>
              
              <div className="flex flex-wrap gap-8 border-t border-white/10 pt-10">
                <div>
                  <p className="text-3xl font-black">15,000+</p>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Joints Replaced</p>
                </div>
                <div>
                  <p className="text-3xl font-black">98.5%</p>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Success Rate</p>
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
                  <h2 className="text-2xl font-black mb-2">Lead Captured!</h2>
                  <p className="text-slate-500 mb-6">Our orthopedic specialist will call you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="text-[#1D646B] font-bold underline">Submit another</button>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-[40px] shadow-2xl text-slate-900 border border-slate-100">
                  <h2 className="text-2xl font-black mb-6 text-[#1D646B]">Free Bone Health Audit</h2>
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
                    <div className="relative">
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
                      <MapPin size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                    <button 
                      disabled={loading}
                      className="w-full py-5 bg-[#1D646B] text-white rounded-2xl font-black text-lg hover:bg-[#144b50] transition-all shadow-xl shadow-teal-900/20"
                    >
                      {loading ? "Booking..." : "Consult Top Surgeon"}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* --- SPECIALTY GRID --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((t, i) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={i} 
                className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-8">
                  {t.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- RECOVERY HIGHLIGHT --- */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
               <div className="aspect-[4/5] bg-slate-200 rounded-[60px] overflow-hidden shadow-2xl">
                 <Image 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800" 
                    alt="Orthopedic Recovery" fill className="object-cover"
                 />
               </div>
               <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-2xl max-w-xs border border-slate-100">
                  <p className="text-[#1D646B] font-black text-lg flex items-center gap-2">
                    <Activity size={20} /> Fast-Track Recovery
                  </p>
                  <p className="text-sm text-slate-500 mt-2 font-medium">Most patients begin walking within 24 hours of robotic surgery.</p>
               </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-12 tracking-tight">Your Path to Pain-Free Life</h2>
              <div className="space-y-10">
                {[
                  { title: "Digital 3D Planning", desc: "Mapping your unique anatomy for a perfect implant fit.", idx: "01" },
                  { title: "Robotic Execution", desc: "Sub-millimeter accuracy ensuring faster healing and less pain.", idx: "02" },
                  { title: "Personalized Rehab", desc: "Expert physiotherapy to get you back to your routine quickly.", idx: "03" }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-16 h-16 bg-white border border-slate-200 text-[#1D646B] rounded-[24px] flex items-center justify-center shrink-0 font-black text-xl group-hover:bg-[#1D646B] group-hover:text-white transition-all duration-300">
                      {step.idx}
                    </div>
                    <div>
                      <h4 className="font-black text-2xl text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
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