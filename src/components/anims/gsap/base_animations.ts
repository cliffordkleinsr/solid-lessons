import gsap from "gsap";
import { Setter } from "solid-js";

// timeline based keyframes
function tlKeyFrames() {
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

// Array-based keyframes
function arKeyframes() {
  gsap.to("#arkeyframe", {
    keyframes: {
      scale: [1, 2, 2, 1, 1],
      borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      rotate: [0, 0, 180, 180, 0],
    },
    repeat: 1,
    yoyo: true,
    delay: 1,
    duration: 2,
  });
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
  // chain events to achieve any behaviour you want
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

function bouncyBtn(ref: HTMLButtonElement) {
  let tapY = gsap.quickTo(ref, "y", {
    duration: 0.1,
    ease: "bounce",
  });
  // chain events to achieve any behaviour you want
  ref.addEventListener("mousedown", () => {
    tapY(1);
  });
  ref.addEventListener("mouseup", () => {
    tapY(0);
  });
}
function presenceOut(setter: Setter<boolean>) {
  gsap.to("#presence", {
    opacity: 0,
    scale: 0,
    ease: "elastic.out(1, 1)",
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
      ease: "elastic.in(1, 1)",
    },
  );
}
export {
  arKeyframes,
  tlKeyFrames,
  gestureAnimations,
  bouncyBtn,
  presenceOut,
  presenceIn,
};
