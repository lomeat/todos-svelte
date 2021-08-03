import { writable, Writable } from "svelte/store";

import { createTodo, generateTodos } from "./utils";

function createTodosStore() {
  const { subscribe, update, set }: Writable<Todos> = writable(
    generateTodos(6)
  );

  return {
    // default writable

    subscribe,

    // single

    addTodo: (text: string) => update((todos) => [...todos, createTodo(text)]),

    editTodo: (id: number, text: string) =>
      update(
        (todos: Todos): Todos =>
          todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, text };
            }
            return todo;
          })
      ),

    completeTodo: (id: number): void =>
      update((todos: Todos): Todos => {
        const updatedTodos = todos.map((todo: Todo): Todo => {
          if (todo.id === id) {
            return { ...todo, isComplete: !todo.isComplete };
          }
          return todo;
        });

        const sortedTodos = updatedTodos.sort(
          (a, b) => Number(a.isComplete) - Number(b.isComplete)
        );

        return sortedTodos;
      }),

    removeTodo: (id: number): void =>
      update(
        (todos: Todos): Todos =>
          todos.filter((todo: Todo): boolean => todo.id !== id)
      ),

    // global

    clearCompleted: (): void =>
      update(
        (todos: Todos): Todos =>
          todos.filter((todo: Todo): boolean => !todo.isComplete)
      ),

    removeAll: (): void => set([]),

    generateNew: (): void =>
      update((todos: Todos): Todos => [...todos, ...generateTodos(10)]),
  };
}

export const todos = createTodosStore();
