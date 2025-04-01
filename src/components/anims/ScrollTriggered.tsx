import { Component, For } from "solid-js";
interface CardProps {
  emoji: string;
  hueA: number;
  hueB: number;
  i: number;
}
const foods: [string, number, number][] = [
  ["🍅", 340, 10],
  ["🍊", 20, 40],
  ["🍋", 60, 90],
  ["🍐", 80, 120],
  ["🍏", 100, 140],
  ["🫐", 205, 245],
  ["🍆", 260, 290],
  ["🍇", 290, 320],
];
const hue = (h: number) => `hsl(${h}, 100%, 50%)`;
const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
const container = {
  margin: "100px auto",
  maxWidth: 500,
  paddingBottom: 100,
  width: "100%",
};
const cardContainer = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 20,
  marginBottom: -120,
};
const card = {
  fontSize: "10",
  width: "300",
  height: "430",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#f5f5f5",
  "box-shadow":
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  "transform-origin": "10% 60%",
};
const splash = {
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const Card: Component<CardProps> = (props) => {
  const background = `linear-gradient(306deg, ${hue(props.hueA)}, ${hue(props.hueB)})`;
  return (
    <div style={{ ...cardContainer, position: "relative" }}>
      <div
        style={{
          ...splash,
          background,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        class={`card-container-${props.i}`}
      ></div>
      <div style={card}>{props.emoji}</div>
    </div>
  );
};
export default function ScrollTriggered() {
  return (
    <div style={container}>
      <For each={foods}>
        {([emoji, hueA, hueB], index) => (
          <Card i={index()} emoji={emoji} hueA={hueA} hueB={hueB} />
        )}
      </For>
    </div>
  );
}
