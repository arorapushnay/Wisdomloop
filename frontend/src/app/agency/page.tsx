"use client";
import { motion } from "framer-motion";
import { useState } from "react";

import { LucideIcon } from "../LucideIcon";
import { WhiteLabelSwitch } from "./WhiteLabelSwitch";

const MOCK_BRANDS = [
	{ name: "Acme Agency", clients: ["Brand A", "Brand B"] },
	{ name: "Solo Creator", clients: ["My Personal Brand"] },
];

export default function AgencyDashboard() {
	const [selectedBrand, setSelectedBrand] = useState(0);
	const [selectedClient, setSelectedClient] = useState(0);
	const [whiteLabel, setWhiteLabel] = useState(false);
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-background">
			{/* Agency header with logo */}
			<div className="flex items-center gap-3 mb-8 w-full max-w-3xl mx-auto">
				<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white shadow-glow">
					<LucideIcon name="Building2" size={28} />
				</div>
				<span className="text-2xl font-bold text-white">
					{MOCK_BRANDS[selectedBrand].name}
				</span>
			</div>
			<div className="w-full max-w-3xl mx-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{/* Selection Card */}
				<motion.div
					initial={{ opacity: 0, y: 32 }}
					animate={{ opacity: 1, y: 0 }}
					whileHover={{
						scale: 1.02,
						boxShadow:
							"0 0 0 4px #a78bfa55, 0 8px 32px 0 rgba(124,58,237,0.18)",
					}}
					transition={{ duration: 0.5, type: "spring" }}
					className="bg-card/90 border border-border rounded-2xl shadow-card p-6 md:p-8 flex flex-col gap-6 transition-all duration-200 hover:shadow-glow"
				>
					<h1 className="text-xl font-semibold text-primary flex items-center gap-2 mb-4">
						<LucideIcon name="Building2" size={22} />Agency Dashboard
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="flex items-center gap-2 text-sm text-muted-foreground mb-1 font-normal">
								<LucideIcon name="Building2" size={16} />Select Agency/Brand
							</label>
							<select
								className="p-3 rounded-lg border border-border bg-background text-foreground w-full focus:ring-2 focus:ring-primary focus:outline-none transition-all"
								value={selectedBrand}
								onChange={e => {
									setSelectedBrand(Number(e.target.value));
									setSelectedClient(0);
								}}
							>
								{MOCK_BRANDS.map((b, i) => (
									<option key={i} value={i}>
										{b.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="flex items-center gap-2 text-sm text-muted-foreground mb-1 font-normal">
								<LucideIcon name="UsersRound" size={16} />Select Client
							</label>
							<select
								className="p-3 rounded-lg border border-border bg-background text-foreground w-full focus:ring-2 focus:ring-primary focus:outline-none transition-all"
								value={selectedClient}
								onChange={e => setSelectedClient(Number(e.target.value))}
							>
								{MOCK_BRANDS[selectedBrand].clients.map((c, i) => (
									<option key={i} value={i}>
										{c}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="mt-4">
						<WhiteLabelSwitch
							enabled={whiteLabel}
							onChange={setWhiteLabel}
						/>
					</div>
				</motion.div>
				{/* Client Reporting Card */}
				<motion.div
					initial={{ opacity: 0, y: 32 }}
					animate={{ opacity: 1, y: 0 }}
					whileHover={{
						scale: 1.02,
						boxShadow:
							"0 0 0 4px #4ade80aa, 0 8px 32px 0 rgba(16,185,129,0.18)",
					}}
					transition={{ duration: 0.5, type: "spring" }}
					className="bg-card/90 border border-border rounded-2xl shadow-card p-6 md:p-8 flex flex-col gap-6 transition-all duration-200 hover:shadow-glow"
				>
					<h2 className="text-xl font-semibold text-primary mb-4">
						Client Reporting
					</h2>
					<div className="grid grid-cols-2 gap-6 mb-4">
						<div>
							<div className="text-3xl font-mono font-bold text-white">12</div>
							<div className="text-sm text-muted-foreground">Posts</div>
						</div>
						<div>
							<div className="text-3xl font-mono font-bold text-white">
								1,234
							</div>
							<div className="text-sm text-muted-foreground">
								Engagement
							</div>
							{/* Mini bar chart placeholder */}
							<div className="mt-2 flex items-end gap-1 h-8">
								<div className="w-2 h-3 bg-primary rounded" />
								<div className="w-2 h-6 bg-accent rounded" />
								<div className="w-2 h-5 bg-primary rounded" />
								<div className="w-2 h-4 bg-accent rounded" />
								<div className="w-2 h-7 bg-primary rounded" />
							</div>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div>
							<div className="text-base font-semibold text-white">
								Best Performer
							</div>
							<div className="text-sm text-muted-foreground">
								&quot;Brand Video #2&quot;
							</div>
						</div>
						<div className="ml-auto flex items-center gap-2">
							<span className="bg-green-700 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
								Available
							</span>
							{whiteLabel && (
								<span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-semibold">
									White-label
								</span>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
