import { Component, createSignal, onMount, Show } from "solid-js";

import "./RenderScan.css";
import RenderScanObserver from "./RenderScanObserver";
interface IconProps {
  color?: string;
  size?: number | string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
const Logo: Component<IconProps> = ({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  absoluteStrokeWidth = false,
  class: className = "",
  ...rest
}) => {
  const defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  } as const;
  return (
    <svg
      {...defaultAttributes}
      width={size}
      height={size}
      stroke={color}
      stroke-width={
        absoluteStrokeWidth
          ? (Number(strokeWidth) * 24) / Number(size)
          : strokeWidth
      }
      class={cn("lucide-icon", "lucide", "lucide-eye", className)}
      {...rest}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

const RenderScan: Component<{
  initialEnabled?: boolean;
  offsetLeft?: number;
  hideIcon?: boolean;
  callback?: (mutationRecord: MutationRecord) => void;
  duration?: number;
}> = ({
  initialEnabled = true,
  offsetLeft = 0,
  hideIcon = false,
  callback = () => undefined,
  duration = 1000,
}) => {
  // State management
  let [enabled, setEnabled] = createSignal(initialEnabled);
  // Fixed colors for enabled/disabled states
  const enabledColor = "#2189b5";
  const disabledColor = "#9ca3af";
  // Load saved state from localStorage on mount
  onMount(() => {
    const savedState = localStorage.getItem("svelte-render-scan-enabled");
    if (savedState !== null) {
      setEnabled(savedState === "true");
    }
  });
  // Toggle handler that also saves to localStorage
  function toggleEnabled() {
    setEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("svelte-render-scan-enabled", newValue.toString());
      return newValue;
    });
  }
  return (
    <div class="render-scan">
      <Show when={enabled()}>
        <RenderScanObserver callback={callback} duration={duration} />
      </Show>
      <Show when={!hideIcon}>
        <button
          style={`background-color: ${enabled() ? enabledColor : disabledColor}; right: calc(1rem + ${offsetLeft}px);`}
          onClick={toggleEnabled}
          title={
            enabled() ? "Disable render scanning" : "Enable render scanning"
          }
        >
          <div classList={{ enabled: enabled() }}>
            <Logo color="white" size={24} />
          </div>
        </button>
      </Show>
    </div>
  );
};

export default RenderScan;
