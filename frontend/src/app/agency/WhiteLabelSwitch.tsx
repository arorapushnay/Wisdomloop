import * as Switch from "@radix-ui/react-switch";

export function WhiteLabelSwitch({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Switch.Root
        checked={enabled}
        onCheckedChange={onChange}
        className="w-10 h-6 bg-muted rounded-full relative data-[state=checked]:bg-green-700 transition-colors outline-none cursor-pointer"
        id="white-label-switch"
      >
        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-0 data-[state=checked]:translate-x-4" />
      </Switch.Root>
      <label htmlFor="white-label-switch" className="text-sm text-muted-foreground select-none">White-label Export</label>
      {enabled && <span className="bg-green-700 text-white px-2 py-0.5 rounded-full text-xs font-semibold ml-2">Enabled</span>}
    </div>
  );
}
