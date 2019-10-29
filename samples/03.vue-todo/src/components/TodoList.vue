<template>
  <div id="todoList">
    <h1>Todo Manager</h1>
    <TodoInput @addTodo="addTodo"></TodoInput>
    <hr />
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @removeTodo="removeTodo" />
  </div>
</template>

<script>
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

export default {
  components: {
    TodoInput,
    TodoItem
  },
  data() {
    return {
      todoIndex: 1,
      todos: []
    };
  },
  methods: {
    removeTodo(id) {
      this.todos = this.todos.filter(todo => {
        return todo.id !== id;
      });
    },
    addTodo(title) {
      this.todos.push({
        id: this.todoIndex++,
        title: title
      });
    }
  },
  mounted() {
    this.addTodo("皿洗い");
    this.addTodo("おつかい");
    this.addTodo("お掃除");
  }
};
</script>

<style>
</style>