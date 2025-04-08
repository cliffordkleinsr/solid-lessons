import { Component, createSignal, JSX } from "solid-js";
import gsap from "gsap";
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
const Layout: Component<{}> = (props) => {
  const [isOn, setIsOn] = createSignal(false);
  const toggleSwitch = () => {
    // setIsOn(!isOn)
    setIsOn(!isOn);
    if (!isOn()) {
      gsap.to("#knob", {
        x: 50,
      });
    } else if (isOn()) {
      gsap.to(
        "#knob",
        {
          x: 0,
        }
      );
    }
  };
  return (
    <button style={container} onClick={toggleSwitch}>
      <div id="knob" style={handle}></div>
    </button>
  );
};

export default Layout;
