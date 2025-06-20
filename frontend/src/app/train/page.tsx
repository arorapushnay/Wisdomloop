"use client";
import { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, XCircle, Loader2, Bot, FileText, ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const intensityOptions = [
	{ label: "Light", desc: "Fastest, for small datasets and quick tests." },
	{ label: "Balanced", desc: "Good for most use cases. Balanced speed and accuracy." },
	{ label: "Deep", desc: "Thorough, best for large or complex datasets." },
];

export default function ModelTraining() {
	const [file, setFile] = useState<File | null>(null);
	const [status, setStatus] = useState<'idle' | 'uploading' | 'training' | 'success' | 'error'>("idle");
	const [progress, setProgress] = useState(0);
	const [intensity, setIntensity] = useState(intensityOptions[1]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// Simulate upload and training
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			setFile(e.dataTransfer.files[0]);
			setStatus("uploading");
			setProgress(0);
			simulateTraining();
		}
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
			setStatus("uploading");
			setProgress(0);
			simulateTraining();
		}
	};
	const simulateTraining = () => {
		setStatus("training");
		setProgress(0);
		let prog = 0;
		const interval = setInterval(() => {
			prog += Math.random() * 18 + 7;
			setProgress(Math.min(100, prog));
			if (prog >= 100) {
				clearInterval(interval);
				setTimeout(() => {
					setStatus(Math.random() > 0.15 ? "success" : "error");
				}, 800);
			}
		}, 400);
	};
	const handleBrowse = () => inputRef.current?.click();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-12">
			<motion.div
				className="w-full max-w-md mx-auto rounded-xl border border-purple-700/40 bg-zinc-900/80 shadow-2xl backdrop-blur-md p-8 flex flex-col items-center"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="flex flex-col items-center w-full">
					<motion.div
						whileHover={{ scale: 1.12, rotate: -8 }}
						className="mb-2"
					>
						<UploadCloud className={`w-12 h-12 text-purple-400 drop-shadow-lg transition-transform ${status === 'success' ? 'animate-bounce' : ''}`} />
					</motion.div>
					<h1 className="text-2xl font-bold mb-1 text-center">Model Training</h1>
					<div className="text-sm text-zinc-400 mb-4 text-center">Upload a dataset to train your AI assistant. JSON, CSV, and .txt supported.</div>
					{/* Dropzone */}
					<div
						className={`w-full rounded-xl border-dashed border-2 bg-zinc-900/80 border-purple-700/40 flex flex-col items-center justify-center py-8 px-4 mb-3 cursor-pointer transition-all duration-200 hover:border-purple-400/80 hover:bg-zinc-900/90 ${status === 'training' ? 'opacity-60 pointer-events-none' : ''}`}
						onClick={handleBrowse}
						onDrop={handleDrop}
						onDragOver={e => e.preventDefault()}
						tabIndex={0}
						role="button"
						aria-label="Upload file"
					>
						<input
							type="file"
							ref={inputRef}
							className="hidden"
							onChange={handleFileChange}
							accept=".json,.csv,.txt"
							disabled={status === 'training'}
						/>
						<UploadCloud className="w-10 h-10 text-purple-400 mb-2 animate-pulse" />
						<div className="text-zinc-300 font-medium">Drag & drop or click to upload</div>
						<div className="text-xs text-zinc-500 mt-1">Max 10MB</div>
						{file && (
							<div className="flex items-center gap-2 mt-3 text-green-400">
								<CheckCircle2 className="w-5 h-5" />
								<span className="truncate max-w-[160px]">{file.name}</span>
								<span className="text-xs text-zinc-400">({(file.size / 1024).toFixed(1)} KB)</span>
							</div>
						)}
					</div>
					{/* Training Intensity Dropdown */}
					<div className="w-full mb-4">
						<div className="flex items-center gap-2 mb-1">
							<FileText className="w-4 h-4 text-purple-300" />
							<span className="text-sm font-medium text-zinc-200">Training Intensity</span>
						</div>
						<div className="relative">
							<button
								className="w-full flex items-center justify-between bg-zinc-800/80 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-200 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
								onClick={() => setDropdownOpen(v => !v)}
								type="button"
								aria-haspopup="listbox"
								aria-expanded={dropdownOpen}
							>
								{intensity.label}
								{dropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
							</button>
							<AnimatePresence>
								{dropdownOpen && (
									<motion.ul
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										className="absolute z-10 left-0 right-0 mt-2 bg-zinc-900/95 border border-zinc-700 rounded-lg shadow-lg"
									>
										{intensityOptions.map(opt => (
											<li
												key={opt.label}
												className={`px-4 py-2 cursor-pointer hover:bg-purple-800/30 text-zinc-200 ${opt.label === intensity.label ? 'font-bold text-purple-400' : ''}`}
												onClick={() => { setIntensity(opt); setDropdownOpen(false); }}
												role="option"
												aria-selected={opt.label === intensity.label}
											>
												{opt.label}
												<div className="text-xs text-zinc-400 font-normal">{opt.desc}</div>
											</li>
										))}
									</motion.ul>
								)}
							</AnimatePresence>
						</div>
						<div className="text-xs text-zinc-400 mt-1">{intensity.desc}</div>
					</div>
					{/* Progress Bar & Status */}
					<AnimatePresence>
						{status === 'training' && (
							<motion.div
								key="progress"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								className="w-full mb-2"
							>
								<div className="flex items-center gap-2 mb-1">
									<Loader2 className="w-4 h-4 animate-spin text-blue-400" />
									<span className="text-sm text-blue-300 font-medium">Model training in progress...</span>
								</div>
								<div className="w-full bg-zinc-700/80 rounded-full h-2 overflow-hidden">
									<motion.div
										className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 h-2 rounded-full shadow-lg"
										initial={{ width: 0 }}
										animate={{ width: `${progress}%` }}
										transition={{ duration: 0.5 }}
									/>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
					{/* AI Avatar Bubble */}
					<AnimatePresence>
						{status === 'training' && (
							<motion.div
								key="ai-bubble"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								className="flex items-center gap-2 mt-3 bg-zinc-800/80 rounded-xl px-4 py-2 shadow-inner border border-zinc-700/60 w-fit"
							>
								<Bot className="w-5 h-5 text-purple-300" />
								<span className="text-sm text-purple-200 animate-pulse">Analyzing dataset structure...</span>
							</motion.div>
						)}
					</AnimatePresence>
					{/* Success/Error Badge */}
					<AnimatePresence>
						{status === 'success' && (
							<motion.div
								key="success"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								className="flex items-center gap-2 mt-4 bg-green-700/80 text-white px-4 py-2 rounded-lg shadow"
							>
								<CheckCircle2 className="w-5 h-5" />
								<span className="font-medium">Training complete! Your model is ready.</span>
							</motion.div>
						)}
						{status === 'error' && (
							<motion.div
								key="error"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								className="flex items-center gap-2 mt-4 bg-red-700/80 text-white px-4 py-2 rounded-lg shadow"
							>
								<XCircle className="w-5 h-5" />
								<span className="font-medium">Training failed. Please try again.</span>
							</motion.div>
						)}
					</AnimatePresence>
					{/* View Logs Button */}
					<div className="w-full flex justify-end mt-6">
						<button
							className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:bg-zinc-800/80 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed relative group"
							disabled={status !== 'success'}
							type="button"
						>
							<LogOut className="w-4 h-4" /> View Logs
							<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs text-zinc-200 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Available after training</span>
						</button>
					</div>
					{/* Upload & Train Button */}
					<button
						className={`mt-1 px-6 py-3 bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-green-300 active:scale-95 animate-pulse flex items-center justify-center ${status === 'training' ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={handleBrowse}
						disabled={status === 'training'}
						type="button"
					>
						{status === 'training' && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
						Upload & Train
					</button>
				</div>
			</motion.div>
		</div>
	);
}
