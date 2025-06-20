"use client";
import { useState } from "react";
import { BadgeCheck, Loader2, ShieldCheck, Mail, FileText, Calendar, User2, LifeBuoy, ArrowRight, Info, Lock, CreditCard, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockData = {
  tier: "Active",
  sso: { enabled: true, type: "SAML / OAuth2" },
  billing: {
    email: "billing@enterprise.com",
    lastInvoice: "$2,500.00",
    nextPayment: "2025-07-01",
  },
  support: {
    sla: "24/7 Response",
    manager: "Jordan Lee",
  },
};

export default function Enterprise() {
  const [enterprise, setEnterprise] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const handleCheck = async () => {
    setLoading(true);
    setTimeout(() => {
      setEnterprise(mockData);
      setLoading(false);
    }, 1200);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <motion.div
        className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-md p-8 flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top label and status badge */}
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Enterprise Tier:</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${enterprise?.tier === 'Active' ? 'bg-green-700/80 text-green-200' : 'bg-zinc-700/80 text-zinc-300'}`}>{enterprise?.tier || 'Inactive'}</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-zinc-100 text-center">Enterprise Overview</h1>
        <div className="text-sm text-zinc-400 mb-4 text-center">Monitor enterprise access, billing, support, and SSO configuration.</div>
        <button
          className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-700 text-white rounded-lg font-bold shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleCheck}
          disabled={loading}
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? "Checking..." : "Check Enterprise Status"}
        </button>
        {/* Feature Cards */}
        <AnimatePresence>
          {enterprise && !loading && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            >
              {/* SSO Card */}
              <motion.div
                className="rounded-xl bg-zinc-900/80 border border-zinc-800 shadow-lg p-6 flex flex-col items-start gap-3 hover:shadow-2xl transition-all relative"
                whileHover={{ scale: 1.025, y: -2 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold text-zinc-200">SSO Configuration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${enterprise.sso.enabled ? 'bg-green-700/80 text-green-200' : 'bg-zinc-700/80 text-zinc-300'}`}>{enterprise.sso.enabled ? 'Enabled' : 'Disabled'}</span>
                  <span className="text-xs text-zinc-400">({enterprise.sso.type})</span>
                  <span className="ml-1 group relative">
                    <Info className="w-4 h-4 text-zinc-400 hover:text-purple-400 cursor-pointer" />
                    <span className="absolute left-1/2 -translate-x-1/2 top-7 z-10 bg-zinc-800 text-xs text-zinc-200 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Supports SAML & OAuth2 SSO</span>
                  </span>
                </div>
                <button className="mt-2 px-4 py-1.5 bg-purple-700/80 text-white rounded hover:bg-purple-600 transition-all text-xs font-semibold shadow">Configure SSO</button>
              </motion.div>
              {/* Billing Card */}
              <motion.div
                className="rounded-xl bg-zinc-900/80 border border-zinc-800 shadow-lg p-6 flex flex-col items-start gap-3 hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.025, y: -2 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-zinc-200">Billing Overview</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                  <Mail className="w-4 h-4" /> {enterprise.billing.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                  <FileText className="w-4 h-4" /> Last Invoice: <span className="text-zinc-200 font-semibold">{enterprise.billing.lastInvoice}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <Calendar className="w-4 h-4" /> Next Payment: <span className="text-zinc-200 font-semibold">{enterprise.billing.nextPayment}</span>
                </div>
                <a href="#" className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"><FileText className="w-4 h-4" /> View Invoices <ArrowRight className="w-3 h-3" /></a>
              </motion.div>
              {/* Support Card */}
              <motion.div
                className="rounded-xl bg-zinc-900/80 border border-zinc-800 shadow-lg p-6 flex flex-col items-start gap-3 hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.025, y: -2 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <LifeBuoy className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-zinc-200">Support & SLA</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                  <ShieldCheck className="w-4 h-4" /> SLA: <span className="text-zinc-200 font-semibold">{enterprise.support.sla}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <User2 className="w-4 h-4" /> Account Manager: <span className="text-zinc-200 font-semibold">{enterprise.support.manager}</span>
                </div>
                <button className="mt-2 px-4 py-1.5 bg-blue-700/80 text-white rounded hover:bg-blue-600 transition-all text-xs font-semibold shadow">Contact Support</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Footer Compliance Badges */}
        <div className="w-full flex flex-wrap justify-center gap-4 mt-10">
          <div className="flex items-center gap-2 bg-zinc-800/80 px-3 py-1 rounded-full text-xs text-zinc-300 font-semibold shadow"><ShieldCheck className="w-4 h-4 text-green-400" /> SOC2</div>
          <div className="flex items-center gap-2 bg-zinc-800/80 px-3 py-1 rounded-full text-xs text-zinc-300 font-semibold shadow"><BadgeCheck className="w-4 h-4 text-blue-400" /> GDPR</div>
          <div className="flex items-center gap-2 bg-zinc-800/80 px-3 py-1 rounded-full text-xs text-zinc-300 font-semibold shadow"><HelpCircle className="w-4 h-4 text-yellow-400" /> ISO27001</div>
        </div>
      </motion.div>
    </div>
  );
}
