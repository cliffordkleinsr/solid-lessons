import { createAsync, query, redirect } from "@solidjs/router";
import { createEffect, createSignal, Index, onMount } from "solid-js";
import { produce } from "solid-js/store";
import { getSession } from "~/apis/auth";
import { useTodoContext } from "~/context/TodoContext";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

export default function backend() {
  const todoStore = useTodoContext();
  const [newItem, setItem] = createSignal("");
  let checkbox: HTMLInputElement[];
  let textspan: HTMLSpanElement[];
  let button: HTMLButtonElement[];
  createEffect(() => {
    newItem();
    checkbox = gsap.utils.toArray(".checkbox");
    textspan = gsap.utils.toArray(".text-sm");
    button = gsap.utils.toArray("#remove");

    gsap.registerPlugin(Flip);
  });

  function addTodos() {
    todoStore?.setTodo(
      produce((todo) => {
        todo.push({ text: newItem(), status: false });
        setItem((prev) => (prev = ""));
      }),
    );
  }

  function removeTodo(index: number) {
    const state = Flip.getState([
      checkbox[index],
      textspan[index],
      button[index],
    ]);

    Flip.from(state, {
      duration: 0.4,
      ease: "power2.inOut",
      opacity: 0,
      translateX: 100,
      scale: true,
      onComplete: () => {
        todoStore?.setTodo(
          produce((todo) => {
            todo.splice(index, 1);
          }),
        );
      },
    });
  }

  return (
    <>
      <p class="py-2 px-2">Welcome to the backend</p>
      <div class="mx-auto py-3 max-w-md">
        <h1 class="text-2xl py-5">Using Stores with Context</h1>
        <input
          type="text"
          placeholder="new todo item.."
          class="input"
          value={newItem()}
          onChange={(e) => setItem(e.target.value)}
        />
        <button class="btn" onClick={addTodos}>
          Add
        </button>
        <br />
        <Index each={todoStore?.todos}>
          {(item, index) => (
            <div class="flex gap-1 space-x-3 space-y-5 self-center py-1">
              <input
                data-flip-id="ip"
                class="checkbox"
                checked={item().status}
                type="checkbox"
                onChange={(e) =>
                  todoStore?.setTodo(index, "status", !item().status)
                }
              ></input>
              <p
                data-flip-id="pg"
                class="text-sm py-2"
                classList={{ "line-through": item().status }}
              >
                {item().text}
              </p>
              <button
                id="remove"
                data-flip-id="btn"
                class="btn btn-sm rounded-lg"
                onClick={() => {
                  removeTodo(index);
                }}
              >
                ❌
              </button>
            </div>
          )}
        </Index>
      </div>
    </>
  );
}
