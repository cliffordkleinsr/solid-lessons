import {
  A,
  action,
  createAsync,
  RouteSectionProps,
  useAction,
} from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { toast } from "solid-sonner";

import { getUser, logout } from "~/apis/auth";
import { getStatus, setFlash } from "~/apis/flash";
import ModeToggle from "~/components/ModeToggle";

export default function ProtectedLayout(props: RouteSectionProps) {
  const user = createAsync(() => getUser());
  const flash = createAsync(() => getStatus());

  createEffect(() => {
    const timer = setFlash(flash());
    onCleanup(() => clearTimeout(timer));
  });

  const logoutAction = useAction(action(logout));
  return (
    <>
      <div class="navbar bg-neutral text-neutral-content flex">
        <a href="">{user()}</a>|<A href="/"> Home</A>
        <div class="ml-auto">
          <button class="btn btn-ghost" onClick={() => logoutAction()}>
            Logout
          </button>
          <ModeToggle />
        </div>
      </div>
      {props.children}
    </>
  );
}
