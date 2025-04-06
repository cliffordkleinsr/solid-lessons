import { Component, createContext, JSX, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

type TodoList = {
  text: string;
  status: boolean;
};
type Todos = TodoList[];

type TodoContextType = {
  todos: Todos;
  setTodo: SetStoreFunction<Todos>;
};

export const TodoContext = createContext<TodoContextType>();
export const TodoContextProvider: Component<{ children: JSX.Element }> = (
  props,
) => {
  const [todos, setTodo] = createStore<Todos>([
    { text: "Write my first post", status: true },
    { text: "Upload the post to the blog", status: false },
    { text: "Publish the post at Facebook", status: false },
  ]);
  return (
    <TodoContext.Provider value={{ todos, setTodo }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
