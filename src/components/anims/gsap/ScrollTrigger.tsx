import { Component, For, JSX } from "solid-js";

const ScrollTriggered: Component<{}> = (props) => {
  
  return (
    <div style={container}>
        <For each={food}>{
            ([emoji, hueA, hueB]) =>  (
                <Card emoji={emoji} hueA={hueA} hueB={hueB} />
            )    
        }</For>
    </div>
  );
};

export default ScrollTriggered;

const Card: Component<CardProps> = (props) => {
    const background = `linear-gradient(306deg, ${hue(props.hueA)}, ${hue(props.hueB)})`
  return (
    <div
    style={cardContainer}
    >
        <div style={{...splash, background}}></div>
        <div style={card}>
            {props.emoji}
        </div>
    </div>
  );
};
interface CardProps {
    emoji: string
    hueA: number
    hueB: number
}
const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Styles   ================
 */
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
}
const container: JSX.CSSProperties = {
    margin: "100px auto",
    'max-width': '500px',
   'padding-bottom': '100px',
    width: "100%",
}

const cardContainer: JSX.CSSProperties = {
    overflow: "hidden",
    display: "flex",
    'justify-content': "center",
    'align-items': "center",
    position: "relative",
    'padding-top': '20px',
    'margin-bottom': '-120px',
}

const splash: JSX.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    'clip-path': `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card: JSX.CSSProperties = {
    'font-size': '164px',
    width: '300px',
    height: '430px',
    display: "flex",
    'justify-content': "center",
    'align-items': "center",
    'border-radius': '20px',
    background: "#f5f5f5",
    'box-shadow':
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    'transform-origin': "10% 60%",
}

/**
 * ==============   Data   ================
 */

const food: [string, number, number][] = [
    ["🍅", 340, 10],
    ["🍊", 20, 40],
    ["🍋", 60, 90],
    ["🍐", 80, 120],
    ["🍏", 100, 140],
    ["🫐", 205, 245],
    ["🍆", 260, 290],
    ["🍇", 290, 320],
]