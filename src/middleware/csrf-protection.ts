import type { RequestEvent } from "solid-js/web";
import { type RequestMiddleware } from "@solidjs/start/middleware";
import { json } from "@solidjs/router";
import { createHmac } from "node:crypto";
import { getSession, HTTPEvent, SessionConfig, setCookie } from "vinxi/http";
import { type FetchEvent } from "@solidjs/start/server";
const SAFE_METHODS = ["GET", "HEAD", "OPTIONS", "TRACE"];
const TRUSTED_ORIGINS = [""]; //todo

("use server");
export const generateCSRFCOOKIE: RequestMiddleware = async (
  event: FetchEvent,
) => {
  const secret = process.env.CSRF_SECRET as string;
  if (!secret)
    throw new Error("CSRF_SECRET is not set in environment variables");
  // todo get sess id
  type SessionData = {
    user: string;
    role: string;
  };
  const sessionConfig = {
    password: process.env.SESSION_SECRET,
  } as SessionConfig;
  const session = await getSession<SessionData>(
    event.nativeEvent,
    sessionConfig,
  );
  const sessionID = session.id;
  const randomValue = crypto.randomUUID();

  // Create the CSRF Token
  const message =
    sessionID.length +
    "!" +
    sessionID +
    "!" +
    randomValue.length +
    "!" +
    randomValue; // HMAC message payload
  const hmac = createHmac("sha256", secret).update(message).digest("hex");
  const csrfToken = hmac + "." + randomValue;

  setCookie(event.nativeEvent, "csrf_token", csrfToken, {
    httpOnly: false, // Set Cookie without HttpOnly flag
  });
};
export const createCSRFProtection: RequestMiddleware = async (
  event: FetchEvent,
) => {
  const { request } = event;
  if (!SAFE_METHODS.includes(request.method)) {
    const requestUrl = new URL(request.url);
    const origin = request.headers.get("Origin");

    // If we have an Origin header, check it against our allowlist.
    if (origin) {
      const parsedOrigin = new URL(origin);

      if (
        parsedOrigin.origin !== requestUrl.origin &&
        !TRUSTED_ORIGINS.includes(parsedOrigin.host)
      ) {
        return json({ error: "origininvalid" }, { status: 403 });
      }
    }
    // If we are serving via TLS and have no Origin header, prevent against
    // CSRF via HTTP man-in-the-middle attacks by enforcing strict Referer
    // origin checks.
    if (!origin && requestUrl.protocol === "https:") {
      const referer = request.headers.get("Referer");

      if (!referer) {
        return json({ error: "referer not supplied" }, { status: 403 });
      }

      const parsedReferer = new URL(referer);

      if (parsedReferer.protocol !== "https:") {
        return json({ error: "referer invalid" }, { status: 403 });
      }

      if (
        parsedReferer.host !== requestUrl.host &&
        !TRUSTED_ORIGINS.includes(parsedReferer.host)
      ) {
        return json({ error: "referer invalid" }, { status: 403 });
      }
    }
  }
};
