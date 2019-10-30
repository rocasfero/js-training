<template>
  <form @submit.prevent="addTodo">
    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" type="text" v-model="title" placeholder="e.g.) 買い物をする" />
      </div>
      <div class="control">
        <button class="button is-primary">ADD</button>
      </div>
    </div>
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