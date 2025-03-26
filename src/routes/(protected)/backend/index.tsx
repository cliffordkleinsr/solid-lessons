import { createAsync, query, redirect, RouteDefinition } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { getSession } from "~/apis/auth";
import { getCookie, HTTPEvent, parseCookies } from "vinxi/http";
import Loader from "~/components/Loader";
import { createEffect } from "solid-js";

const pageLoad = query(async () => {
  "use server";
  const session = await getSession();
  if (!session.data.user) {
    return redirect("/");
  }
}, "pageload");

export default function backend() {
  createAsync(() => pageLoad());

  return (
    <>
      <p>Welcome to the backend</p>
    </>
  );
}
