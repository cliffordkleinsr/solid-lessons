import { Component, JSXElement } from "solid-js";

const Dropdown: Component<{ children: JSXElement; name: string }> = (props) => {
  return (
    <div class="dropdown">
      <div
        tabindex="0"
        role="button"
        class="btn m-1 btn-ghost text-gray-500 transition hover:text-gray-500/75"
      >
        {props.name}
      </div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {props.children}
      </ul>
    </div>
  );
};

export default Dropdown;
