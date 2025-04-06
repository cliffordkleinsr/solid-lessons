import {
  createAsync,
  query,
  redirect,
  useSearchParams,
  useSubmission,
} from "@solidjs/router";
import { Show } from "solid-js";
import { getEvent } from "vinxi/http";
import { getSession, superLogin } from "~/apis/auth";
import { setFlashCookieHeader } from "~/apis/flash";
import Loading from "~/components/Loader";
const checkloggedIn = query(async () => {
  "use server";
  const session = await getSession();
  if (session.data.user) {
    throw redirect("/backend");
  }
}, "checkloggedIn");

export default function Actionslogin() {
  createAsync(() => checkloggedIn());
  const submission = useSubmission(superLogin);
  return (
    <>
      <form action={superLogin} class="mx-auto py-10 max-w-md" method="post">
        <div class="grid gap-2 place-items-center">
          <div class="card w-96 bg-base-200/20 card-md shadow-xl">
            <div class="card-body space-y-3">
              <h2 class="card-title">Login</h2>
              <input
                type="text"
                placeholder="Username"
                class="input"
                name="name"
              />
              {/* @ts-ignore */}
              <Show when={submission.result?.error.name}>
                <div role="alert" class="alert alert-error alert-soft">
                  {/* @ts-ignore */}
                  <span>{submission.result?.error.name}</span>
                </div>
              </Show>
              <input
                type="text"
                placeholder="Password"
                class="input"
                name="password"
              />
              {/* @ts-ignore */}
              <Show when={submission.result?.error.password}>
                <div role="alert" class="alert alert-error alert-soft">
                  {/* @ts-ignore */}
                  <span>{submission.result?.error?.password}</span>
                </div>
              </Show>
              <Show when={typeof submission.result?.error === "string"}>
                <div role="alert" class="alert alert-error alert-soft">
                  <span>{submission.result?.error as string}</span>
                </div>
              </Show>
              <div class="card-actions">
                <button
                  class="btn btn-primary rounded-md w-full"
                  disabled={submission.pending}
                >
                  {submission.pending ? <Loading /> : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
