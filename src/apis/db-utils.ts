import { eq } from "drizzle-orm";
import { db } from "~/db";
import { UserInsert, usersTable } from "~/db/schema";

const inserUser = async (data: UserInsert) => {
  return await db.insert(usersTable).values({
    name: data.name,
    password: data.password,
  });
};
const userExists = async (user: string): Promise<boolean> => {
  const query = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, user));
  return query.length > 0;
};

const retUser = async (
  user: string,
): Promise<
  [
    {
      id: number;
      name: string;
      password: string;
    },
    boolean,
  ]
> => {
  const query = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, user));

  return [query[0], query.length > 0];
};
export { inserUser, userExists, retUser };
