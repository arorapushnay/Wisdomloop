"use client";
import { useState } from "react";
import { LucideIcon } from "./LucideIcon";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function QuickActionsButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-primary to-accent text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-primary/40"
            aria-label="Quick Actions"
            onClick={() => setOpen(true)}
          >
            <LucideIcon name="Sparkles" size={32} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="left" className="z-50 bg-background text-foreground px-3 py-2 rounded-lg shadow-lg text-xs font-medium animate-fade-in">
            Quick Actions
            <Tooltip.Arrow className="fill-background" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="bg-zinc-900 rounded-2xl shadow-2xl p-8 m-8 w-full max-w-xs flex flex-col gap-6 animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-2">
              <LucideIcon name="Zap" size={20} className="text-accent" />
              <span className="font-bold text-lg">Quick Actions</span>
            </div>
            <button
              tabIndex={0}
              aria-label="Upload Content"
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-accent transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              onClick={() => { setOpen(false); document.getElementById('file-upload')?.click(); }}
            >
              <LucideIcon name="UploadCloud" size={18} />Upload Content
            </button>
            <button
              tabIndex={0}
              aria-label="Start Model Training"
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-accent text-white font-semibold shadow hover:bg-primary transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              onClick={() => { setOpen(false); window.location.href = '/train'; }}
            >
              <LucideIcon name="Brain" size={18} />Start Model Training
            </button>
            <button
              tabIndex={0}
              aria-label="Schedule Post"
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 text-white font-semibold shadow hover:bg-zinc-700 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-800"
              onClick={() => { setOpen(false); window.location.href = '/schedule'; }}
            >
              <LucideIcon name="Clock" size={18} />Schedule Post
            </button>
            <button className="mt-2 text-xs text-muted-foreground underline" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
