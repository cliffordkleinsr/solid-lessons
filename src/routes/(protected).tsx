import {
  A,
  action,
  createAsync,
  redirect,
  RouteSectionProps,
  useAction,
} from "@solidjs/router";
import { createEffect, createResource } from "solid-js";
import { getUser, logout } from "~/apis/auth";
import ModeToggle from "~/components/ModeToggle";

export default function ProtectedLayout(props: RouteSectionProps) {
  const user = createAsync(() => getUser());
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
