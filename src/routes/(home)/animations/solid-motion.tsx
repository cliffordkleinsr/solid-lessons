import { Motion, Presence } from "solid-motionone";
import { Component, createSignal, JSX, Show } from "solid-js";



const container:JSX.CSSProperties = {
  display: "flex",
  width: '100px',
  height: '160px',
  "flex-direction": "column",
  position: "relative"
}
const button: JSX.CSSProperties = {
 'background-color': "#0cdcf7",
 'border-radius': "10px",
  padding: "10px 20px",
  color: "#0f1115",
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0
}
const box2 = {
  width: '100px',
  height: '100px',
  'background-color': "#0cdcf7",
  'border-radius': "10px",
}
const ExitAnimation: Component<{}> = (props) => {
  const [isVisible, setIsVisible] = createSignal(true)

  return (
    <>
    <div style={container}>
      <Presence>
        <Show when={isVisible()}>
        <Motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={box2}
          />
        </Show>
      </Presence>
      <Motion.button
          style={button}
          onClick={() => setIsVisible(!isVisible())}
          press={{ y: 1 }}
      >
          {isVisible() ? "Hide" : "Show"}
      </Motion.button>
    </div>
    </>
  );
};
const box = {
  width: "100px",
  height: "100px",
  "background-color": "#ff0088",
  "border-radius": "0.25rem",
};

const ball = {
  width: "100px",
  height: "100px",
  "background-color": "#dd00ee",
  "border-radius": "50%",
};

export default function SolidMotion() {
  return (
    <>
      <h1 class="text-2xl text-center py-5 rounded-sm">Solid Motion</h1>
      <p class="text-center italic">
        Known limitations: Cant do Layout animations
      </p>
      <div class=" place-items-center py-10 space-y-5">
        <h1 class="text-xl">Base Animation</h1>
        <Motion.div
          style={box}
          animate={{ rotate: 360 }}
          transition={{ duration: 1 }}
        ></Motion.div>
        <h1 class="text-xl">Enter animation</h1>
        <Motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { duration: 0.4 },
          }}
          style={ball}
        ></Motion.div>
        <h1 class="text-xl">Gestures</h1>
        <Motion.div
          hover={{ scale: 1.2 }}
          press={{ scale: 0.8 }}
          style={box}
        ></Motion.div>
        <h1 class="text-xl">Exit animations</h1>
        <ExitAnimation />
        <h1 class="text-xl py-10">KeyFrames</h1>
        <Motion.div
            animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"],
            }}
            transition={{
                duration: 2,
                easing: "ease-in-out",
                offset:[0, 0.2, 0.5, 0.8, 1],
                repeat: 2,
                delay:1
            }}
            style={box}
        />
      </div>
    </>
  );
}
