import { serialize } from "cookie-es";
import { getRequestEvent, isServer } from "solid-js/web";
import { onMount } from "solid-js";
import { toast } from "solid-sonner";
import { parse } from "cookie-es";
import { HTTPEvent } from "vinxi/http";

export function useFlashToast() {
  if (isServer) {
    const fetchEvent = getRequestEvent();
    const event = fetchEvent?.nativeEvent as HTTPEvent;
    const cookies = parse(event.headers.get("cookie") || "");
    if (cookies.flash) {
      const [message, type] = cookies.flash.split("_");
      // Send flash to client via hydration or inject into HTML directly
      return { message, type }; // Could expose for SSR-rendered toast
    }
  } else {
    onMount(() => {
      const cookies = parse(document.cookie || "");
      if (cookies.flash) {
        const [message, type] = cookies.flash.split("_");
        toast[type as "info" | "success" | "error" | "warning"](message);

        // Clear cookie
        document.cookie = "flash=; Max-Age=0; Path=/";
      }
    });
  }

  return null;
}

export const setFlashCookieHeader = (
  message: string,
  type: string,
  age = "5",
) => {
  const flashValue = `${message}_${type}`;
  const cookie = serialize("flash", flashValue, {
    maxAge: parseInt(age),
    path: "/",
  });

  const headers = new Headers({ "Set-Cookie": cookie });
  return headers;
};
