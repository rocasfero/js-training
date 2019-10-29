<template>
  <form @submit.prevent="addTodo">
    <input type="text" v-model="title" />
    <button>add</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    addTodo() {
      if (this.title.trim() === "") return;
      this.$emit("addTodo", this.title);
      this.title = "";
    }
  }
};
</script>