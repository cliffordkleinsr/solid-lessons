import { createAsync, query, redirect, RouteDefinition } from "@solidjs/router";
import { getSession } from "~/apis/auth";
import Loader from "~/components/Loader";

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
