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
   
    if (!isOn()) {
      setIsOn(!isOn())
      gsap.to("#knob", {
        x: 50,
        ease: 'elastic.out(1, 5)'
      });
    } else if (isOn()) {
      setIsOn(!isOn())
      gsap.fromTo(
        "#knob",
        {
          x: 50,
        },
        {
          x: 0,
          ease: 'elastic.out(1, 5)'
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
