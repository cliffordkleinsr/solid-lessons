import { gsap } from "gsap";
import { createSignal, JSX, onCleanup, onMount, Show } from "solid-js";
import {
  gestureAnimations,
  tlKeyFrames,
  presenceIn,
  presenceOut,
  arKeyframes,
  bouncyBtn,
} from "~/components/anims/gsap/base_animations";
import Layout from "~/components/anims/gsap/Layout";
import Numbers from "~/components/anims/gsap/numbers";
import Progress from "~/components/anims/gsap/Progress";
import ScrollTriggered from "~/components/anims/gsap/ScrollTrigger";
import SharedLayout from "~/components/anims/gsap/SharedLayout";



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

const box2 = {
  width: "100px",
  height: "100px",
  "background-color": "#0cdcf7",
  "border-radius": "10px",
};
const button: JSX.CSSProperties = {
  "background-color": "#0cdcf7",
  "border-radius": "10px",
  padding: "10px 20px",
  color: "#0f1115",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
};

const container: JSX.CSSProperties = {
  display: "flex",
  width: "100px",
  height: "160px",
  "flex-direction": "column",
  position: "relative",
};

export default function Gsap() {
  let ctx: gsap.Context;
  let gestures_ref!: HTMLDivElement;
  let btn_ref!: HTMLButtonElement;
  const [isVisible, setIsVisible] = createSignal(true);
  function presenceWrapper() {
    if (isVisible()) {
      presenceOut(setIsVisible);
    } else if (!isVisible()) {
      setIsVisible(true);
      presenceIn();
    }
  }
  let tl: GSAPTimeline;
  onMount(() => {
    ctx = gsap.context(() => {
      gsap.to("#rotate", { rotate: 360, duration: 1 });
      // enteranimations
      gsap.fromTo(
        "#enter",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
      );
      // timeline based keyframes
      tl = tlKeyFrames();
      arKeyframes();
      // gestures
      gestureAnimations(gestures_ref);
      // bouncy button
      bouncyBtn(btn_ref);
      tl.pause();
    });
    onCleanup(() => ctx.revert());
  });

  return (
    <div class="place-items-center py-10 space-y-5">
      <h1 class="text-2xl text-center py-5 rounded-sm">GSAP</h1>
      <p class="text-center italic">
        Can do all animations
      </p>
      <h1 class="text-xl">Base Animation</h1>
      <div id="rotate" style={box}></div>
      <h1 class="text-xl">Enter animation</h1>
      <div id="enter" style={ball}></div>
      <h1 class="text-xl">Gestures</h1>
      <div ref={gestures_ref} style={box}></div>
      <h1 class="text-xl">Exit animations</h1>
      <div style={container}>
        <Show when={isVisible()}>
          <div id="presence" style={box2}></div>
        </Show>
        <button ref={btn_ref} id="btn" style={button} onClick={presenceWrapper}>
          {isVisible() ? "Hide" : "Show"}
        </button>
      </div>
      <div class="space-y-6 place-items-center">
        <h1 class="text-xl py-5">Timeline Based KeyFrames</h1>
        <div id="keyframe" style={box}></div>
        <button class="btn" onClick={() => tl.restart()}>
          Start Keyframes
        </button>
      </div>
      <div class="space-y-6 place-items-center">
        <h1 class="text-xl py-5">Array Based KeyFrames</h1>
        <div id="arkeyframe" style={box}></div>
      </div>
      <h1 class="text-xl py-10">Layout Animations</h1>
      <Layout />
      <h1 class="text-xl py-10">Shared Layout Animations</h1>
      <SharedLayout />
      <h1 class="text-xl py-10">Scroll Progress</h1>
      <Progress />
      <h1 class="text-xl py-10">Scroll Triggered</h1>
      <ScrollTriggered />
      <h1 class="text-xl py-10">Price Switcher</h1>
      <Numbers/>
    </div>
  );
}
