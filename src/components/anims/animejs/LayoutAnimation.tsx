import { createSpring, waapi } from "animejs";
import { Component, createSignal, JSX } from "solid-js";

const LayoutAnimation: Component<{}> = (props) => {
  const [isOn, setIsOn] = createSignal(false);
  const toggleSwitch = () => {
    // create view transition
    const transition = document.startViewTransition(() => setIsOn(!isOn())); //updateTheDOMSomehow
    // Wait for the pseudo-elements to be created:
    transition.ready.then(() => {
      waapi.animate("#knob", {
        x: {
          from: 0,
          to: 1,
        },
        ease: createSpring({ stiffness: 150, damping: 3 }),
        duration: 400,
      });
    });
  };
  return (
    <button
      style={{
        ...container,
        "justify-content": `flex-${isOn() ? "end" : "start"}`,
      }}
      onClick={toggleSwitch}
    >
      <div
        id="knob"
        style={{ ...handle, "view-transition-name": "knob" }}
      ></div>
    </button>
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
