import { useSession } from "vinxi/http";

type SessionData = {
  theme: "light" | "dark";
};
const useThemeSession = async () => {
  "use server";
  const session = await useSession<SessionData>({
    password: process.env.SESSION_SECRET!,
    name: "theme",
  });
  if (!session.data.theme) {
    await session.update({
      theme: "light",
    });
  }

  return session;
};

const getThemeSession = async () => {
  "use server";
  const session = await useThemeSession();

  return session.data.theme;
};

async function updateThemeSession(data: SessionData) {
  "use server";
  const session = await useThemeSession();
  await session.update(data);
}
async function clearThemeSession() {
  "use server";
  const session = await useThemeSession();
  await session.clear();
}
export {
  useThemeSession,
  getThemeSession,
  updateThemeSession,
  clearThemeSession,
};
