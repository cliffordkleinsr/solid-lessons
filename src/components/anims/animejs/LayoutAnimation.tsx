import { createSpring, waapi } from "animejs";
import { Component, createSignal, JSX, Show } from "solid-js";
import { flippa, MotionLayoutProvider } from "./flip/layoutshift";

const LayoutAnimation: Component<{}> = (props) => {
  const [isOn, setIsOn] = createSignal(false);
  const toggleSwitch = () => {
    setIsOn(!isOn());
  };
  return (
    <MotionLayoutProvider>
      <button style={container} onClick={toggleSwitch}>
        {/* must be a flow component */}
        <Show when={isOn()} fallback={
          <flippa.div id="knob" style={handle}></flippa.div>
        }>
          <flippa.div
            id="knob"
            style={{ ...handle, "margin-left": "auto" }}
          ></flippa.div>
        </Show>
      </button>
    </MotionLayoutProvider>
  );
};

export default LayoutAnimation;

const container: JSX.CSSProperties = {
  all: "unset",
  width: "100px",
  height: "50px",
  "background-color": "#4b187e",
  "border-radius": "50px",
  cursor: "pointer",
  display: "flex",
  padding: "10px",
};
const handle: JSX.CSSProperties = {
  width: "50px",
  height: "50px",
  "background-color": "#9911ff",
  "border-radius": "50%",
};
