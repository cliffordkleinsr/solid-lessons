import { useTodoContext } from "~/context/TodoContext";
import {
  Component,
  createEffect,
  createSignal,
  Index,
  onMount,
} from "solid-js";
import { produce } from "solid-js/store";
import { Show } from "solid-js";
import { animate, createSpring, utils } from "animejs";

export default function backend() {
  const { todos, setTodo } = useTodoContext();

  const handleCheck = (selected: string) => {
    setTodo(
      produce((todos) => {
        todos.forEach((todo) => {
          if (todo?.text === selected) {
            todo.status = !todo.status;
          }
        });
      }),
    );
  };

  const removeElement = (index: number) => {
    setTodo(
      produce((todos) => {
        todos.splice(index, 1);
      }),
    );
  };
  return (
    <section
      class="min-h-screen bg-zinc-950 py-24"
      style={{
        "background-image": `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div class="mx-auto w-full max-w-xl px-4">
        <Header />
        <Todos
          todos={todos}
          removeElement={removeElement}
          handleCheck={handleCheck}
        />
        <Form />
      </div>
    </section>
  );
}

const Header: Component<{}> = (props) => {
  return (
    <header class="mb-6">
      <h1 class="text-xl font-medium text-white">{checkTime()}</h1>
      <p class="text-zinc-400">Let's see what we've got to do today.</p>
    </header>
  );
};

type TodoList = {
  text: string;
  status: boolean;
};

const Todos: Component<{
  todos: TodoList[];
  handleCheck: (selected: string) => void;
  removeElement: (id: number) => void;
}> = (props) => {

  return (
    <div class="w-full space-y-3">
      <Index each={props.todos}>
        {(todo, ix) => (
          <div class="relative flex w-full items-center gap-3 rounded border border-zinc-700 bg-zinc-900 p-3" id ="todosE">
            <input
              type="checkbox"
              checked={todo()?.status}
              onChange={() => props.handleCheck(todo()?.text)}
              class="size-4 accent-indigo-400"
            />
            <p
              class="text-white transition-colors"
              classList={{ "text-zinc-400": todo()?.status }}
            >
              {todo().text}
            </p>
            <button
              onClick={() => {
                // props.removeElement(ix)
                const all_todos = utils.$('#todosE')
                animate(all_todos[ix], {
                  scale: [
                    { from: 1 },
                    { to: 1.025, duration: 200}
                  ],
                  x: [
                    {from: 0},
                    {to: 100, duration: 200, delay: 200}
                  ],
                  opacity: [
                    { from: 1},
                    { to: 0, duration: 200, delay: 200}
                  ],
                  onComplete: () => props.removeElement(ix)
                })
              }}
              class="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
            >
              <TrashIcon />
            </button>
          </div>
        )}
      </Index>
    </div>
  );
};

const Form: Component<{}> = (props) => {
  const [visible, setVisible] = createSignal(false);
  const [newtodo, setNewTodo] = createSignal("");
  const { setTodo } = useTodoContext();
  let fromRef!: HTMLFormElement;

  return (
    <main class="fixed bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
      <Show when={visible()}>
        <form
          ref={fromRef}
          method="post"
          class="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!newtodo().length) {
              return;
            }
            setTodo(
              produce((todos) => {
                todos.push({ text: newtodo(), status: false });
              }),
            );
            setNewTodo("");
            fromRef.reset();
          }}
        >
          <textarea
            name="todo"
            placeholder="What do you need to do?"
            onChange={(e) => setNewTodo(e.target.value)}
            class="h-24 w-full resize-none rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
          />

          <button
            type="submit"
            class="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500"
          >
            Submit
          </button>
        </form>
      </Show>
      <button
        onClick={() => {
          if (!visible()) {
            setVisible((pv) => !pv);
            // container
            animate(fromRef, {
              opacity: [0, 1],
              y: [25, 0],
              ease: 'outBack',
              duration: 300,
            });
            // svg 
            animate("#plusicon", {
              rotate: [0, '90deg'],
              duration: 100
            })
          } else {
            animate(fromRef, {
              opacity: [1, 0],
              y: [0, 25],
              duration: 300,
              ease: 'inBack',
              onComplete: () => {
                setVisible((pv) => !pv);
              },
            });

            animate("#plusicon", {
              rotate: ['90deg', 0],
              duration: 100
            })
          }
        }}
        class="grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900"
      >
        <PlusIcon />
      </button>
    </main>
  );
};


function checkTime() {
  let today = new Date();
  let curHr = today.getHours();

  let greeting = "";
  switch (true) {
    case curHr < 12:
      greeting = "Good morning! ☀️";
      break;
    case curHr < 18:
      greeting = "Good afternoon! 🕛";
      break;
    case curHr > 18:
      greeting = "Good evening! 🌃";
      break;
    default:
      greeting = "Good morning! ☀️";
      break;
  }
  return greeting;
}
const TrashIcon = () => {
  return (
    <svg
      class="size-4 text-red-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
      />
    </svg>
  );
};

const PlusIcon: Component<{ class?: string }> = (props) => {
  return (
    <svg
      id="plusicon"
      xmlns="http://www.w3.org/2000/svg"
      class={`size-4 ${props.class}`}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"
      />
    </svg>
  );
};
