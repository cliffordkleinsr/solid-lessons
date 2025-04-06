import {
  BeforeLeaveEventArgs,
  RouteSectionProps,
  useBeforeLeave,
  useLocation,
} from "@solidjs/router";
import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { createEffect, onMount } from "solid-js";

export default function FlipLayout(props: RouteSectionProps) {
  gsap.registerPlugin(Flip);
  const location = useLocation();
  let state: Flip.FlipState;
  useBeforeLeave(() => {
    state = Flip.getState("#cover, #title");
  });

  createEffect(() => {
    location.pathname;
    if (state) {
      Flip.from(state, {
        targets: "#cover, #title",
        duration: 0.7,
        scale: true,
        ease: "power1.easeOut",
      });
    }
  });
  return <>{props.children}</>;
}
