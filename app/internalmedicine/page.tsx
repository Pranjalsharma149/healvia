"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Use your existing supabase client
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { 
  CheckCircle2, 
  Loader2, 
  Thermometer, 
  HeartPulse, 
  Wind, 
  ClipboardCheck,
  ShieldCheck,
  Building2
} from "lucide-react";

export default function InternalMedicinePage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Internal Medicine" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const treatments = [
    {
      title: "Fever & Viral Care",
      desc: "Specialized inpatient management for Dengue, Typhoid, Malaria, and Severe Viral infections.",
      icon: <Thermometer className="text-blue-600" size={32} />
    },
    {
      title: "Diabetes & Hypertension",
      desc: "Comprehensive blood sugar and pressure control programs to prevent long-term complications.",
      icon: <HeartPulse className="text-red-500" size={32} />
    },
    {
      title: "Respiratory Care",
      desc: "Expert treatment for Asthma, COPD, Pneumonia, and post-COVID respiratory recovery.",
      icon: <Wind className="text-sky-500" size={32} />
    },
    {
      title: "Health Screenings",
      desc: "Executive full-body checkups designed to detect lifestyle diseases before they become critical.",
      icon: <ClipboardCheck className="text-emerald-500" size={32} />
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([form]);
      if (error) throw error;
      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "Internal Medicine" });
    } catch (error: any) {
      alert("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="relative bg-[#F8FAFC] py-20 lg:py-28 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase mb-6 tracking-widest border border-blue-100 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                24/7 Admissions Available
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight">
                Comprehensive <br/>
                <span className="text-blue-600">General Medicine.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed">
                Expert diagnosis and inpatient care for a wide range of medical conditions. Experience healing in a comfortable, NABH-accredited environment.
              </p>
              
              <div className="flex gap-10">
                <div>
                  <p className="text-3xl font-black text-slate-900">24/7</p>
                  <p className="text-slate-400 text-sm font-medium">Emergency Support</p>
                </div>
                <div className="w-[1px] bg-slate-200"></div>
                <div>
                  <p className="text-3xl font-black text-slate-900">100%</p>
                  <p className="text-slate-400 text-sm font-medium">Cashless Approved</p>
                </div>
              </div>
            </div>

            {/* CONSULTATION/ADMISSION FORM */}
            <div className="lg:w-1/3 w-full">
              {submitted ? (
                <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-blue-50 text-center animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Request Received</h2>
                  <p className="text-slate-500 mb-8">A medical specialist will contact you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="text-blue-600 font-bold hover:underline">
                    Need to submit another?
                  </button>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
                  <h2 className="text-2xl font-black mb-2 text-slate-900">Patient Inquiry</h2>
                  <p className="text-slate-500 text-sm mb-6 font-medium">For admissions or health checkups.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="text" placeholder="Patient Name" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input 
                      type="tel" placeholder="Mobile Number" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    />
                    <select 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
                      value={form.city} onChange={(e) => setForm({...form, city: e.target.value})}
                      required
                    >
                      <option value="">Select City</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Gurgaon">Gurgaon</option>
                      <option value="Noida">Noida</option>
                    </select>
                    <button 
                      disabled={loading}
                      className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "Speak to a Specialist"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- TREATMENTS GRID --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Medical Management</h2>
            <div className="w-12 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-500 mt-6 max-w-xl mx-auto">Holistic internal medicine services designed for prompt recovery and long-term health maintenance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((t, i) => (
              <div key={i} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{t.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- INPATIENT CARE HIGHLIGHT --- */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto bg-blue-600 rounded-[60px] p-10 lg:p-24 flex flex-col lg:flex-row items-center gap-16 shadow-2xl shadow-blue-900/20">
             <div className="lg:w-1/2">
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-10 leading-tight">Patient-First <br/>Inpatient Care</h2>
                <div className="space-y-4">
                   {[
                     {h: "Premium Rooms", d: "Private suites and deluxe rooms for a peaceful recovery.", i: <Building2 />},
                     {h: "24/7 Nursing", d: "Dedicated staff to ensure medication and monitoring are flawless.", i: <HeartPulse />},
                     {h: "Quick Diagnostics", d: "In-house lab work and X-rays for maximum speed.", i: <ShieldCheck />}
                   ].map((item, idx) => (
                     <div key={idx} className="flex gap-5 p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md">
                        <div className="text-white">{item.i}</div>
                        <div>
                           <h4 className="font-black text-xl text-white">{item.h}</h4>
                           <p className="text-blue-100 text-sm mt-1">{item.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="lg:w-1/2 relative h-[550px] w-full rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/10">
                <Image 
                 src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800" 
                 alt="Internal Medicine Ward" 
                 fill 
                 className="object-cover"
                />
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}