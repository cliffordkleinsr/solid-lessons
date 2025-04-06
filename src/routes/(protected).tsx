import {
  A,
  action,
  createAsync,
  query,
  redirect,
  RouteSectionProps,
  useAction,
  useLocation,
} from "@solidjs/router";
import { createEffect, onCleanup, onMount } from "solid-js";
import { toast } from "solid-sonner";
import { getEvent } from "vinxi/http";

import { getSession, logout } from "~/apis/auth";
import { getStatus, setFlash, setFlashCookieHeader } from "~/apis/flash";
import ModeToggle from "~/components/ModeToggle";
import { useFlashToast } from "~/context/flashes";
import { TodoContextProvider } from "~/context/TodoContext";

const checkifAllowed = query(async () => {
  "use server";
  const session = await getSession();
  if (!session.data.user) {
    return redirect("/");
  }
}, "checkifAllowed");

export default function ProtectedLayout(props: RouteSectionProps) {
  createAsync(() => checkifAllowed());

  const location = useLocation();
  const active = (path: string) => path === location.pathname;

  const logoutAction = useAction(action(logout));

  useFlashToast();
  return (
    <>
      <div class="navbar bg-neutral text-neutral-content flex gap-2">
        <A href="/" class="text-gray-500 transition hover:text-gray-500/75">
          {" "}
          Home
        </A>
        <A
          href="/backend"
          class="text-gray-500 transition hover:text-gray-500/75"
        >
          {" "}
          Backend
        </A>
        <A
          class="text-gray-500 transition hover:text-gray-500/75"
          classList={{
            "text-teal-600 hover:text-teal-600/75": active("/backend/posts"),
          }}
          href="/backend/posts"
        >
          Posts
        </A>
        <div class="ml-auto">
          <div class="avatar">
            <div class="w-12">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <button class="btn btn-ghost" onClick={() => logoutAction()}>
            Logout
          </button>
          <ModeToggle />
        </div>
      </div>
      <TodoContextProvider>{props.children}</TodoContextProvider>
    </>
  );
}
