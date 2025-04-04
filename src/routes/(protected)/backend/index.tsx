import { createAsync, query, redirect } from "@solidjs/router";
import { getSession } from "~/apis/auth";
import { FlashContextType, useFlashContext } from "~/context/FlashContext";

const pageLoad = query(async () => {
  "use server";
  const session = await getSession();
  if (!session.data.user) {
    return redirect("/");
  }
}, "pageload");


export default function backend() {
  createAsync(() => pageLoad());
  const flashstore = useFlashContext() 
  return (
    <>
      <p>Welcome to the backend</p>
      <p>{flashstore?.flash.message}</p>
      <p>{flashstore?.flash.type}</p>
      <button class='btn' onClick={() => {
        flashstore?.setFlash('message', 'Bye Bye')
        flashstore?.setFlash('type', 'warning')
      }}>Gday</button>
    </>
  );
}
