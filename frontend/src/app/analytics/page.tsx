"use client";
import { useState } from "react";
import { BarChart4, Sparkles, MessageCircle, ArrowLeft, ArrowRight, Clock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AdvancedAnalytics() {
  const [recommendation, setRecommendation] = useState<null | {
    title: string;
    platform: string;
    time: string;
  }>(null);
  const [tab, setTab] = useState<'prediction' | 'performance'>('prediction');

  return (
    <div className="max-w-2xl mx-auto mt-20 space-y-6 px-4">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between mb-2">
        <button
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${tab === 'prediction' ? 'bg-purple-700/80 text-white shadow-lg' : 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700/80'}`}
          onClick={() => setTab('prediction')}
        >
          <BarChart4 className="w-4 h-4" /> Prediction
        </button>
        <button
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${tab === 'performance' ? 'bg-purple-700/80 text-white shadow-lg' : 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700/80'}`}
          onClick={() => setTab('performance')}
        >
          <Sparkles className="w-4 h-4" /> Performance
        </button>
        <Link href="/" className="flex items-center gap-1 text-zinc-400 hover:text-purple-400 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
      </div>
      <AnimatePresence mode="wait">
        {tab === 'prediction' ? (
          <motion.div
            key="prediction"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:gap-8"
          >
            {/* Engagement Prediction Card */}
            <motion.div
              className="relative rounded-2xl p-6 bg-zinc-900/80 border border-purple-700/40 shadow-xl backdrop-blur-md overflow-hidden"
              style={{ boxShadow: '0 4px 32px 0 rgba(80,0,120,0.18)' }}
              whileHover={{ scale: 1.025, boxShadow: '0 6px 40px 0 rgba(120,0,255,0.22)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <BarChart4 className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-semibold tracking-tight">Engagement Prediction</span>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Predicted Engagement</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-green-400 text-lg">High</span>
                <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
              </div>
              {/* Confidence Bar */}
              <div className="w-full bg-zinc-700/80 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-green-400 via-purple-400 to-blue-400 h-2 rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: '88%' }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                />
              </div>
              <div className="text-xs text-zinc-400 mb-2">Confidence: 88%</div>
              {/* AI Copilot Bubble */}
              <motion.div
                className="flex items-center gap-2 mt-4 bg-zinc-800/80 rounded-xl px-4 py-2 shadow-inner border border-zinc-700/60 w-fit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <MessageCircle className="w-4 h-4 text-purple-300" />
                <span className="text-sm text-purple-200">This video is trending this week!</span>
              </motion.div>
            </motion.div>

            {/* Next Best Post Recommendation Card */}
            <motion.div
              className="rounded-2xl p-6 bg-zinc-900/80 border border-green-600/30 shadow-xl backdrop-blur-md overflow-hidden"
              style={{ boxShadow: '0 4px 32px 0 rgba(0,255,120,0.10)' }}
              whileHover={{ scale: 1.025, boxShadow: '0 6px 40px 0 rgba(0,255,120,0.18)' }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-400" />
                <span className="text-xl font-semibold tracking-tight">Next Best Post Recommendation</span>
              </div>
              <div className="text-sm text-muted-foreground mb-4">Boost your reach with AI-powered suggestions.</div>
              <div className="flex flex-col gap-3">
                <motion.button
                  className={`mt-1 px-6 py-3 bg-green-500 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-200 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 active:scale-95 animate-pulse flex items-center justify-center ${recommendation ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 16px 2px #22d3ee' }}
                  onClick={() => setRecommendation({
                    title: "Try a short, high-energy video with a bold hook!",
                    platform: "TikTok",
                    time: "Today, 7:30 PM"
                  })}
                  disabled={!!recommendation}
                >
                  {recommendation ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                  Get Recommendation
                </motion.button>
                <AnimatePresence>
                  {recommendation && (
                    <motion.div
                      key="rec"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className="mt-4 bg-zinc-800/80 border border-green-500/30 rounded-xl p-4 flex items-center gap-4 shadow-inner"
                    >
                      <Sparkles className="w-8 h-8 text-pink-400" />
                      <div>
                        <div className="font-semibold text-lg text-green-300 mb-1">{recommendation.title}</div>
                        <div className="flex items-center gap-2 text-sm text-zinc-300">
                          <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-pink-400" /> {recommendation.platform}</span>
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-blue-300" /> {recommendation.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <motion.div
              className="rounded-2xl p-6 bg-zinc-900/80 border border-blue-700/40 shadow-xl backdrop-blur-md overflow-hidden"
              style={{ boxShadow: '0 4px 32px 0 rgba(0,120,255,0.18)' }}
              whileHover={{ scale: 1.025, boxShadow: '0 6px 40px 0 rgba(0,120,255,0.22)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <BarChart4 className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-semibold tracking-tight">Performance Analytics</span>
              </div>
              <div className="text-sm text-muted-foreground mb-1">Recent Post Performance</div>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Views</span>
                  <span className="font-bold text-blue-300">12,400</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Likes</span>
                  <span className="font-bold text-green-300">1,230</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Shares</span>
                  <span className="font-bold text-purple-300">320</span>
                </div>
              </div>
              <div className="mt-6 text-xs text-zinc-400">Data is updated hourly. <span className="text-blue-400">Learn more</span></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
