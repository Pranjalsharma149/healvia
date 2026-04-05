"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Use your established Supabase client
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Eye, 
  CheckCircle2, 
  Loader2, 
  Waves, 
  Zap, 
  Wallet 
} from "lucide-react";

export default function LasikPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "LASIK" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const technologies = [
    {
      title: "SMILE Pro",
      desc: "The world's thinnest, flapless, and fastest laser eye surgery. Recovery in just 24 hours.",
      icon: <Sparkles className="text-teal-600" size={32} />
    },
    {
      title: "Contoura Vision",
      desc: "Go beyond 6/6 vision. Maps 22,000 points on your cornea for personalized precision.",
      icon: <Target className="text-orange-500" size={32} />
    },
    {
      title: "Blade-Free LASIK",
      desc: "All-laser Femto LASIK for enhanced safety and superior visual outcomes.",
      icon: <ShieldCheck className="text-blue-600" size={32} />
    },
    {
      title: "ICL (Phakic Lenses)",
      desc: "The best option for thin corneas or very high eye power. Reversible and highly safe.",
      icon: <Eye className="text-emerald-600" size={32} />
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert([form]);
      if (error) throw error;
      
      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "LASIK" });
    } catch (error: any) {
      alert("Connectivity issue. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="relative bg-gradient-to-br from-[#F0FDFA] via-white to-[#CCFBF1]/40 py-20 lg:py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D646B] text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl shadow-teal-900/10">
                Say Goodbye to Glasses
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                Wake Up To <br/>
                <span className="text-[#1D646B]">Clear Vision.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed font-medium">
                Experience the next generation of Laser Eye Surgery. Painless 10-minute procedure for a lifetime of visual freedom.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                 {[
                   { t: "10-Min Procedure", i: <Zap size={14} /> },
                   { t: "No Hospitalization", i: <CheckCircle2 size={14} /> },
                   { t: "0% EMI Available", i: <Wallet size={14} /> }
                 ].map((tag, idx) => (
                   <div key={idx} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-teal-50 text-slate-700 font-bold text-xs">
                      <span className="text-emerald-500">{tag.i}</span> {tag.t}
                   </div>
                 ))}
              </div>
            </div>

            {/* FORM CARD */}
            <div className="lg:w-1/3 w-full">
              {submitted ? (
                <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-teal-50 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Screening Booked!</h2>
                  <p className="text-slate-500 mb-8 text-sm">Our LASIK counselor will call you within 15 minutes to confirm your slot.</p>
                  <button onClick={() => setSubmitted(false)} className="text-[#1D646B] font-bold text-sm hover:underline">
                    Book for someone else?
                  </button>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
                  <h2 className="text-2xl font-black mb-2 text-[#1D646B]">Free Eye Screening</h2>
                  <p className="text-slate-500 text-sm mb-6 font-medium">Check your eligibility for LASIK today.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="text" placeholder="Full Name" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
                      value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input 
                      type="tel" placeholder="Mobile Number" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
                      value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    />
                    <select 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B] appearance-none cursor-pointer"
                      value={form.city} onChange={(e) => setForm({...form, city: e.target.value})}
                      required
                    >
                      <option value="">Select City</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                    <button 
                      disabled={loading}
                      className="w-full py-5 bg-[#1D646B] text-white rounded-2xl font-black text-lg hover:bg-[#144b50] shadow-xl shadow-teal-900/20 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "Book Free Screening"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
          
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-teal-200/30 blur-[100px] rounded-full -z-10"></div>
        </section>

        {/* --- TECHNOLOGY GRID --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">World-Class <span className="text-[#1D646B]">Technology.</span></h2>
            <p className="text-slate-500 mt-4 text-lg font-medium">We offer the widest range of eye-correction procedures in India.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((t, i) => (
              <div key={i} className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-teal-500/20 transition-all duration-500 group">
                <div className="w-16 h-16 bg-teal-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  {t.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- LIFESTYLE SECTION --- */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto bg-slate-900 text-white rounded-[60px] p-12 lg:p-24 overflow-hidden relative shadow-2xl">
             <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                <div className="lg:w-1/2">
                   <h2 className="text-4xl lg:text-6xl font-black mb-10 leading-tight">Life After LASIK</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      {[
                        {h: "Freedom", p: "Swim, travel, and play sports without the hassle of glasses.", i: <Waves size={20} />},
                        {h: "HD Vision", p: "Experience colors and details sharper than ever before.", i: <Target size={20} />},
                        {h: "Confidence", p: "No more frames hiding your face. Feel your absolute best.", i: <Sparkles size={20} />},
                        {h: "Savings", p: "Save thousands on frames, lenses, and contact solutions.", i: <Wallet size={20} />}
                      ].map((item, idx) => (
                        <div key={idx} className="group">
                           <div className="flex items-center gap-3 text-teal-400 font-black text-xl mb-3">
                              {item.i} {item.h}
                           </div>
                           <p className="text-slate-400 text-sm leading-relaxed">{item.p}</p>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="lg:w-1/2 relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/5">
                   <Image 
                     src="https://images.unsplash.com/photo-1581594549595-35e6ed9610c7?q=80&w=800" 
                     alt="Vision Freedom" fill className="object-cover group-hover:scale-105 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>
             </div>
             
             {/* Abstract background for dark section */}
             <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/5 blur-[120px] rounded-full"></div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}