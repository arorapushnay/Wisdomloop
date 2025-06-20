"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User2, Store, KeyRound, BarChart4, Settings, LogOut } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import Logo from "./Logo";

const navSections = [
	{
		label: "Main",
		items: [
			{ href: "/", label: "Dashboard", icon: <Store className="w-5 h-5" /> },
			{ href: "/marketplace", label: "Marketplace", icon: <Store className="w-5 h-5" /> },
			{ href: "/agency", label: "Agency", icon: <User2 className="w-5 h-5" /> },
		],
	},
	{
		label: "AI Tools",
		items: [
			{ href: "/analytics", label: "Analytics", icon: <BarChart4 className="w-5 h-5" /> },
			{ href: "/train", label: "Model Training", icon: <KeyRound className="w-5 h-5" /> },
			{ href: "/sdk", label: "SDK", icon: <KeyRound className="w-5 h-5" /> },
		],
	},
	{
		label: "Admin",
		items: [
			{ href: "/compliance", label: "Compliance", icon: <Settings className="w-5 h-5" /> },
			{ href: "/enterprise", label: "Enterprise", icon: <Settings className="w-5 h-5" /> },
			{ href: "/profile", label: "Profile", icon: <User2 className="w-5 h-5" /> },
		],
	},
];

export function SidebarNav() {
	const pathname = usePathname();
	return (
		<nav className="sticky top-0 h-screen flex flex-col gap-2 bg-zinc-950/80 border-r border-zinc-800 px-4 py-8 min-w-[200px]">
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<div className="mb-8">
						<Logo className="flex items-center gap-2 px-4 py-3 text-lg font-semibold w-full overflow-hidden" size={32} />
					</div>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="z-50 bg-background text-foreground px-3 py-2 rounded-lg shadow-lg text-xs font-medium animate-fade-in">
						Wisdomloop Home
						<Tooltip.Arrow className="fill-background" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
			{navSections.map((section, idx) => (
				<div key={section.label} className="mb-2">
					<div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold px-2 mb-1 mt-4 first:mt-0">
						{section.label}
					</div>
					<div className="flex flex-col gap-1">
						{section.items.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								tabIndex={0}
								aria-label={item.label}
								className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500 ${
									pathname === item.href
										? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
										: "text-zinc-200 hover:bg-zinc-800/60"
								}`}
							>
								{item.icon}
								<span>{item.label}</span>
							</Link>
						))}
					</div>
					{idx < navSections.length - 1 && (
						<div className="my-3 border-t border-zinc-800/60" />
					)}
				</div>
			))}
		</nav>
	);
}

export function AccountMenu() {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button className="rounded-full w-10 h-10 bg-purple-700 text-white flex items-center justify-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
					<User2 className="w-6 h-6" />
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content className="z-50 min-w-[180px] bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-2 mt-2">
					<DropdownMenu.Item asChild>
						<Link
							href="/profile"
							className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-800 text-zinc-200"
						>
							<User2 className="w-4 h-4" /> Profile
						</Link>
					</DropdownMenu.Item>
					<DropdownMenu.Item asChild>
						<Link
							href="/plan"
							className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-800 text-zinc-200"
						>
							<Settings className="w-4 h-4" /> Plan
						</Link>
					</DropdownMenu.Item>
					<DropdownMenu.Separator className="my-1 border-t border-zinc-800" />
					<DropdownMenu.Item asChild>
						<button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-800 text-red-400 w-full">
							<LogOut className="w-4 h-4" /> Sign Out
						</button>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
