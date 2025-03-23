import { action, redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";
import { db } from "~/db";
import { usersTable } from "~/db/schema";

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

export const registerUser = action(async (formData: FormData) => {
  "use server";
  const data = Object.fromEntries(formData);
  if (data.name === "" && data.password === "") {
    return {
      error: "Fields must not be empty",
    };
  }

  const { name, password } = data as Registration;
  try {
    // add the user
    // await db.insert(usersTable).values({
    //   name: name as string,
    //   password: password as string,
    // });
    // create a session
    const session = await getSession();
    await session.update({ user: name });
  } catch (err) {
    return {
      error: err as string,
    };
  }
  throw redirect("/backend");
}, "registerUser");

export async function logout() {
  "use server";
  const session = await getSession();
  await session.update({ user: null! });
  throw redirect("/");
}

export async function getUser() {
  "use server";
  const session = await getSession();
  return session?.data?.user;
}

