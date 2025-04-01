import { createSignal } from "solid-js";
import "./Layout.css";

export default function LayoutAnimation() {
  const [isOn, setIsOn] = createSignal(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <>
      {/* <p>{String(isOn())}</p> */}

      <button class="switch" onClick={() => setIsOn(!isOn())}>
        <div
          class="handle motion-duration-300"
          classList={{
            "motion-translate-x-out-100 ": isOn(),
            "motion-translate-x-in-100": !isOn(),
          }}
        ></div>
      </button>
    </>
  );
}
