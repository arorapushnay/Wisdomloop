"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "../LucideIcon";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Loader } from "../Loader";
import MarketplaceProviders from "./MarketplaceProviders";

const MOCK_MARKETPLACE = [
	{ name: "MrBeast-style Hook Generator", type: "Persona", price: "$9" },
	{ name: "SaaS Founder Carousel Pack", type: "Template", price: "$5" },
	{ name: "Podcast Shorts Wizard", type: "Persona", price: "$7" },
	{ name: "LinkedIn Thought Leader Kit", type: "Template", price: "$6" },
];

const MARKETPLACE_ICONS: Record<"Persona" | "Template", "Brain" | "Puzzle"> = {
	Persona: "Brain",
	Template: "Puzzle",
};
const MARKETPLACE_EMOJIS = {
	Persona: "🧠",
	Template: "🧩",
};
const MARKETPLACE_BADGE_COLORS = {
	Persona: "bg-purple-600 text-white",
	Template: "bg-blue-600 text-white",
};

export default function Marketplace() {
	const [selected, setSelected] = useState<number | null>(null);
	const [loading, setLoading] = useState<number | null>(null);
	return (
		<MarketplaceProviders>
			<div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
				<h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
					AI Persona & Template Marketplace
				</h1>
				<div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{MOCK_MARKETPLACE.map((item, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 32 }}
							animate={{ opacity: 1, y: 0 }}
							whileHover={{
								scale: 1.04,
								boxShadow:
									"0 0 0 4px #a78bfa55, 0 8px 32px 0 rgba(124,58,237,0.18)",
							}}
							transition={{ duration: 0.4, type: "spring" }}
							className="relative rounded-2xl bg-card/90 border border-border shadow-card p-6 flex flex-col gap-4 group transition-all duration-200 overflow-hidden"
						>
							{/* Preview image or icon */}
							<div className="flex items-center justify-center h-16 mb-2">
								<span className="text-3xl md:text-4xl">
									{MARKETPLACE_EMOJIS[item.type as keyof typeof MARKETPLACE_EMOJIS]}
								</span>
							</div>
							{/* Badge */}
							<Tooltip.Root>
								<Tooltip.Trigger asChild>
									<span
										className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-md ${MARKETPLACE_BADGE_COLORS[item.type as keyof typeof MARKETPLACE_BADGE_COLORS]} transition-transform duration-200 cursor-pointer group-hover:scale-105 group-hover:shadow-glow`}
									>
										{item.type}
									</span>
								</Tooltip.Trigger>
								<Tooltip.Portal>
									<Tooltip.Content className="z-50 bg-background text-foreground px-3 py-2 rounded-lg shadow-lg text-xs font-medium animate-fade-in">
										{item.type === "Persona"
											? "A persona is an AI-powered content style or voice."
											: "A template is a reusable content structure or format."}
										<Tooltip.Arrow className="fill-background" />
									</Tooltip.Content>
								</Tooltip.Portal>
							</Tooltip.Root>
							{/* Title with icon */}
							<div className="flex items-center gap-2 text-xl font-bold text-white">
								<LucideIcon name={MARKETPLACE_ICONS[item.type as "Persona" | "Template"]} size={22} />
								<span>{item.name}</span>
							</div>
							<div className="text-muted text-base mb-2">
								{item.type === "Persona"
									? "Premium AI Persona"
									: "Content Template"}
							</div>
							<div className="flex items-center justify-between mt-auto gap-2">
								<span className="font-extrabold text-lg text-white">
									{item.price}
								</span>
								<Tooltip.Root>
									<Tooltip.Trigger asChild>
										<button
											className="px-5 py-2 rounded-full font-bold bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow transition-all duration-150 flex items-center gap-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
											onClick={() => {
												setLoading(i);
												setTimeout(() => {
													setSelected(i);
													setLoading(null);
												}, 1200);
											}}
											disabled={selected === i || loading === i}
										>
											{loading === i ? (
												<Loader size={18} />
											) : (
												<LucideIcon name="ShoppingCart" size={18} />
											)}
											{loading === i
												? "Processing..."
												: selected === i
												? "Purchased"
												: "Buy"}
										</button>
									</Tooltip.Trigger>
									<Tooltip.Portal>
										<Tooltip.Content className="z-50 bg-background text-foreground px-3 py-2 rounded-lg shadow-lg text-xs font-medium animate-fade-in">
											{item.type === "Persona"
												? "Buy this persona to unlock a new AI-powered content style."
												: "Buy this template to quickly create new content formats."}
											<Tooltip.Arrow className="fill-background" />
										</Tooltip.Content>
									</Tooltip.Portal>
								</Tooltip.Root>
							</div>
						</motion.div>
					))}
				</div>
				{selected !== null && (
					<div className="mt-8 p-4 border rounded-xl bg-green-900/80 text-green-200 font-semibold shadow animate-fade-in">
						Thank you for your purchase! (mocked)
					</div>
				)}
			</div>
		</MarketplaceProviders>
	);
}
