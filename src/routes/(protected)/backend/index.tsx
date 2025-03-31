import { createAsync, query, redirect } from "@solidjs/router";
import { getSession } from "~/apis/auth";

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
