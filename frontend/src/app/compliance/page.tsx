"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Loader2, ShieldAlert, ChevronDown, ChevronUp, ListChecks } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const checklist = [
	{ label: "Copyright", desc: "Detects copyright infringement and unauthorized use." },
	{ label: "AI Hallucinations", desc: "Flags AI-generated false or misleading content." },
	{ label: "Hate Speech", desc: "Scans for offensive or harmful language." },
	{ label: "PII Leakage", desc: "Checks for personal or sensitive information leaks." },
	{ label: "Platform Terms Violation", desc: "Ensures compliance with platform community guidelines." },
];

export default function Compliance() {
	const [compliance, setCompliance] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [expanded, setExpanded] = useState(false);

	const handleCheck = async () => {
		setLoading(true);
		setProgress(0);
		setCompliance(null);
		// Simulate progress
		let prog = 0;
		const interval = setInterval(() => {
			prog += Math.random() * 30 + 10;
			setProgress(Math.min(100, prog));
			if (prog >= 100) {
				clearInterval(interval);
				setTimeout(() => {
					// Simulate random result
					const statuses = [
						{ status: "Passed", color: "green", icon: CheckCircle2 },
						{ status: "Flagged", color: "red", icon: XCircle },
						{ status: "Warning", color: "yellow", icon: AlertTriangle },
					];
					setCompliance(statuses[Math.floor(Math.random() * statuses.length)]);
					setLoading(false);
				}, 800);
			}
		}, 400);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
			<div className="w-full max-w-xl mx-auto rounded-xl border border-red-600 bg-zinc-900 shadow-2xl p-0 overflow-hidden">
				{/* Red accent line */}
				<div className="h-2 bg-gradient-to-r from-red-600 to-red-400 w-full" />
				<div className="p-8 flex flex-col items-center space-y-6">
					<div className="flex items-center gap-2 mb-1">
						<ShieldAlert className="w-6 h-6 text-red-500" />
						<h1 className="text-2xl font-bold text-zinc-100">Compliance & Moderation</h1>
					</div>
					<div className="text-sm text-zinc-400 text-center mb-2">We run multiple compliance checks to protect your brand and your users. This includes copyright, community guidelines, and legal moderation.</div>
					{/* Checklist */}
					<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-2">
						{checklist.map(item => (
							<div key={item.label} className="flex items-center gap-2 text-zinc-200">
								<CheckCircle2 className="w-4 h-4 text-green-400" />
								<span>{item.label}</span>
							</div>
						))}
					</div>
					{/* Disclosure/Accordion */}
					<div className="w-full">
						<button
							className="flex items-center gap-2 text-xs text-zinc-400 hover:text-red-400 transition-colors mb-1"
							onClick={() => setExpanded(v => !v)}
							aria-expanded={expanded}
							aria-controls="compliance-details"
						>
							<ListChecks className="w-4 h-4" /> What is checked?
							{expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
						</button>
						<AnimatePresence>
							{expanded && (
								<motion.ul
									id="compliance-details"
									initial={{ opacity: 0, y: -8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -8 }}
									className="bg-zinc-800/80 rounded-lg p-4 border border-zinc-700 text-xs text-zinc-300 space-y-2"
								>
									{checklist.map(item => (
										<li key={item.label}>
											<span className="font-semibold text-zinc-200">{item.label}:</span> {item.desc}
										</li>
									))}
								</motion.ul>
							)}
						</AnimatePresence>
					</div>
					{/* Check Compliance Button */}
					<button
						className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-700 text-white rounded-lg font-bold shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={handleCheck}
						disabled={loading}
					>
						{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
						{loading ? "Checking..." : "Check Compliance"}
					</button>
					{/* Progress Bar */}
					<AnimatePresence>
						{loading && (
							<motion.div
								key="progress"
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 8 }}
								className="w-full"
							>
								<div className="w-full bg-zinc-700/80 rounded-full h-2 overflow-hidden mt-2">
									<motion.div
										className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 h-2 rounded-full shadow-lg"
										initial={{ width: 0 }}
										animate={{ width: `${progress}%` }}
										transition={{ duration: 0.5 }}
									/>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
					{/* Result Card */}
					<AnimatePresence>
						{compliance && !loading && (
							<motion.div
								key="result"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								className={`w-full mt-2 rounded-lg flex items-center gap-3 px-4 py-3 shadow-lg border ${
									compliance.color === "green"
										? "bg-green-800/80 border-green-600"
										: compliance.color === "red"
										? "bg-red-800/80 border-red-600"
										: "bg-yellow-700/80 border-yellow-600"
								}`}
							>
								<compliance.icon className="w-6 h-6" />
								<div className="flex flex-col">
									<span className="font-semibold text-lg capitalize">{compliance.status}</span>
									<span className="text-xs text-zinc-200">Content {compliance.status === "Passed" ? "meets" : compliance.status === "Flagged" ? "violates" : "may violate"} compliance requirements.</span>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
