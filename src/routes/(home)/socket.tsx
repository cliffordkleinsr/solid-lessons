import { createSignal, onMount } from "solid-js";

export default function Websockets() {
  let [socket, setSocket] = createSignal<WebSocket>();
  onMount(() => {
    setSocket(new WebSocket("ws"));
    // console.log(socket())
  });
  return (
    <>
      <div class="place-items-center py-15">
        <h1> Welcome to the websocket page</h1>
      </div>
    </>
  );
}
