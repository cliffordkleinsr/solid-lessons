import { MetaProvider } from "@solidjs/meta";
import { createAsync, RouteSectionProps } from "@solidjs/router";
import { getThemeSession } from "~/apis/theme";
import Nav from "~/components/Nav";

export default function HomeLayout(props: RouteSectionProps) {
  return (
    <>
      <MetaProvider>
        <Nav />
        {props.children}
      </MetaProvider>
    </>
  );
}
