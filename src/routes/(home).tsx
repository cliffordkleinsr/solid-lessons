import { MetaProvider } from "@solidjs/meta";
import { createAsync, RouteSectionProps } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { getStatus, setFlash } from "~/apis/flash";
import Nav from "~/components/Nav";

export default function HomeLayout(props: RouteSectionProps) {
  const flash = createAsync(() => getStatus());
  createEffect(() => {
    const timer = setFlash(flash());
    onCleanup(() => clearTimeout(timer));
  });
  return (
    <>
      <MetaProvider>
        <Nav />
        {props.children}
      </MetaProvider>
    </>
  );
}
