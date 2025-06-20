"use client";
import { useState } from "react";
import { Loader2, ShieldCheck, Trash2, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "../toast";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Profile() {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane@example.com");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError(null);
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      toast.success("Profile updated!");
      setTimeout(() => setStatus("idle"), 1200);
    }, 1200);
  };

  return (
    <div className="max-w-lg mx-auto mt-20 space-y-6 px-4">
      <motion.div
        className="rounded-xl border border-zinc-800 bg-zinc-900/80 shadow-xl p-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center w-full mb-4">
          <div className="rounded-full w-16 h-16 bg-purple-700 text-white flex items-center justify-center text-2xl font-bold mb-2">
            {getInitials(name)}
          </div>
          <div className="text-xs text-zinc-400 border-b border-zinc-700 w-full text-center pb-2 mb-2">Member since Jan 2025 · Free Plan</div>
        </div>
        {/* Profile Form */}
        <form className="w-full space-y-4" onSubmit={handleSave} autoComplete="off">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-200">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-200">Email</label>
            <input
              type="email"
              className={`w-full px-3 py-2 border rounded-lg bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${emailError ? 'border-red-500' : 'border-zinc-700'}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="off"
            />
            {emailError && <div className="text-xs text-red-500 mt-1">{emailError}</div>}
          </div>
          <button
            className={`w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-700 text-white rounded-lg font-bold shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
            Save
          </button>
        </form>
      </motion.div>
      {/* Settings Section */}
      <motion.div
        className="rounded-xl border border-zinc-800 bg-zinc-900/80 shadow p-4 divide-y divide-zinc-800 mt-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 py-3 hover:bg-zinc-800/60 transition cursor-pointer">
          <KeyRound className="w-5 h-5 text-purple-400" />
          <span className="text-sm text-zinc-200 font-medium">Change Password</span>
        </div>
        <div className="flex items-center gap-3 py-3 hover:bg-zinc-800/60 transition cursor-pointer">
          <ShieldCheck className="w-5 h-5 text-green-400" />
          <span className="text-sm text-zinc-200 font-medium">Two-Factor Auth</span>
        </div>
        <div className="flex items-center gap-3 py-3 hover:bg-zinc-800/60 transition cursor-pointer">
          <Trash2 className="w-5 h-5 text-red-400" />
          <span className="text-sm text-zinc-200 font-medium">Delete Account</span>
        </div>
      </motion.div>
    </div>
  );
}
