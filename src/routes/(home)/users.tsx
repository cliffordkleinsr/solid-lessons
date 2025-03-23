import { createAsync, RouteDefinition } from "@solidjs/router";
import { Component, For, Suspense } from "solid-js";
import { getUsers } from "~/apis/users";

const Card: Component<{ name: string; phone: string; src?: string }> = (
  props,
) => {
  return (
    <>
      <div class="card bg-base-300 w-96 shadow-sm rounded-md">
        <div class="card-body">
          <h2 class="card-title">{props.name}</h2>
          <p>{props.phone}</p>
          <div class="card-actions justify-end">
            <div class="avatar">
              <div class="w-12 rounded-full">
                <img src={props.src} alt={props.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * This is a fallback componen, useful for showing when data is Loading
 * @param props
 * @returns JSX.Component
 */
const FallBack: Component<{}> = (props) => {
  return (
    <div class="text-center place-items-center">
      <span class="loading loading-ring loading-xl"></span>
    </div>
  );
};

export const route = {
  preload: () => getUsers(),
} satisfies RouteDefinition;

export default function Users() {
  const users = createAsync(() => getUsers());

  return (
    <div class=" mx-auto max-w-6xl w-full py-5 space-y-3">
      <h1 class="text-center text-2xl">This is a tutorial on data loading</h1>
      <h1 class="text-center text-2xl">User List</h1>
      <Suspense fallback={<FallBack />}>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          <For each={users()?.users}>
            {(user) => (
              <Card name={user.firstName} phone={user.phone} src={user.image} />
            )}
          </For>
        </div>
      </Suspense>
    </div>
  );
}
