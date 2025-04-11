import { createAsync, RouteDefinition, useParams } from "@solidjs/router";
import { Component, For, Suspense } from "solid-js";
import { getPosts } from "~/apis/posts";
import FallBack from "~/components/Fallback";

export const route = {
  preload: ({ params }) => getPosts(params.id),
} satisfies RouteDefinition;

export default function BrekoutRoute() {
  const params = useParams();
  const posts = createAsync(() => getPosts(params.id));
  return (
    <>
      <div class="mx-auto py-10 space-y-4 max-w-2xl">
        <Suspense fallback={<FallBack />}>
          <h1 class="text-start text-3xl text-cyan-500">{posts()?.title}</h1>
          <p class=" leading-relaxed tracking-wide">{posts()?.body}</p>
          <div class="flex gap-2">
            <For each={posts()?.tags}>
              {(tag) => (
                <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium border border-gray-200 bg-white text-gray-800 shadow-2xs dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                  {tag}
                </span>
              )}
            </For>
          </div>
          <div class="inline-flex flex-wrap gap-2">
            <div>
              <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                👍
                {posts()?.reactions.likes}
              </span>
            </div>

            <div>
              <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                👎
                {posts()?.reactions.dislikes}
              </span>
            </div>
          </div>
          <div>
            <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
              <svg
                class="shrink-0 size-3"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              {posts()?.views}
            </span>
          </div>
        </Suspense>
      </div>
    </>
  );
}
