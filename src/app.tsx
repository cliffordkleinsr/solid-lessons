import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Show, Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { Toaster } from "solid-sonner";
import RenderScan from "./components/renderscan/RenderScan";
import { FlashContextProvider } from "./context/FlashContext";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Show when={import.meta.env.DEV}>
            <RenderScan />
          </Show>
          <Toaster richColors />
          
            <Suspense>
            <FlashContextProvider>
                {props.children}
            </FlashContextProvider>
            </Suspense>
          
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
