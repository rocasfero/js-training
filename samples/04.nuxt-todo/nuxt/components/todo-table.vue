<template>
  <table class="table">
    <thead>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="todo in todos" :key="todo.id">
        <td>{{ todo.id }}</td>
        <td>{{ todo.title }}</td>
        <td>
          <button class="button is-danger" @click="$emit('removeTodo', todo.id)">x</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    todos: Array
  }
};
</script>