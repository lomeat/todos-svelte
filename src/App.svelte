<script lang="ts">
  import { todos } from "./stores";
  import Todo from "./Todo.svelte";

  let newTextValue = "";

  $: amountCompletedTodos = $todos.filter((todo) => todo.isComplete).length;
  $: amountAllTodos = $todos.length;

  function onSubmitNewTodo(text: string): void {
    todos.addTodo(text);
    newTextValue = "";
  }
</script>

<div class="wrapper">
  <h1 class="amount">{amountCompletedTodos} / {amountAllTodos}</h1>
  <div class="control-panel">
    <button on:click={todos.clearCompleted}>clear completed</button>
    <button on:click={todos.removeAll}>remove all</button>
    <button on:click={todos.generateNew}>generate new</button>
  </div>
  <form on:submit|preventDefault={() => onSubmitNewTodo(newTextValue)}>
    <input type="text" bind:value={newTextValue} />
    <button type="submit">Add todo</button>
  </form>

  <div class="list">
    {#each $todos as todo (todo.id)}
      <Todo {todo} />
    {/each}
  </div>
</div>

<style>
  :global(*) {
    box-sizing: border-box !important;
  }

  :globally(.display-none) {
    display: none;
  }

  .wrapper,
  .list {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 100px auto;
  }

  .amount {
    width: 100%;
    text-align: center;
    padding-bottom: 50px;
  }

  .control-panel,
  form {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  input {
    width: 300px;
  }

  .list {
    padding-top: 50px;
    margin: 0;
  }
</style>
