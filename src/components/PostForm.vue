<template>
  <form @submit.prevent>
    <label for="title"
      >Title<my-input v-focus v-model="title" type="text" id="title"
    /></label>
    <label for="description"
      >Description<my-input v-model="description" type="text" id="description"
    /></label>
    <my-button style="align-self:flex-end" @click="create">Add post</my-button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      description: "",
    };
  },

  methods: {
    create() {
      this.$emit("create", this.title, this.description);
      this.title = "";
      this.description = "";
    },
  },
};
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
}

label {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 24px;
  text-align: center;
}

</style>
