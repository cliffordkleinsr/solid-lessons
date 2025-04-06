import { createAsync, query, redirect } from "@solidjs/router";
import { createEffect, createSignal, Index } from "solid-js";
import { produce } from "solid-js/store";
import { getSession } from "~/apis/auth";
import { useTodoContext } from "~/context/TodoContext";

export default function backend() {
  const todoStore = useTodoContext();
  const [newItem, setItem] = createSignal("");

  function addTodos() {
    todoStore?.setTodo(
      produce((todo) => {
        todo.push({ text: newItem(), status: false });
        setItem((prev) => (prev = ""));
      }),
    );
  }

  function removeTodo(index: number) {
    todoStore?.setTodo(
      produce((todo) => {
        todo.splice(index, 1);
      }),
    );
  }

  return (
    <>
      <p>Welcome to the backend</p>
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
            <div class="space-x-3 space-y-5 self-center py-1">
              <input
                class="checkbox"
                checked={item().status}
                type="checkbox"
                onChange={(e) =>
                  todoStore?.setTodo(index, "status", !item().status)
                }
              ></input>
              <span
                class="text-sm"
                classList={{ "line-through": item().status }}
              >
                {item().text}
              </span>
              <button
                class="btn btn-sm rounded-lg"
                onClick={() => removeTodo(index)}
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
