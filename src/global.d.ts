/// <reference types="svelte" />

type Todo = {
  id: number;
  text: string;
  isComplete: boolean;
  isEditing: boolean;
};

type Todos = Todo[];
