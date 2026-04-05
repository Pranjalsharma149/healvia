"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Use your existing supabase client
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { CheckCircle2, Loader2, Thermometer, Stethoscope, Activity, ClipboardList } from "lucide-react";

export default function InternalMedicinePage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Internal Medicine" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const treatments = [
    {
      title: "Infectious Disease Care",
      desc: "Expert management for Dengue, Typhoid, Malaria, and severe Viral infections with 24/7 monitoring.",
      icon: <Thermometer className="text-orange-500" size={32} />
    },
    {
      title: "Chronic Care",
      desc: "Specialized control for long-term conditions like Diabetes, Hypertension, and Thyroid disorders.",
      icon: <Stethoscope className="text-blue-500" size={32} />
    },
    {
      title: "Respiratory & Chest",
      desc: "Advanced treatment for Asthma, COPD, Pneumonia, and seasonal respiratory distress.",
      icon: <Activity className="text-red-500" size={32} />
    },
    {
      title: "Preventive Checkups",
      desc: "Full-body health screenings to detect lifestyle diseases early and ensure long-term wellness.",
      icon: <ClipboardList className="text-green-500" size={32} />
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Direct Supabase Integration
      const { error } = await supabase.from("leads").insert([form]);
      if (error) throw error;

      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "Internal Medicine" });
    } catch (error: any) {
      alert("Connectivity issue: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="relative bg-[#f4fbfb] py-20 lg:py-28 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D646B]/10 text-[#1D646B] text-xs font-bold uppercase mb-6 tracking-wider">
                24/7 Admissions & Emergency Support
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-[1.1]">
                Compassionate <br/>
                <span className="text-[#1D646B]">Internal Medicine.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed">
                Comprehensive medical care for everything from seasonal viral fevers to complex chronic health conditions. 
              </p>
              
              <div className="flex gap-10">
                <div className="flex flex-col">
                  <p className="text-3xl font-black text-slate-900">100%</p>
                  <p className="text-slate-500 text-sm font-medium">Cashless Process</p>
                </div>
                <div className="w-[1px] bg-slate-300"></div>
                <div className="flex flex-col">
                  <p className="text-3xl font-black text-slate-900">24/7</p>
                  <p className="text-slate-500 text-sm font-medium">Nursing Care</p>
                </div>
              </div>
            </div>

            {/* CONSULTATION FORM */}
            <div className="lg:w-1/3 w-full">
              {submitted ? (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-teal-50 text-center">
                  <CheckCircle2 className="mx-auto text-green-500 mb-4" size={60} />
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Received</h2>
                  <p className="text-slate-500 mb-6">Our medical team will contact you within 10 minutes.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[#1D646B] font-bold hover:underline"
                  >
                    Need another inquiry?
                  </button>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
                  <h2 className="text-2xl font-black mb-2 text-slate-900">Medical Inquiry</h2>
                  <p className="text-slate-500 text-sm mb-6">Quick response for admissions & checkups.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="text" placeholder="Patient Name" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B]"
                      value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input 
                      type="tel" placeholder="Mobile Number" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B]"
                      value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    />
                    <select 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B] appearance-none"
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
                      className="w-full py-5 bg-[#1D646B] text-white rounded-2xl font-bold text-lg hover:bg-[#155a60] transition-all shadow-xl shadow-teal-900/10 flex items-center justify-center gap-2"
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
            <h2 className="text-4xl font-black text-slate-900">Expert Medical Care</h2>
            <div className="w-16 h-1.5 bg-[#1D646B] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((t, i) => (
              <div key={i} className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="mb-6 group-hover:scale-110 transition-transform">{t.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- INPATIENT HIGHLIGHT --- */}
        <section className="py-12 px-4 mb-20">
          <div className="max-w-7xl mx-auto bg-slate-900 rounded-[50px] p-10 lg:p-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
            <div className="lg:w-1/2 relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">Premium In-Patient Experience</h2>
              <div className="space-y-4">
                {[
                  {h: "Deluxe Private Rooms", p: "Comfortable, sanitized private rooms designed for peaceful recovery."},
                  {h: "Expert Nursing Team", p: "Round-the-clock monitoring by highly trained medical staff."},
                  {h: "Rapid Diagnostics", p: "In-house lab and radiology for immediate test results."}
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
                    <CheckCircle2 className="text-teal-400 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-lg text-white">{item.h}</h4>
                      <p className="text-slate-400 text-sm">{item.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800" 
                alt="Internal Medicine Hospital Room" fill className="object-cover"
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}