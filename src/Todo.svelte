<script lang="ts">
  import { todos } from "./stores";

  export let todo: Todo;

  let isEditing: boolean = false;

  function onClickEditText(): void {
    isEditing = true;
  }

  function onFinishEditing(id: number): void {
    isEditing = false;
    todos.editTodo(id, todo.text);
  }

  function focus(e: HTMLTextAreaElement) {
    e.focus();
    e.style.height = `${20 + e.scrollHeight}px`;
  }
</script>

<button class={`todo ${todo.isComplete && "completed"}`}>
  {#if isEditing && !todo.isComplete}
    <textarea
      on:blur={() => onFinishEditing(todo.id)}
      class="text"
      bind:value={todo.text}
      use:focus
    />
  {:else}
    <span for="text" on:click={onClickEditText} class="text">{todo.text}</span>
  {/if}
  <div class={`buttons-wrapper`}>
    {#if todo.isComplete}
      <button class="actions" on:click={() => todos.removeTodo(todo.id)}>
        X
      </button>
    {:else}
      <button class="actions" on:click={() => todos.completeTodo(todo.id)}
        >V</button
      >
    {/if}
  </div>
</button>

<style>
  .todo {
    background: white;
    text-align: left;
    padding: 8px 12px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 50px;
    transition: 0.1s ease;
    word-break: break-all;
  }

  .todo .text {
    width: 100%;
  }

  .todo:focus {
    border: 1px solid #ddd;
  }

  .todo:hover {
    background: #eee;
    border-color: #bbb;
  }

  .completed {
    text-decoration: line-through;
    background: #ddd;
  }

  .completed:hover {
    background: #ddd;
  }

  .actions {
    border: none;
    padding: 4px 10px;
    background: transparent;
    margin: 0;
  }

  .actions:hover {
    cursor: pointer;
    background: #ddd;
  }

  textarea:focus {
    border: none;
    outline: none;
  }
</style>
