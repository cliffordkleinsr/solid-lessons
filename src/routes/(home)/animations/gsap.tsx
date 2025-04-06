import { gsap } from "gsap";
import { JSX, onCleanup, onMount } from "solid-js";
import { createEffect } from "solid-js";

const box: JSX.CSSProperties = {
  width: "100px",
  height: "100px",
  "background-color": "#ff0088",
  "border-radius": "0.25rem",
};
const ball: JSX.CSSProperties = {
  width: "100px",
  height: "100px",
  "background-color": "#dd00ee",
  "border-radius": "50%",
};
const scaleTo = (el: HTMLElement, value: number) =>
  gsap.to(el, { scale: value, duration: 0.4, overwrite: "auto" });
export default function Gsap() {
  let ctx: gsap.Context;
  let gestures_ref!: HTMLDivElement;
  onMount(() => {
    const quickScaleX = gsap.quickTo(gestures_ref, "scaleX", {
      duration: 0.4,
      ease: "power2.out",
    });
    const quickScaleY = gsap.quickTo(gestures_ref, "scaleY", {
      duration: 0.4,
      ease: "power2.out",
    });
    ctx = gsap.context(() => {
      gsap.to("#rotate", { rotate: 360, duration: 1 });
      gsap.fromTo(
        "#enter",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
      );

      gestures_ref.addEventListener("mouseenter", () => {
        quickScaleX(1.2);
        quickScaleY(1.2);
      });
      gestures_ref.addEventListener("mouseleave", () => {
        quickScaleX(1);
        quickScaleY(1);
      });
      gestures_ref.addEventListener("mousedown", () => {
        quickScaleX(0.8);
        quickScaleY(0.8);
      });
      gestures_ref.addEventListener("mouseup", () => {
        quickScaleX(1.2);
        quickScaleY(1.2); // return to hover scale
      });
    });
    onCleanup(() => ctx.revert());
  });

  return (
    <div class="place-items-center py-10 space-y-5">
      <div id="rotate" style={box}></div>
      <div id="enter" style={ball}></div>
      <div ref={gestures_ref} style={box}></div>
    </div>
  );
}
