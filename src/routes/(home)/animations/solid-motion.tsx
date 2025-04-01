import { Motion } from "solid-motionone";
import { Component, createSignal } from "solid-js";

const container = {
  width: "100px",
  height: "50px",
  "background-color": "#9a17fc",
  "border-radius": "50px",
  cursor: "pointer",
  padding: "10px",
};

const handle = {
  width: "3rem",
  height: "3rem",
  "background-color": "white",
  "border-radius": "50%",
};
const LayoutAnimation: Component<{}> = (props) => {
  const [isOn, setIsOn] = createSignal(false);
  const toggleSwitch = () => setIsOn(!isOn());
  return (
    <button
      class="toggle-container flex"
      classList={{ "justify-start": isOn(), "justify-end": !isOn() }}
      style={container}
      onClick={toggleSwitch}
    >
      <Motion.div
        class="toggle-handle"
        style={handle}
        transition={{
          duration: 0.2,
        }}
      />
    </button>
  );
};
const box = {
  width: "100px",
  height: "100px",
  "background-color": "#ff0088",
  " border-radius": "0.25rem",
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
        <h1 class="text-xl">Layout Animations</h1>
        <LayoutAnimation />
      </div>
    </>
  );
}
