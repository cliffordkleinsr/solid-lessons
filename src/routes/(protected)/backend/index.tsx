import { createAsync, query, redirect, RouteDefinition } from "@solidjs/router";
import { getSession } from "~/apis/auth";

const alloWed = query(async () => {
  "use server";
  const session = await getSession();
  if (!session) throw redirect("/");
}, "");

export const route = {
  preload: () => alloWed(),
} satisfies RouteDefinition;
export default function backend() {
  createAsync(() => alloWed());
  return (
    <>
      <p>Welcome to the backend</p>
    </>
  );
}
