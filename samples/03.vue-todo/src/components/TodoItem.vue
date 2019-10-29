<template>
  <div>
    <p>
      [{{todo.id}}] {{todo.title}}
      <button @click="$emit('removeTodo', todo.id)">remove</button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object
  }
};
</script>