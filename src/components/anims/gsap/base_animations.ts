import gsap from "gsap";
import { Setter } from "solid-js";
function keyFrames() {
  const tl = gsap.timeline({ repeat: 1, yoyo: true, delay: 1 });
  tl.to("#keyframe", {
    scale: 1,
  })
    .to("#keyframe", {
      scale: 2,
    })
    .to("#keyframe", {
      rotate: 180,
      borderRadius: "50%",
    })
    .to("#keyframe", {
      scale: 1,
    })
    .to("#keyframe", {
      rotate: 0,
      borderRadius: "0%",
    });
  return tl;
}

function gestureAnimations(ref: HTMLDivElement) {
  const quickScaleX = gsap.quickTo(ref, "scaleX", {
    duration: 0.4,
    ease: "power2.out",
  });
  const quickScaleY = gsap.quickTo(ref, "scaleY", {
    duration: 0.4,
    ease: "power2.out",
  });
  ref.addEventListener("mouseenter", () => {
    quickScaleX(1.2);
    quickScaleY(1.2);
  });
  ref.addEventListener("mouseleave", () => {
    quickScaleX(1);
    quickScaleY(1);
  });
  ref.addEventListener("mousedown", () => {
    quickScaleX(0.8);
    quickScaleY(0.8);
  });
  ref.addEventListener("mouseup", () => {
    quickScaleX(1.2);
    quickScaleY(1.2); // return to hover scale
  });
}

function presenceOut(setter: Setter<boolean>) {
  gsap.to("#presence", {
    opacity: 0,
    scale: 0,
    ease: "back.out",
    onComplete: () => {
      setter(false);
    },
  });
}

function presenceIn() {
  gsap.fromTo(
    "#presence",
    {
      opacity: 0,
      scale: 0,
    },
    {
      opacity: 1,
      scale: 1,
      ease: "back.in",
    },
  );
}
export { keyFrames, gestureAnimations, presenceOut, presenceIn };
