import { Component, createEffect, createSignal, JSX } from "solid-js";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

const Layout: Component<{}> = (props) => {
  const [isOn, setIsOn] = createSignal(false);
  const toggleSwitch = () => {
    // Get the current state
    const state = Flip.getState("#knob");
    // Make your state changes
    setIsOn(!isOn());

    // animate from the previous state to the current one:
    Flip.from(state, {
      duration: 0.4,
      ease: "elastic.out(1, 5)",
    });
  };

  createEffect(() => {
    gsap.registerPlugin(Flip);
  });
  return (
    <button
      style={{
        ...container,
        "justify-content": `flex-${isOn() ? "end" : "start"}`,
      }}
      onClick={toggleSwitch}
    >
      <div id="knob" style={handle}></div>
    </button>
  );
};

export default Layout;

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
