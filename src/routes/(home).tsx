import { MetaProvider } from "@solidjs/meta";
import { RouteSectionProps } from "@solidjs/router";
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
