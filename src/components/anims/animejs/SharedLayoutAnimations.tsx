import { utils, waapi } from "animejs";
import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  Show,
} from "solid-js";
import { flippa, MotionLayoutProvider } from "./flip/layoutshift";

//(Experimental) only Composable with FLow changes i.e if this changes show this
const SharedLayoutAnimations: Component<{}> = (props) => {
  const [selectedTab, setSelectedTab] = createSignal(tabs[0]);

  function presenceWrapper(item: { icon: string; label: string }) {
    // Don't animate if selecting the same tab
    if (item === selectedTab()) return;
    // Update the selected tab
    setSelectedTab(item);
    waapi.animate("#icon", {
      y: [10, 0],
      opacity: [0, 1],
      duration: 200,
      playbackEase: "outIn(1)",
      // can also be done this way
      // y: {
      //   from: 10,
      //   to: 0,
      //   ease: "in(1)",
      // },
      // opacity: {
      //   from: 0,
      //   to: 1,
      //   ease: "out(1)",
      // },
      // duration: 200,
    });
  }
  return (
    <div style={container}>
      <nav style={nav}>
        <ul style={tabsContainer}>
          <MotionLayoutProvider>
            <For each={tabs}>
              {(item) => (
                <li id="tab" style={tab} onClick={() => presenceWrapper(item)}>
                  {item.icon + " " + item.label}
                  <Show when={item === selectedTab()}>
                    <flippa.span style={underline} />
                  </Show>
                </li>
              )}
            </For>
          </MotionLayoutProvider>
        </ul>
      </nav>
      <main style={iconContainer}>
        <div id="icon" style={icon}>
          {selectedTab() ? selectedTab().icon : "😋"}
        </div>
      </main>
    </div>
  );
};

export default SharedLayoutAnimations;

const container: JSX.CSSProperties = {
  width: "480px",
  height: "60vh",
  "max-height": "360px",
  "border-radius": "10px",
  background: "white",
  overflow: "hidden",
  "box-shadow":
    "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
  display: "flex",
  "flex-direction": "column",
};

const nav: JSX.CSSProperties = {
  background: "#fdfdfd",
  padding: "5px 5px 0",
  "border-radius": "10px",
  "border-bottom-left-radius": 0,
  "border-bottom-right-radius": 0,
  "border-bottom": "1px solid #eeeeee",
  height: "44px",
};

const tabsStyles: JSX.CSSProperties = {
  "list-style": "none",
  padding: 0,
  margin: 0,
  "font-weight": "500px",
  "font-size": "14px",
};

const tabsContainer: JSX.CSSProperties = {
  ...tabsStyles,
  display: "flex",
  width: "100%",
};

const tab: JSX.CSSProperties = {
  ...tabsStyles,
  "border-radius": "5px",
  "border-bottom-left-radius": 0,
  "border-bottom-right-radius": 0,
  width: "100%",
  padding: "10px 15px",
  position: "relative",
  background: "white",
  cursor: "pointer",
  height: "24px",
  display: "flex",
  "justify-content": "space-between",
  "align-items": "center",
  flex: 1,
  "min-width": 0,
  "user-select": "none",
  color: "#0f1115",
};

const underline: JSX.CSSProperties = {
  position: "absolute",
  bottom: "-15px",
  left: 0,
  right: 0,
  height: "2px",
  background: "#00FFFF",
};

const iconContainer: JSX.CSSProperties = {
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  flex: 1,
};

const icon: JSX.CSSProperties = {
  "font-size": "128px",
};

const allIngredients = [
  { icon: "🍅", label: "Tomato" },
  { icon: "🥬", label: "Lettuce" },
  { icon: "🧀", label: "Cheese" },
  { icon: "🥕", label: "Carrot" },
  { icon: "🍌", label: "Banana" },
  { icon: "🫐", label: "Blueberries" },
  { icon: "🥂", label: "Champers?" },
];

const [tomato, lettuce, cheese] = allIngredients;
const tabs = [tomato, lettuce, cheese];
