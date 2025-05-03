import { animate, onScroll, utils } from "animejs";
import {
  createEffect,
  createSignal,
  For,
  onMount,
  type Component,
} from "solid-js";

const Example: Component<{}> = (props) => {
  return (
    <div class="bg-neutral-800">
      <div class="flex h-48 items-center justify-center">
        <span class="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
      <ScrollHijack />
      <div class="flex h-48 items-center justify-center">
        <span class="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
    </div>
  );
};

export default Example;

const ScrollHijack: Component<{}> = (props) => {
  const [progress, setProgress] = createSignal(0.0);
  const [velocity, setVelocity] = createSignal(0.0);
  let targetEl!: HTMLElement;

  createEffect(() => {
    const roundEr = utils.round(2);
    const clpRound = utils.clamp(0, 1).round(2);
    onScroll({
      target: targetEl,
      enter: "top top",
      leave: "bottom bottom",
      sync: 0.45,
      onUpdate: (self) => {
        setProgress(roundEr(self.progress));
        setVelocity((prev) => (prev = clpRound(self.velocity)));
      },
      onLeaveForward: (self) => {
        if (!self.isInView) {
          setVelocity((prev) => (prev = utils.lerp(0, prev, 0)));
        }
      },
      onLeaveBackward: (self) => {
        if (!self.isInView) {
          setVelocity((prev) => (prev = utils.lerp(0, prev, 0)));
        }
      },
    });
    animate("#cards", {
      x: `-${progress() * 100}%`,
      skewX: `-${utils.lerp(0, velocity(), 1) * 15}`,
    });
  });
  return (
    <section ref={targetEl} class="h-[300vh] bg-neutral-900" id="container">
      <div
        class="sticky top-0 flex h-screen items-center overflow-hidden"
        id="tgt"
      >
        <div class="flex gap-4" id="cards">
          <For each={cards}>{(card) => <Card card={card} />}</For>
        </div>
      </div>
    </section>
  );
};

const Card: Component<{ card: (typeof cards)[0] }> = (props) => {
  return (
    <div class="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200">
      <div
        style={{
          "background-image": `url(${props.card.url})`,
          "background-size": "cover",
          "background-position": "center",
        }}
        class="absolute inset-0 z-0 "
      ></div>
      <div class="absolute inset-0 z-10 grid place-content-center">
        <p class="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {props.card.title}
        </p>
      </div>
    </div>
  );
};

const cards = [
  {
    url: "/imgs/abstract/1.jpg",
    title: "Title 1",
  },
  {
    url: "/imgs/abstract/2.jpg",
    title: "Title 2",
  },
  {
    url: "/imgs/abstract/3.jpg",
    title: "Title 3",
  },
  {
    url: "/imgs/abstract/4.jpg",
    title: "Title 4",
  },
  {
    url: "/imgs/abstract/5.jpg",
    title: "Title 5",
  },
  {
    url: "/imgs/abstract/6.jpg",
    title: "Title 6",
  },
  {
    url: "/imgs/abstract/7.jpg",
    title: "Title 7",
  },
];
