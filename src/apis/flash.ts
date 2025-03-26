import { query } from "@solidjs/router";
import { createEffect } from "solid-js";
import { getRequestEvent } from "solid-js/web";
import { toast } from "solid-sonner";
import { getCookie, HTTPEvent } from "vinxi/http";

export const setFlashCookieHeader = (
  message: string,
  type: string,
): ResponseInit["headers"] => {
  const headers = new Headers({
    "Set-Cookie": `flash=${message}|${type}; Max-Age=5`,
  });
  return headers;
};
/**
 *  Get flash message from cookie
 */
export const getStatus = query(async () => {
  "use server";
  const event = getRequestEvent();
  const flash = getCookie(event?.nativeEvent as HTTPEvent, "flash");

  return flash;
}, "flash");

/**
 * Set the flash using a toast
 * @param flash
 * @returns
 */
export const setFlash = (flash: string | undefined) => {
  if (flash) {
    const message = flash?.split("|")[0];
    const type = flash?.split("|")[1];
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
