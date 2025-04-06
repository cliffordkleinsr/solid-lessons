import { MetaProvider } from "@solidjs/meta";
import { createAsync, RouteSectionProps } from "@solidjs/router";
import { createEffect, onCleanup, onMount, Show } from "solid-js";
import { getStatus, setFlash } from "~/apis/flash";
import Nav from "~/components/Nav";
import { useFlashToast } from "~/context/flashes";

export default function HomeLayout(props: RouteSectionProps) {
  // onMount(() => {
  //   const flash = getStatus();
  //   const timer = setFlash(flash);
  //   onCleanup(() => clearTimeout(timer));
  // });
  useFlashToast();
  return (
    <>
      <MetaProvider>
        <Nav />
        {props.children}
      </MetaProvider>
    </>
  );
}
