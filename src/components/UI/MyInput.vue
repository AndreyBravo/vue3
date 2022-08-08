<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>
<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
<style scoped>
.input {
  width: 100%;
  margin: 15px 0;
  padding: 10px;
  border: 2px solid teal;
  border-radius: 15px;
}
</style>
