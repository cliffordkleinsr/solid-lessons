import {
  TextAnimation,
  EnterAnimation,
  BaseAnimation,
  GestureAnimation,
  WaapiText,
  PresenceAnimation,
} from "~/components/anims/animejs/all";
import LayoutAnimation from "~/components/anims/animejs/LayoutAnimation";
import Progress from "~/components/anims/animejs/Progress";
import ScrollBasedTrigger from "~/components/anims/animejs/ScrollTrigger";
import SharedLayoutAnimations from "~/components/anims/animejs/SharedLayoutAnimations";

export default function AnimeJs() {
  return (
    <>
      <div class="place-items-center py-10 space-y-5">
        <h1 class="text-2xl text-center py-2 rounded-sm">Anime JS</h1>
        <p class="text-center italic">
          Known Limitations: Cant do layout animations
        </p>
        <h1 class="py-3"> Text Animation with keyframes</h1>
        <TextAnimation />
        <h1> Base Animation</h1>
        <BaseAnimation />
        <h1> Enter animation</h1>
        <EnterAnimation />
        <h2>Gesture animations</h2>
        <GestureAnimation />
        <h2>Exit animations</h2>
        <PresenceAnimation />
        <h2 class="text-xl py-10">Layout animations (WAAPI)</h2>
        <LayoutAnimation />
        <h2 class="text-xl py-10">Shared Layout Animations (WAAPI)</h2>
        <SharedLayoutAnimations />
        <h2>Scroll animations</h2>
        <ScrollBasedTrigger />
        <h2>Progress Scroll animations</h2>
        <Progress />
        <h2 class="py-5">WAAPI</h2>
        <WaapiText />
      </div>
    </>
  );
}
