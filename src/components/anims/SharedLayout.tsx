import { Component, createSignal, For } from "solid-js";

const SharedLayout: Component<{}> = (props) => {
  const allIngredients = [
    { icon: "🍅", label: "Tomato" },
    { icon: "🥬", label: "Lettuce" },
    { icon: "🧀", label: "Cheese" },
  ];
  return (
    <div>
            <nav >
                <ul >
                        <li
                        >
                        </li>
                </ul>
            </nav>
    </div>
  );
};

export default SharedLayout;
