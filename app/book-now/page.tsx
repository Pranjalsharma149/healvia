"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Ensure this matches your file name in /lib
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function BookNowPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    service: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* HANDLE INPUT CHANGE */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* HANDLE SUBMIT (CONNECTED TO SUPABASE) */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to the 'leads' table you created in Supabase
      const { error } = await supabase
        .from("leads")
        .insert([
          {
            name: form.name,
            phone: form.phone,
            city: form.city,
            service: form.service,
            status: "New",
          },
        ]);

      if (error) throw error;

      // Show success state
      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", service: "" });
    } catch (error: any) {
      alert("Error submitting request: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  /* SUCCESS SCREEN */
  if (submitted) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-[#f5fbfb] px-6">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-md w-full border border-teal-50">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>

            <h2 className="text-3xl font-bold text-[#1D646B] mb-3">
              Booking Confirmed!
            </h2>

            <p className="text-slate-500 mb-8">
              Thank you for choosing HealviaCare. Our medical coordinator will contact you within 5–10 minutes.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-[#1D646B] text-white px-6 py-4 rounded-2xl font-bold hover:bg-[#155a60] transition-all shadow-lg shadow-teal-900/20"
            >
              Book Another Consultation
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#f5fbfb] via-white to-[#e6f7f5] flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
          
          {/* HEADING */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-[#1D646B] mb-3">
              Free Consultation
            </h2>
            <p className="text-slate-500 text-sm">
              Take the first step towards your recovery today.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1D646B] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 00000 00000"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1D646B] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Delhi"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1D646B] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Service</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1D646B] transition-all appearance-none"
                >
                  <option value="">Select</option>
                  <option value="LASIK">LASIK</option>
                  <option value="Cataract">Cataract</option>
                  <option value="Urology">Urology</option>
                  <option value="Vascular">Vascular</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1D646B] to-[#2a8d96] text-white py-5 rounded-2xl font-bold shadow-xl shadow-teal-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                "Book Free Consultation"
              )}
            </button>

            <p className="text-[10px] text-center text-slate-400">
              By clicking "Book Free Consultation", you agree to our Terms & Privacy Policy.
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}