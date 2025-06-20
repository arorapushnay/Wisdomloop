"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import AppProviders from "./AppProviders";
import { Toaster, toast } from "./toast";
import { LucideIcon } from "./LucideIcon";
import { motion } from "framer-motion";
import { Card } from "./Card";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Loader, Skeleton } from "./Loader";
import { EmptyState } from "./EmptyState";
import QuickActionsButton from "./AIAssistantBubble";
import SidebarNav from "./SidebarNav";
import Logo from "./Logo";

function MotivationalQuoteCarousel() {
  const quotes = [
    "Every great idea starts with a single step.",
    "Your story matters. Share it with the world!",
    "Consistency is the secret to growth.",
    "You are the creator of your own success.",
    "Small progress is still progress. Keep going!",
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 5000);
    return () => clearInterval(interval);
  }, []);
  return <div className="motivational-quote animate-fade-in">{quotes[index]}</div>;
}

function TooltipIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="z-50 bg-background text-foreground px-3 py-2 rounded-lg shadow-lg text-xs font-medium animate-fade-in">
          {label}
          <Tooltip.Arrow className="fill-background" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function HomeContent() {
  const { data: session, status } = useSession();
  const [analytics, setAnalytics] = useState<null | {
    views: number;
    engagement: number;
    best_performer: string;
  }>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<null | string>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [chunks, setChunks] = useState<string[] | null>(null);
  const [assets, setAssets] = useState<string[] | null>(null);
  const [scheduleStatus, setScheduleStatus] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [brandStatus, setBrandStatus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const brandInputRef = useRef<HTMLInputElement>(null);
  const [brandDesc, setBrandDesc] = useState("");

  // Invite system state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteStatus, setInviteStatus] = useState<string | null>(null);

  // Phase 2: Automation toggle
  const [automationEnabled, setAutomationEnabled] = useState(false);

  // Phase 2: A/B testing state
  const [abVariants, setAbVariants] = useState<string[]>([""]);
  const [abResult, setAbResult] = useState<string | null>(null);

  // Loading and error states
  const [uploadLoading, setUploadLoading] = useState(false);
  const [transcribeLoading, setTranscribeLoading] = useState(false);
  const [chunkLoading, setChunkLoading] = useState(false);
  const [repurposeLoading, setRepurposeLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  // AI Integration: ChatGPT prompt/response
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // TikTok scheduling state
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [tiktokCaption, setTiktokCaption] = useState("");
  const [tiktokStatus, setTiktokStatus] = useState<string | null>(null);
  const [tiktokLoading, setTiktokLoading] = useState(false);

  // Scroll state for collapsing header
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Backend not reachable");
        return res.json();
      })
      .then(setAnalytics)
      .catch((err) => setError(err.message));
  }, []);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    setUploadLoading(true);
    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setUploadStatus("Upload successful!");
      setUploadedFilename(data.filename);
      setTranscript(null);
      setChunks(null);
      toast.success("Video uploaded successfully!");
    } catch (err) {
      setUploadStatus("Upload failed");
      setUploadedFilename(null);
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }
    setUploadLoading(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadLoading(true);
    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setUploadStatus("Upload successful!");
      setUploadedFilename(data.filename);
      setTranscript(null);
      setChunks(null);
      toast.success("Video uploaded successfully!");
    } catch (err) {
      setUploadStatus("Upload failed");
      setUploadedFilename(null);
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }
    setUploadLoading(false);
  };
  const handleTranscribe = async () => {
    if (!uploadedFilename) return;
    setTranscribeLoading(true);
    setTranscript("Transcribing...");
    setChunks(null);
    try {
      const res = await fetch("http://localhost:8000/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: uploadedFilename }),
      });
      if (!res.ok) throw new Error("Transcription failed");
      const data = await res.json();
      setTranscript(data.transcript);
    } catch (err) {
      setTranscript("Transcription failed");
    }
    setTranscribeLoading(false);
  };
  const handleChunk = async () => {
    setChunkLoading(true);
    setChunks(["Chunking..."]);
    setAssets(null);
    try {
      const res = await fetch("http://localhost:8000/chunk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Chunking failed");
      const data = await res.json();
      setChunks(data.chunks);
    } catch (err) {
      setChunks(["Chunking failed"]);
    }
    setChunkLoading(false);
  };
  const handleRepurpose = async () => {
    setRepurposeLoading(true);
    setAssets(["Repurposing..."]);
    setScheduleStatus(null);
    try {
      const res = await fetch("http://localhost:8000/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Repurposing failed");
      const data = await res.json();
      setAssets(data.assets);
    } catch (err) {
      setAssets(["Repurposing failed"]);
    }
    setRepurposeLoading(false);
  };
  const handleSchedule = async () => {
    setScheduleLoading(true);
    setScheduleStatus("Scheduling...");
    try {
      const res = await fetch("http://localhost:8000/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Scheduling failed");
      const data = await res.json();
      setScheduleStatus(data.status);
    } catch (err) {
      setScheduleStatus("Scheduling failed");
    }
    setScheduleLoading(false);
  };

  const handleBrandUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setBrandStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("description", brandDesc);
    try {
      const res = await fetch("http://localhost:8000/brand-style", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setBrandStatus("Upload successful!");
    } catch (err) {
      setBrandStatus("Upload failed");
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteStatus("Sending invite...");
    const formData = new FormData();
    formData.append("email", inviteEmail);
    try {
      const res = await fetch("http://localhost:8000/invite", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Invite failed");
      const data = await res.json();
      setInviteStatus(data.status);
    } catch (err) {
      setInviteStatus("Invite failed");
    }
  };

  const handleAbVariantChange = (i: number, value: string) => {
    setAbVariants((prev) => prev.map((v, idx) => (idx === i ? value : v)));
  };
  const handleAddVariant = () => {
    setAbVariants((prev) => [...prev, ""]);
  };
  const handleAbTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setAbResult("Running A/B test...");
    const formData = new FormData();
    abVariants.forEach((v) => formData.append("variants", v));
    try {
      const res = await fetch("http://localhost:8000/ab-test", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("A/B test failed");
      const data = await res.json();
      setAbResult(`Winner: ${data.winner}`);
    } catch (err) {
      setAbResult("A/B test failed");
    }
  };

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    setAiResponse(null);
    try {
      const res = await fetch("http://localhost:8000/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      if (!res.ok) throw new Error("AI request failed");
      const data = await res.json();
      setAiResponse(data.response);
    } catch (err) {
      setAiResponse("AI request failed");
    }
    setAiLoading(false);
  };

  const handleTiktokSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setTiktokLoading(true);
    setTiktokStatus(null);
    try {
      const formData = new FormData();
      formData.append("content_url", tiktokUrl);
      formData.append("caption", tiktokCaption);
      const res = await fetch("http://localhost:8000/schedule/tiktok", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("TikTok scheduling failed");
      const data = await res.json();
      setTiktokStatus(data.status);
    } catch (err) {
      setTiktokStatus("TikTok scheduling failed");
    }
    setTiktokLoading(false);
  };

  const handleAIVideo = async () => {
    try {
      // Placeholder for actual AI video logic
      toast.success("AI Video generation started!");
    } catch (err) {
      toast.error("Failed to start AI video generation");
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen"><Loader size={48} className="text-primary" /> Loading authentication...</div>;
  }
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Please sign in to access the dashboard</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => signIn("google")}
        >
          Login with Google
        </button>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen">
      {/* SidebarNav is now the only sidebar/nav list */}
      {/* <aside className="hidden md:flex flex-col ..."> ...duplicated nav... </aside> */}
      {/* Main Content Grid */}
      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Personalized Welcome Banner */}
        <div
          className={`card w-full max-w-2xl flex flex-col items-center text-center mb-8 animate-fade-in relative overflow-visible transition-all duration-500 mx-auto ${
            scrolled ? "py-2 shadow-md bg-opacity-80 scale-95" : "py-10 bg-opacity-100 scale-100"
          }`}
        >
          <Image src="/wisdomlooplogo.png" alt="My Logo" width={48} height={48} className="mb-2 mx-auto rounded-lg shadow-md bg-white dark:bg-zinc-900 transition-colors" />
          <div className="flex items-center gap-3 w-full justify-center mb-2">
            <h1 className="text-3xl font-extrabold text-[var(--primary)] drop-shadow transition-all duration-500 flex-1 text-center" style={{ fontFamily: 'Poppins, var(--font-sans)' }}>
              {(() => {
                const hour = new Date().getHours();
                if (hour < 12) return `Good morning${session?.user?.name ? ", " + session.user.name : "!"}`;
                if (hour < 18) return `Good afternoon${session?.user?.name ? ", " + session.user.name : "!"}`;
                return `Good evening${session?.user?.name ? ", " + session.user.name : "!"}`;
              })()}
            </h1>
            <span className="ml-2 bg-[var(--primary-light)] text-[var,--primary)] px-3 py-1 rounded-full text-xs font-semibold shadow-sm">✨ Creator Mode</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2 animate-fade-in">Your content journey is unique. <span className='font-bold text-[var(--accent)]'>Let’s make something amazing today.</span></p>
          {/* Confetti on login */}
          {typeof window !== 'undefined' && window.sessionStorage.getItem('justLoggedIn') === 'true' && (
            <div className="confetti">
              {/* Simple confetti SVGs for effect */}
              <svg width="100vw" height="100vh">
                <circle cx="50" cy="50" r="8" fill="#6c47ff"/>
                <circle cx="200" cy="80" r="6" fill="#ffb347"/>
                <circle cx="400" cy="30" r="7" fill="#4ade80"/>
                <circle cx="700" cy="120" r="5" fill="#a78bfa"/>
                <circle cx="900" cy="60" r="9" fill="#ef4444"/>
              </svg>
            </div>
          )}
        </div>

        {/* Animated Cards for Each Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[0,1,2].map((i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 * (i+1) }} className="h-full flex flex-col">
              {i === 0 && (
                <Card
                  title="Upload Content"
                  subtitle="Upload your video, audio, or document to get started."
                  tag="Step 1"
                  tagColor="bg-primary text-white"
                  tooltip={<TooltipIcon label="Upload a file to begin the content automation process."><LucideIcon name="Info" size={16} /></TooltipIcon>}
                >
                  <div className="flex flex-col gap-4 w-full">
                    <input
                      type="file"
                      ref={inputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      accept="video/*,audio/*,application/pdf,text/plain"
                    />
                    <button
                      className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-bold shadow-md hover:from-accent hover:to-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-150"
                      onClick={() => inputRef.current?.click()}
                      type="button"
                    >
                      <LucideIcon name="UploadCloud" size={20} />Select File
                    </button>
                    <span className="text-muted flex items-center gap-1 text-sm">
                      <LucideIcon name="MousePointerClick" size={16} />or drag & drop here
                    </span>
                    {uploadStatus && <div className="mt-2 text-sm font-medium flex items-center gap-1"><LucideIcon name={uploadStatus.includes('success') ? 'CheckCircle2' : 'AlertCircle'} size={16} />{uploadStatus}</div>}
                    {uploadLoading && <div className="flex items-center gap-2 mt-2"><Loader size={24} />Uploading...</div>}
                    {uploadedFilename && (
                      <button
                        className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-success text-white font-semibold shadow hover:bg-green-700 focus:ring-2 focus:ring-success focus:outline-none transition-all"
                        onClick={handleTranscribe}
                        type="button"
                        disabled={transcribeLoading}
                      >
                        <LucideIcon name="FileText" size={18} />{transcribeLoading ? "Transcribing..." : "Transcribe"}
                      </button>
                    )}
                    {transcript && (
                      <div className="mt-4 p-3 border rounded-lg bg-background/80">
                        <strong className="flex items-center gap-1 text-base"><LucideIcon name="FileText" size={16} />Transcript:</strong>
                        <div className="mt-1 whitespace-pre-line text-sm">{transcript}</div>
                        <button
                          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                          onClick={handleChunk}
                          type="button"
                          disabled={chunkLoading}
                        >
                          <LucideIcon name="Scissors" size={16} />{chunkLoading ? "Chunking..." : "Chunk"}
                        </button>
                        {chunks && (
                          <div className="mt-4">
                            <strong className="flex items-center gap-1 text-base"><LucideIcon name="List" size={16} />Chunks:</strong>
                            <ul className="list-disc ml-6 mt-2 text-sm">
                              {chunks.map((chunk, i) => (
                                <li key={i}>{chunk}</li>
                              ))}
                            </ul>
                            <button
                              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all"
                              onClick={handleRepurpose}
                              type="button"
                              disabled={repurposeLoading}
                            >
                              <LucideIcon name="Sparkles" size={16} />{repurposeLoading ? "Repurposing..." : "Repurpose"}
                            </button>
                            {assets && (
                              <div className="mt-4">
                                <strong className="flex items-center gap-1 text-base"><LucideIcon name="Layers" size={16} />Repurposed Assets:</strong>
                                <ul className="list-disc ml-6 mt-2 text-sm">
                                  {assets.map((asset, i) => (
                                    <li key={i}>{asset}</li>
                                  ))}
                                </ul>
                                <button
                                  className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-800 text-white font-semibold shadow hover:bg-blue-900 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                                  onClick={handleSchedule}
                                  type="button"
                                  disabled={scheduleLoading}
                                >
                                  <LucideIcon name="CalendarCheck2" size={16} />{scheduleLoading ? "Scheduling..." : "Schedule"}
                                </button>
                                {scheduleStatus && (
                                  <div className="mt-4 text-sm font-medium flex items-center gap-1"><LucideIcon name={scheduleStatus.includes('success') ? 'CheckCircle2' : 'AlertCircle'} size={16} />{scheduleStatus}</div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              )}
              {i === 1 && (
                <Card
                  title="Brand Onboarding"
                  subtitle="Upload your brand style or description."
                  tag="Step 2"
                  tagColor="bg-accent text-background"
                  tooltip={<TooltipIcon label="Personalize your content with your brand style."><LucideIcon name="Info" size={16} /></TooltipIcon>}
                >
                  <div className="flex flex-col gap-4 w-full">
                    <input
                      type="file"
                      ref={brandInputRef}
                      className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all"
                      onChange={handleBrandUpload}
                      accept="video/*,audio/*,application/pdf,text/plain"
                    />
                    <input
                      type="text"
                      className="p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all text-base"
                      placeholder="Description (optional)"
                      value={brandDesc}
                      onChange={e => setBrandDesc(e.target.value)}
                    />
                    {brandStatus && <div className="text-sm font-medium mt-2 flex items-center gap-1"><LucideIcon name={brandStatus.includes('success') ? 'CheckCircle2' : 'AlertCircle'} size={16} />{brandStatus}</div>}
                  </div>
                </Card>
              )}
              {i === 2 && (
                <Card
                  title="Invite Team"
                  subtitle="Invite collaborators to your workspace."
                  tag="Optional"
                  tagColor="bg-success text-background"
                  tooltip={<TooltipIcon label="Invite others to collaborate on your content."><LucideIcon name="Info" size={16} /></TooltipIcon>}
                >
                  <form className="flex flex-col gap-4 w-full" onSubmit={handleInvite}>
                    <input
                      type="email"
                      className="p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all text-base"
                      placeholder="Email address"
                      value={inviteEmail}
                      onChange={e => setInviteEmail(e.target.value)}
                      required
                    />
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-success to-primary text-white font-semibold shadow hover:from-primary hover:to-success focus:ring-2 focus:ring-success focus:outline-none transition-all"
                      type="submit"
                    >
                      <LucideIcon name="Send" size={18} />Send Invite
                    </button>
                    {inviteStatus && <div className="text-sm font-medium mt-2 flex items-center gap-1"><LucideIcon name={inviteStatus.includes('fail') ? 'AlertCircle' : 'CheckCircle2'} size={16} />{inviteStatus}</div>}
                  </form>
                </Card>
              )}
            </motion.div>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <Card
              title="A/B Testing"
              subtitle="Test different content variants."
              tag="Pro"
              tagColor="bg-pink-600 text-white"
              tooltip={<TooltipIcon label="Run A/B tests to optimize your content."><LucideIcon name="Info" size={16} /></TooltipIcon>}
            >
              <form className="flex flex-col gap-4 w-full" onSubmit={handleAbTest}>
                {abVariants.map((v, i) => (
                  <input
                    key={i}
                    type="text"
                    className="p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all text-base"
                    placeholder={`Variant ${i + 1}`}
                    value={v}
                    onChange={e => handleAbVariantChange(i, e.target.value)}
                    required
                  />
                ))}
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-background font-semibold shadow hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                    type="button"
                    onClick={handleAddVariant}
                  >
                    <LucideIcon name="Plus" size={16} />Add Variant
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-primary text-white font-semibold shadow hover:from-primary hover:to-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
                    type="submit"
                  >
                    <LucideIcon name="BarChart3" size={18} />Run A/B Test
                  </button>
                </div>
                {abResult && <div className="text-sm font-medium mt-2 flex items-center gap-1"><LucideIcon name={abResult.includes('fail') ? 'AlertCircle' : 'CheckCircle2'} size={16} />{abResult}</div>}
              </form>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
            <Card
              title="AI Repurposing"
              subtitle="Use AI to repurpose your content."
              tag="AI"
              tagColor="bg-purple-600 text-white"
              tooltip={<TooltipIcon label="Leverage AI to create new content formats."><LucideIcon name="Info" size={16} /></TooltipIcon>}
            >
              <form onSubmit={handleAiSubmit} className="flex flex-col gap-4 w-full">
                <textarea
                  className="p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all text-base min-h-[80px]"
                  placeholder="Enter your prompt for ChatGPT (e.g., repurpose this transcript...)"
                  value={aiPrompt}
                  onChange={e => setAiPrompt(e.target.value)}
                  rows={3}
                  required
                />
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-primary text-white font-semibold shadow hover:from-primary hover:to-purple-600 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                  type="submit"
                  disabled={aiLoading}
                >
                  <LucideIcon name="Sparkles" size={18} />{aiLoading ? "Processing with AI..." : "Send to ChatGPT"}
                </button>
                {aiResponse && <div className="mt-4 p-3 border rounded-lg bg-background/80 whitespace-pre-line text-sm">{aiResponse}</div>}
              </form>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
            <Card
              title="TikTok Scheduler"
              subtitle="Schedule content to TikTok."
              tag="Social"
              tagColor="bg-black text-white"
              tooltip={<TooltipIcon label="Schedule your content directly to TikTok."><LucideIcon name="Info" size={16} /></TooltipIcon>}
            >
              <form onSubmit={handleTiktokSchedule} className="flex flex-col gap-4 w-full">
                <input
                  className="p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all text-base"
                  placeholder="Content URL (e.g., video file URL)"
                  value={tiktokUrl}
                  onChange={e => setTiktokUrl(e.target.value)}
                  required
                />
                <input
                  className="p-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all text-base"
                  placeholder="Caption (optional)"
                  value={tiktokCaption}
                  onChange={e => setTiktokCaption(e.target.value)}
                />
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-black to-primary text-white font-semibold shadow hover:from-primary hover:to-black focus:ring-2 focus:ring-black focus:outline-none transition-all"
                  type="submit"
                  disabled={tiktokLoading}
                >
                  <LucideIcon name="Clock" size={18} />{tiktokLoading ? "Scheduling to TikTok..." : "Schedule to TikTok"}
                </button>
                {tiktokStatus && <div className="mt-4 text-sm font-medium flex items-center gap-1"><LucideIcon name={tiktokStatus.includes('fail') ? 'AlertCircle' : 'CheckCircle2'} size={16} />{tiktokStatus}</div>}
              </form>
            </Card>
          </motion.div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>

        {/* Performance Dashboard Toggle */}
        <button
          className="mt-8 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-900"
          onClick={() => setShowDashboard((v) => !v)}
          type="button"
        >
          {showDashboard ? "Hide" : "Show"} Performance Dashboard
        </button>
        {showDashboard && (
          <div className="mt-4 p-4 border rounded bg-white/80 dark:bg-black/40 w-full max-w-md">
            <h2 className="font-bold mb-2">Performance Dashboard</h2>
            {error && <div className="text-red-600">Error: {error}</div>}
            {!analytics && !error && (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-48" />
              </div>
            )}
            {analytics && (
              <ul>
                <li>Views: {analytics.views}</li>
                <li>Engagement: {analytics.engagement}</li>
                <li>Best Performer: {analytics.best_performer}</li>
              </ul>
            )}

            {/* Automation toggle UI */}
            <div className="mt-8 w-full max-w-md p-6 border rounded bg-white/80 dark:bg-black/40">
              <h2 className="font-bold mb-2">Full Pipeline Automation</h2>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={automationEnabled}
                  onChange={() => setAutomationEnabled((v) => !v)}
                />
                <span>Connect & Auto-Schedule (mocked)</span>
              </label>
              {automationEnabled && (
                <div className="mt-2 text-green-700">Automation enabled! All steps will run automatically (mocked).</div>
              )}
            </div>
          </div>
        )}

        {/* Add a link to the marketplace page at the top */}
        <div className="w-full max-w-md mb-2 flex gap-2 flex-wrap">
          <Link href="/marketplace" className="inline-block px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-semibold">Go to Marketplace</Link>
          <Link href="/agency" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">Agency Dashboard</Link>
          <Link href="/analytics" className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold">Advanced Analytics</Link>
          <Link href="/train" className="inline-block px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 font-semibold">Model Training</Link>
          <Link href="/sdk" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold">SDK Integration</Link>
          <Link href="/compliance" className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold">Compliance</Link>
          <Link href="/enterprise" className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 font-semibold">Enterprise</Link>
        </div>
      </main>
      {/* Floating Action Button for Quick Upload */}
      <button className="fab" title="Quick Upload" onClick={() => inputRef.current?.click()}>
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fff"/><path d="M12 7v10M7 12h10" stroke="#6c47ff" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      <QuickActionsButton />
    </div>
  );
}

export default function Home() {
  return (
    <AppProviders>
      <Toaster position="top-right" toastOptions={{
        style: { background: "#232136", color: "#fff", borderRadius: "1.25rem", boxShadow: "0 4px 32px 0 rgba(124,58,237,0.12)" },
        success: { style: { background: "#4ade80", color: "#181825" } },
        error: { style: { background: "#ef4444", color: "#fff" } },
      }} />
      <HomeContent />
    </AppProviders>
  );
}
