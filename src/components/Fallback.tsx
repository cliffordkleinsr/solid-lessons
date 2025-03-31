import { Component } from "solid-js";

const FallBack: Component<{}> = (props) => {
  return (
    <div class="text-center place-items-center">
      <span class="loading loading-ring loading-xl"></span>
    </div>
  );
};
export default FallBack;
