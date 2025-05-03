import { shuffle } from "gsap";
import { Component, createSignal, JSX, Show } from "solid-js";
import { MotionLayoutProvider, flippa } from "./flip/layoutshift";
import { animate, eases } from "animejs";

const Advanced: Component<{}> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <MotionLayoutProvider>
      <div class="h-[300px] place-content-center">
        <div class="relative flex items-center justify-center">
          <Show
            when={isOpen()}
            fallback={
              <flippa.div
                style={parent}
                onClick={() => setIsOpen(!isOpen())}
                preserveChild
              >
                <div style={child}></div>
              </flippa.div>
            }
          >
            <flippa.div
              id="this"
              style={{
                ...parent,
                width: "400px",
                height: "200px",
                "border-radius": "20px",
              }}
              onClick={() => setIsOpen(!isOpen())}
              preserveChild
            >
              <div style={child}></div>
            </flippa.div>
          </Show>
        </div>
      </div>
    </MotionLayoutProvider>
  );
};

export default Advanced;

const parent: JSX.CSSProperties = {
  background: "white",
  width: "100px",
  height: "100px",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  "border-radius": "50%",
};
const child: JSX.CSSProperties = {
  width: "40px",
  height: "40px",
  background: "#f107a3",
  "border-radius": "50%",
};
