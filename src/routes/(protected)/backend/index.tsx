import { createAsync, query, redirect } from "@solidjs/router";
import { produce } from "solid-js/store";
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
        flashstore?.setFlash(produce((flash) => {
          flash.message = 'Bye Bye',
          flash.type = 'warning'
        }))
      }}>Gday</button>
    </>
  );
}
