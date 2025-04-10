import { A, createAsync, RouteDefinition } from "@solidjs/router";
import { For, Suspense } from "solid-js";
import { getAllPosts } from "~/apis/posts";
import FallBack from "~/components/Fallback";

export const route =  {
  preload: () => getAllPosts()
} satisfies RouteDefinition
export default function PostsRoot() {
  const posts = createAsync(() => getAllPosts());
  return (
    <div class="place-items-center py-10">
      <div class="grid grid-cols-2 gap-3">
        <Suspense fallback={<FallBack />}>
          <For each={posts()?.posts}>
            {(post) => (
              <div class="card card-border bg-base-100 w-96">
                <div class="card-body">
                  <h2 class="card-title">{post?.title}</h2>
                  <div class="card-actions justify-end">
                    <A
                      href={`/backend/posts/${post?.id}`}
                      class="underline underline-offset-1 decoration-teal-400"
                    >
                      View
                    </A>
                  </div>
                </div>
              </div>
            )}
          </For>
        </Suspense>
      </div>
    </div>
  );
}
