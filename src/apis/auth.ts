import { action, query, redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";
import { db } from "~/db";
import { usersTable } from "~/db/schema";
import { inserUser, retUser, userExists } from "./db-utils";
import { getRequestEvent } from "solid-js/web";
import { setFlashCookieHeader } from "./flash";
import { loginschema } from "./schemas";
import { ZodError } from "zod";

export interface SessionData {
  user: string | undefined | null;
}

type Registration = {
  name: string;
  password: string;
};
export function getSession() {
  "use server";
  return useSession<SessionData>({
    password: process.env.SESSION_SECRET!,
  });
}

/**
 * Form Action to register a user
 */
export const registerUser = action(async (formData: FormData) => {
  "use server";
  const data = Object.fromEntries(formData) as Registration;

  if (data.name === "" && data.password === "") {
    return {
      error: "Fields must not be empty",
    };
  }

  const { name } = data;
  const exists = await userExists(name);
  if (exists) {
    return {
      error: "The User already Exists",
    };
  }
  try {
    // add the user
    await inserUser(data);
    // create a session
    const session = await getSession();
    await session.update({ user: name });
  } catch (err) {
    return {
      error: err as string,
    };
  }
  throw redirect("/backend", {
    headers: setFlashCookieHeader("User Registered", "success"),
  });
}, "registerUser");

/**
 * Form Action to sign in a user
 */
export const loginUser = action(async (formData: FormData) => {
  "use server";
  const data = Object.fromEntries(formData);

  if (data.name === "" && data.password === "") {
    return {
      error: "Fields must not be empty",
    };
  }
  const { name, password } = data as Registration;
  const [user, exists] = await retUser(name);
  if (!exists) {
    return {
      error: "User does not exist, please try again",
    };
  }

  if (user.password !== password) {
    return {
      error: "You have entered the wrong password, please try again",
    };
  }

  const session = await getSession();
  await session.update({ user: name });

  const event = getRequestEvent();

  throw redirect("/backend", {
    headers: setFlashCookieHeader("Logged in", "success"),
  });
}, "loginUser");

export async function logout() {
  "use server";
  const session = await getSession();
  await session.update({ user: null! });
  throw redirect("/", {
    headers: setFlashCookieHeader("Logged out", "info"),
  });
}

export async function getUser() {
  "use server";
  const session = await getSession();
  return session?.data?.user;
}

export const superLogin = action(async (formData: FormData) => {
  "use server";
  const data = Object.fromEntries(formData);
  const result = loginschema.safeParse(data);

  if (!result.success) {
    const err = result.error.flatten().fieldErrors;
    return {
      error: err,
    };
  }

  const { name, password } = result.data;
  const [user, exists] = await retUser(name);
  if (!exists) {
    return {
      error: "User does not exist",
    };
  }
  if (user.password !== password) {
    return {
      error: "You have entered the wrong password, please try again",
    };
  }
  const session = await getSession();
  await session.update({ user: name });

  throw redirect("/backend", {
    headers: setFlashCookieHeader("Logged in", "success"),
  });
}, "superLogin");
