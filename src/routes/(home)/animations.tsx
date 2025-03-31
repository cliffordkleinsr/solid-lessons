import { createEffect, createSignal } from "solid-js";
import LayoutAnimation from "~/components/anims/Layout";
import SharedLayout from "~/components/anims/SharedLayout";

export default function Animations(props: any) {
  const [show, setShow] = createSignal(true);
  createEffect(() => {
    if (show()) {
      setTimeout(() => setShow(!show()), 2200);
    }
  });
  return (
    <>
      <div class=" place-items-center py-10 space-y-5">
        <p>{String(show())}</p>
        <h1 class="text-xl">Base Animation</h1>
        <div
          class="size-24 bg-purple-600 rounded-sm"
          classList={{ "motion-rotate-in-180  motion-duration-[2s]": show() }}
        ></div>
        <h1 class="text-xl">Enter animation</h1>
        <div
          class="size-24 bg-purple-600 rounded-full"
          classList={{ "motion-scale-in-0": show() }}
        ></div>
        <button class="btn" onClick={() => setShow((prev) => !prev)}>
          Replay
        </button>
        <h1 class="text-xl">Gestures</h1>
        <div class="size-24 bg-purple-600 rounded-sm hover:motion-scale-out-110 motion-scale-in-110 motion-ease-spring-bouncy motion-duration-200"></div>
        <h1 class="text-xl">Layout Animations</h1>
        <LayoutAnimation />
        <h1 class="text-xl">Shared Layout Animations</h1>
        <SharedLayout />
      </div>
    </>
  );
}
