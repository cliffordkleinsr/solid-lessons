import { query } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { toast } from "solid-sonner";
import { getCookie, HTTPEvent } from "vinxi/http";
import { parse, serialize } from "cookie-es";
export const setFlashCookieHeader = (
  message: string,
  type: string,
  age: string = "5",
): ResponseInit["headers"] => {
  const headers = new Headers({
    "Set-Cookie": `flash=${message}_${type}; Max-Age=${age}`,
  });
  return headers;
};
/**
 *  Get flash message from cookie
 */
export const getStatus = () => {
  // const fetchEvent = getRequestEvent();
  // const event = fetchEvent?.nativeEvent as HTTPEvent;
  const cookies = parse(document.cookie);
  console.log(cookies["flash"]);
  return cookies["flash"];
};

/**
 * Set the flash using a toast
 * @param flash
 * @returns
 */
export const setFlash = (flash: string | undefined) => {
  if (flash) {
    const message = flash?.split("_")[0];
    const type = flash?.split("_")[1];
    let timer;
    switch (true) {
      case type === "success":
        timer = setTimeout(() => toast.success(message), 100);
        break;
      case type == "error":
        timer = setTimeout(() => toast.error(message), 100);
        break;
      case type == "info":
        timer = setTimeout(() => toast.info(message), 100);
        break;
      default:
        break;
    }
    return timer;
  }
};
