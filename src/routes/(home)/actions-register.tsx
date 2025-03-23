import { action, useSubmission } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { registerUser } from "~/apis/auth";
import Loading from "~/components/Loader";

export default function ActionsRegister() {
  const submission = useSubmission(registerUser);
  return (
    <>
      <form action={registerUser} class="mx-auto py-10 max-w-md" method="post">
        <div class="grid gap-2 place-items-center">
          <div class="card w-96 bg-base-200/20 card-md shadow-xl">
            <div class="card-body space-y-3">
              <h2 class="card-title">Sign Up</h2>
              <input
                type="text"
                placeholder="Username"
                class="input"
                name="name"
              />
              <Show when={submission.result?.error}>
                <div role="alert" class="alert alert-error alert-soft">
                  <span>{submission.result?.error}</span>
                </div>
              </Show>
              <input
                type="text"
                placeholder="Password"
                class="input"
                name="password"
              />
              <Show when={submission.result?.error}>
                <div role="alert" class="alert alert-error alert-soft">
                  <span>{submission.result?.error}</span>
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
