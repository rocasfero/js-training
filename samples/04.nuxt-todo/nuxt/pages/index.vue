<template>
  <div class="container">
    <div class="colmns">
      <div class="column is-12">
        <div id="todoList" class="content">
          <h1>Todo List</h1>
          <TodoInput @addTodo="addTodo"></TodoInput>
          <hr />
          <TodoTable :todos="todos" @removeTodo="removeTodo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoInput from "../components/todo-input";
import TodoTable from "../components/todo-table";

export default {
  components: {
    TodoInput,
    TodoTable
  },
  data() {
    return {
      todos: []
    };
  },
  methods: {
    async getTodos() {
      const todos = await this.$axios.$get("/api/todos");
      this.todos = todos;
    },
    async removeTodo(id) {
      await this.$axios.$delete("/api/todos/" + id);
      await this.getTodos();
    },
    async addTodo(title) {
      await this.$axios.$post("/api/todos", { title });
      await this.getTodos();
    }
  },
  mounted() {
    this.getTodos();
  }
};
</script>
