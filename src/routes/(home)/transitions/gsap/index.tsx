import { createEffect, createSignal, For } from "solid-js";
import styles from "./Flip.module.css";
import { createTween } from "@solid-primitives/tween";
import { A } from "@solidjs/router";
import { planets } from "~/components/assets";
import { Component } from "solid-js";

function formatNumber(number: number) {
  return number.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function useAnimatedNumber(initial = 0, duration = 500) {
  const [value, setValue] = createSignal(initial);
  const tweened = createTween(value, { duration });
  return [tweened, setValue] as const;
}

export default function ParentComponent() {
  const [moons, setMoon] = useAnimatedNumber();
  const [asteroids, setAstro] = useAnimatedNumber();
  const [comets, setComet] = useAnimatedNumber();

  createEffect(() => {
    setMoon(200);
    setAstro(1_303_348);
    setComet(3_885);
  });
  return (
    <div class={styles.container}>
      <h1 class={styles.title}>Planets in your solar system</h1>
      <div class={styles.details}>
        <div class={styles.item}>
          <div>Moons</div>
          <div>{formatNumber(moons())}+</div>
        </div>

        <div class={styles.item}>
          <div>Asteroids</div>
          <div>{formatNumber(asteroids())}</div>
        </div>

        <div class={styles.item}>
          <div>Comets</div>
          <div>{formatNumber(comets())}</div>
        </div>
      </div>
      <div class={styles.planets}>
        <For each={planets}>
          {({ name, image }) => (
            <A href={name.toLowerCase()} class={styles.planet}>
              <img
                id="cover"
                src={image}
                alt={name}
                data-flip-id={`cover-${name}`}
              />
              <h2
                id="title"
                style={{ "--title": `title-${name}` }}
                data-flip-id={`title-${name}`}
              >
                {name}
              </h2>
            </A>
          )}
        </For>
      </div>
    </div>
  );
}
