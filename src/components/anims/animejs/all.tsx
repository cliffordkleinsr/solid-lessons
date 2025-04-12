import {
  animate,
  createAnimatable,
  createSpring,
  JSAnimation,
  stagger,
  utils,
  waapi,
} from "animejs";
import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  onMount,
  Show,
} from "solid-js";

const TextAnimation: Component<{}> = (props) => {
  const chars = "hello world".toUpperCase().split("");
  let animation: JSAnimation;
  onMount(() => {
    animation = animate("#jspan", {
      // Property keyframes
      y: [
        { to: -40, ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      // Property specific parameters
      rotate: {
        from: "-1turn",
        delay: 0,
      },
      delay: (_, i) => i * 50, // Function based value
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: true,
    });
  });

  return (
    <>
      <h2 class="large flex gap-1 centered square-grid text-xl">
        <For each={chars}>
          {(char, i) => (
            <>
              <Show when={char === "O" && chars[i() + 1] === "W"}>
                <span>&nbsp;</span>
              </Show>
              <span id="jspan">{char}</span>
            </>
          )}
        </For>
      </h2>
    </>
  );
};

const BaseAnimation: Component<{}> = (props) => {
  onMount(() => {
    animate(".base", {
      rotate: "360deg",
      duration: 1000,
    });
  });
  return <div class="base" style={box}></div>;
};

const EnterAnimation: Component<{}> = (props) => {
  onMount(() => {
    animate("#enter", {
      scale: {
        from: 0,
        to: 1,
      },
      opacity: {
        from: 0,
        to: 1,
        duration: 400,
        ease: "out(p = 2)",
      },
      ease: createSpring({ stiffness: 90 }),
      duration: 400,
    });
  });
  return <div id="enter" style={ball}></div>;
};

const GestureAnimation: Component<{}> = (props) => {
  let gesEl!: HTMLDivElement;
  onMount(() => {
    const animatableSquare = createAnimatable(gesEl, {
      scale: 200, // Define the scale duration to be 500ms,
      ease: "out(2)",
    });
    gesEl.addEventListener("mouseenter", (e) => {
      animatableSquare.scale(1.2);
    });
    gesEl.addEventListener("mouseleave", () => {
      animatableSquare.scale(1);
    });
    gesEl.addEventListener("mousedown", () => {
      animatableSquare.scale(0.8);
    }),
      gesEl.addEventListener("mouseup", () => {
        animatableSquare.scale(1.2);
      });
  });
  return <div ref={gesEl} style={box}></div>;
};

const PresenceAnimation: Component<{}> = (props) => {
  const [isVisible, setIsVisible] = createSignal(false);
  let btn!: HTMLButtonElement;
  function presenceWrapper() {
    if (!isVisible()) {
      setIsVisible(true);
      animate("#presence", {
        scale: [{ from: 0 }, { to: 1 }],
        opacity: [{ from: 0 }, { to: 1 }],
        ease: createSpring({ stiffness: 90, damping: 9 }),
      });
    } else if (isVisible()) {
      animate("#presence", {
        scale: 0,
        opacity: 0,
        duration: 200,
        onComplete: () => {
          setIsVisible(false);
        },
      });
    }
  }

  onMount(() => {
    const animatableSquare = createAnimatable(btn, {
      y: 200, // Define the scale duration to be 500ms,
      ease: createSpring({ stiffness: 80 }),
    });
    btn.addEventListener("mousedown", () => {
      animatableSquare.y(3);
    });
    btn.addEventListener("mouseup", () => {
      animatableSquare.y(0);
    });
  });
  return (
    <div style={presenceContainer}>
      {/* <p>{String(isVisible())}</p> */}
      <Show when={isVisible()}>
        <div id="presence" style={box2}></div>
      </Show>
      <button ref={btn} style={button} onClick={presenceWrapper}>
        {isVisible() ? "Hide" : "Show"}
      </button>
    </div>
  );
};

const WaapiText: Component<{}> = (props) => {
  const chars = "hello waapi".toUpperCase().split("");

  onMount(() => {
    const spans = utils.$("#waapi_span");
    waapi.animate(spans, {
      translate: "0 -2rem",
      delay: stagger(100),
      duration: 600,
      loop: true,
      alternate: true,
      ease: "inOut(2)",
    });
  });
  return (
    <>
      <h2 class="large flex gap-1 centered square-grid text-xl">
        <For each={chars}>
          {(char, i) => (
            <>
              <Show when={char === "O" && chars[i() + 1] === "W"}>
                <span>&nbsp;</span>
              </Show>
              <span id="waapi_span">{char}</span>
            </>
          )}
        </For>
      </h2>
    </>
  );
};

export {
  TextAnimation,
  EnterAnimation,
  BaseAnimation,
  PresenceAnimation,
  GestureAnimation,
  WaapiText,
};

const presenceContainer: JSX.CSSProperties = {
  display: "flex",
  width: "100px",
  height: "160px",
  "flex-direction": "column",
  position: "relative",
};
const ball: JSX.CSSProperties = {
  width: "100px",
  height: "100px",
  "background-color": "#dd00ee",
  "border-radius": "50%",
};

const box: JSX.CSSProperties = {
  width: "100px",
  height: "100px",
  "background-color": "#ff0088",
  "border-radius": "0.25rem",
};

const box2: JSX.CSSProperties = {
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
