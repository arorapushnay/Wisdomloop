"use client";
import { useState } from "react";
import { Copy, RefreshCw, Trash2, Loader2, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@radix-ui/react-switch";
import { toast } from "../toast";

function randomKey() {
  return (
    Math.random().toString(36).slice(2, 10) +
    "-" +
    Math.random().toString(36).slice(2, 10) +
    "-" +
    Math.random().toString(36).slice(2, 10)
  ).toUpperCase();
}

export default function SdkIntegration() {
  const [sdkKey, setSdkKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [env, setEnv] = useState<'production' | 'sandbox'>('production');
  const [revoked, setRevoked] = useState(false);

  const handleGetKey = async () => {
    setLoading(true);
    setRevoked(false);
    setTimeout(() => {
      const key = randomKey();
      setSdkKey(key);
      setLoading(false);
      toast.success("API Key generated!");
    }, 1200);
  };
  const handleCopy = () => {
    if (sdkKey) {
      navigator.clipboard.writeText(sdkKey);
      toast.success("API Key copied to clipboard");
    }
  };
  const handleRegenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const key = randomKey();
      setSdkKey(key);
      setLoading(false);
      toast.success("API Key regenerated!");
    }, 1000);
  };
  const handleRevoke = () => {
    setSdkKey(null);
    setRevoked(true);
    toast("API Key revoked");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-xl mx-auto rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 border border-dashed border-zinc-700 shadow-2xl backdrop-blur-md p-8 flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2 text-center">SDK Integration</h1>
        <div className="text-sm text-zinc-400 mb-4 text-center">Connect your app with our API using secure access tokens.</div>
        {/* Env Switch */}
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-xs font-medium ${env === 'production' ? 'text-green-400' : 'text-zinc-400'}`}>Production</span>
          <Switch
            checked={env === 'sandbox'}
            onCheckedChange={v => setEnv(v ? 'sandbox' : 'production')}
            className="data-[state=checked]:bg-purple-600 bg-zinc-700 w-10 h-6 rounded-full relative transition-colors"
          >
            <span className="sr-only">Toggle environment</span>
            <span className="block w-4 h-4 bg-white rounded-full shadow absolute left-1 top-1 transition-transform data-[state=checked]:translate-x-4" />
          </Switch>
          <span className={`text-xs font-medium ${env === 'sandbox' ? 'text-purple-400' : 'text-zinc-400'}`}>Sandbox</span>
        </div>
        {/* Generate Key Button */}
        {!sdkKey && !loading && !revoked && (
          <button
            className={`px-6 py-3 bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-700 text-white rounded-lg font-bold shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleGetKey}
            disabled={loading}
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            <KeyRound className="w-5 h-5" /> Generate API Key
          </button>
        )}
        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center gap-2 mt-2">
            <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
            <span className="text-zinc-300 font-mono">Generating key...</span>
          </div>
        )}
        {/* Revoked Message */}
        {revoked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-red-500 font-medium mt-2"
          >
            API Key revoked. Generate a new one to continue.
          </motion.div>
        )}
        {/* API Key Panel */}
        <AnimatePresence>
          {sdkKey && !loading && !revoked && (
            <motion.div
              key="apikey"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="w-full mt-4"
            >
              <div className="mb-1 text-xs font-semibold text-zinc-300">{env === 'production' ? 'SDK Access Token' : 'Sandbox Access Token'}</div>
              <div className="mb-2 text-xs text-zinc-500">Use this in your HTTP headers: <span className="font-mono text-zinc-300">Authorization: Bearer &lt;API_KEY&gt;</span></div>
              <div className="relative bg-zinc-950/90 border border-dashed border-zinc-700 rounded-lg px-4 py-4 font-mono text-green-400 text-lg shadow-inner flex items-center">
                <span className="truncate select-all pr-10">{sdkKey}</span>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-green-400 transition-colors"
                  onClick={handleCopy}
                  aria-label="Copy API Key"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all text-sm font-medium border border-zinc-700"
                  onClick={handleRegenerate}
                >
                  <RefreshCw className="w-4 h-4" /> Regenerate
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-800 text-red-400 hover:bg-red-700/40 transition-all text-sm font-medium border border-zinc-700"
                  onClick={handleRevoke}
                >
                  <Trash2 className="w-4 h-4" /> Revoke
                </button>
              </div>
              <div className="mt-2 text-xs text-red-400">Keep this key secret. Treat it like a password.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
