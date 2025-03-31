import {
  A,
  action,
  createAsync,
  RouteSectionProps,
  useAction,
  useLocation,
} from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { toast } from "solid-sonner";
import { getEvent } from "vinxi/http";

import { logout } from "~/apis/auth";
import { getStatus, setFlash } from "~/apis/flash";
import ModeToggle from "~/components/ModeToggle";

export default function ProtectedLayout(props: RouteSectionProps) {
  const flash = createAsync(() => getStatus());
  const location = useLocation();
  const active = (path: string) => path === location.pathname;
  createEffect(() => {
    const timer = setFlash(flash());
    onCleanup(() => clearTimeout(timer));
  });

  const logoutAction = useAction(action(logout));
  return (
    <>
      <div class="navbar bg-neutral text-neutral-content flex gap-2">
        <A href="/" class="text-gray-500 transition hover:text-gray-500/75">
          {" "}
          Home
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
      {props.children}
    </>
  );
}
