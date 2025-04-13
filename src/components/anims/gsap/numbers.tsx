import createTween from "@solid-primitives/tween";
import {
  Component,
  createEffect,
  createSignal,
  JSX,
  JSXElement,
} from "solid-js";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
const [price, setPrice] = createSignal(19);

let pilRef!: HTMLDivElement;
const Tabs: Component<{}> = (props) => {
  const [type, setType] = createSignal("Monthly");

  createEffect(() => {
    gsap.registerPlugin(Flip);
    const state = Flip.getState(pilRef);
    const targets: HTMLButtonElement[] = gsap.utils.toArray("#parent");
    targets.map((t) => {
      // console.log(type())
      if (t.innerHTML === type()) {
        t.appendChild(pilRef);
      }
    });
    // animate from the previous state to the current one:
    Flip.from(state, {
      duration: 0.4,
      ease: "power2.inOut",
    });
  });

  return (
    <div style={tabcontainer}>
      <div ref={pilRef} style={tabpil}></div>
      <button
        id="parent"
        onClick={() => {
          setType("Monthly");
          setPrice(19);
          gsap.to(".display", {
            x: -1,
          });
        }}
      >
        Monthly
      </button>

      <button
        id="parent"
        class="noa"
        onClick={() => {
          setType("Yearly");
          setPrice(199);
          gsap.to(".display", {
            x: 10,
          });
        }}
      >
        Yearly
      </button>
    </div>
  );
};
const Numbers: Component<{}> = (props) => {
  const easeing = function easeOutSine(x: number): number {
    return Math.sin((x * Math.PI) / 2);
  };
  const tweenedValue = createTween(price, { duration: 1000, ease: easeing });
  return (
    <>
      <div>
        <p class="display" style={tweenvalue}>
          ${tweenedValue().toFixed(0)}
        </p>
        <Tabs />
      </div>
    </>
  );
};

export default Numbers;

const tweenvalue: JSX.CSSProperties = {
  "font-size": "45px",
  "text-align": "center",
  padding: "10px",
};
const tabcontainer: JSX.CSSProperties = {
  display: "flex",
  position: "relative",
  "justify-content": "center",
  padding: "10px",
  "background-color": "color-mix(in oklab, currentcolor 5%, transparent)",
  "border-radius": "calc(infinity * 1px)",
  width: "150px",
  "column-gap": "12px",
  "font-size": "14px",
};
const tabpil: JSX.CSSProperties = {
  width: "50px",
  height: "2px",
  "background-color": "white",
  "border-radius": "calc(infinity * 1px)",
  padding: "8px",
  color: "black",
};

// const button: JSX.CSSProperties = {
//   color: "black",
//   border: "none",
//   position: "relative",
//   background: "transparent",
// };

// function unwrapPrevious() {
//     const pil = document.getElementById('pil');
//     if (!pil) return;

//     const child = pil.firstElementChild;
//     if (child) {
//       pil.parentElement?.insertBefore(child, pil); // move it out of #pil
//     }
//   }

//   function wrapButton(buttonId: string) {
//     const button = document.getElementById(buttonId);
//     const pil = document.getElementById('pil');

//     if (!button || !pil) return;

//     unwrapPrevious(); // ensure nothing is already wrapped
//     pil.parentElement?.insertBefore(pil, button)
//     pil.appendChild(button); // move the button into the wrapper
//   }
