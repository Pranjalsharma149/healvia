"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Verified Supabase connection
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { 
  CheckCircle2, 
  Loader2, 
  Microscope, 
  Zap, 
  Stethoscope, 
  Leaf, 
  ChevronRight 
} from "lucide-react";

export default function GastroPage() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Gastroenterology" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const treatments = [
    {
      title: "Laparoscopic Surgery",
      desc: "Advanced keyhole surgery for Gallbladder stones and Hernia. Minimal pain and faster discharge.",
      icon: <Microscope className="text-blue-600" size={32} />
    },
    {
      title: "Laser Piles Treatment",
      desc: "US-FDA approved laser procedure for Piles, Fissure, and Fistula. No cuts, no recurrence.",
      icon: <Zap className="text-orange-500" size={32} />
    },
    {
      title: "Endoscopy & Colonoscopy",
      desc: "High-definition diagnostic imaging for stomach, liver, and intestinal health screening.",
      icon: <Stethoscope className="text-teal-600" size={32} />
    },
    {
      title: "Liver & Digestive Care",
      desc: "Comprehensive management for Fatty Liver, GERD, Acid Reflux, and Gastritis.",
      icon: <Leaf className="text-green-600" size={32} />
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Direct Database Insert
      const { error } = await supabase.from("leads").insert([form]);
      if (error) throw error;

      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "Gastroenterology" });
    } catch (error: any) {
      alert("Submission Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="relative bg-gradient-to-br from-[#fdfcfb] via-white to-[#e2d1c3]/20 py-20 lg:py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2">
              <span className="text-orange-600 font-bold tracking-widest uppercase text-xs mb-4 block">Center for Digestive Excellence</span>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                Advanced <br/>
                <span className="text-[#1D646B]">Digestive Care.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                Precision Laparoscopic and Laser treatments for Gastric issues. Experience pain-free recovery with India's expert Gastroenterologists.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                 {["Laparoscopic Experts", "Pain-Free Laser", "24hr Discharge"].map((tag) => (
                   <div key={tag} className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-orange-100 text-slate-700 font-bold text-xs flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-orange-500" /> {tag}
                   </div>
                 ))}
              </div>
            </div>

            {/* CONSULTATION FORM */}
            <div className="lg:w-1/3 w-full">
              {submitted ? (
                <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-teal-50 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Query Sent!</h2>
                  <p className="text-slate-500 mb-8 text-sm">Our medical expert will call you back within 10 minutes.</p>
                  <button onClick={() => setSubmitted(false)} className="text-[#1D646B] font-bold text-sm flex items-center justify-center gap-1 mx-auto hover:gap-2 transition-all">
                    Fill another form <ChevronRight size={16} />
                  </button>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
                  <h2 className="text-2xl font-black mb-2 text-[#1D646B]">Consult a Specialist</h2>
                  <p className="text-slate-500 text-sm mb-6 font-medium">Get a personalized treatment plan today.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="text" placeholder="Patient Name" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
                      value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input 
                      type="tel" placeholder="Mobile Number" required 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#1D646B] transition-all"
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
                      <option value="Mumbai">Mumbai</option>
                    </select>
                    <button 
                      disabled={loading}
                      className="w-full py-5 bg-[#1D646B] text-white rounded-2xl font-black text-lg hover:shadow-xl hover:bg-[#155a60] transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "Book Free Consultation"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- SERVICE GRID --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((t, i) => (
              <div key={i} className="group p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{t.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- MODERN SURGERY HIGHLIGHT --- */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto bg-slate-50 rounded-[60px] p-10 lg:p-20 flex flex-col lg:flex-row-reverse items-center gap-16 border border-slate-100 shadow-sm">
             <div className="lg:w-1/2">
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">Why Choose Laparoscopic Surgery?</h2>
                <div className="grid gap-4">
                    {[
                      {h: "Minimal Pain", p: "Smaller incisions mean significantly less post-operative discomfort."},
                      {h: "Quick Discharge", p: "Most laparoscopic patients are ready to go home within 24-48 hours."},
                      {h: "Lowest Risk of Infection", p: "Minimal exposure reduces surgical complications."},
                      {h: "Aesthetic Outcomes", p: "Nearly invisible scars compared to traditional open surgery."}
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-6 bg-white rounded-3xl border border-slate-200/50 shadow-sm">
                        <CheckCircle2 className="text-[#1D646B] shrink-0" size={24} />
                        <div>
                           <h4 className="font-bold text-slate-900 text-lg mb-1">{item.h}</h4>
                           <p className="text-slate-500 text-sm leading-relaxed">{item.p}</p>
                        </div>
                      </div>
                    ))}
                </div>
             </div>
             <div className="lg:w-1/2 relative h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800" 
                  alt="Laparoscopic Surgery" fill className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 via-transparent to-transparent"></div>
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}