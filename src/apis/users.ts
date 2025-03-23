import { query } from "@solidjs/router";
import { DummyJSON } from "./types";

export const getUsers = query(async () => {
  "use server";
  const response = await fetch("https://dummyjson.com/users");
  return (await response.json()) as DummyJSON;
}, "users");
