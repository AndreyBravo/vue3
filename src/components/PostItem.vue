<template>
  <div class="post">
    <div>
      <div><strong>Id post</strong> {{ post.id }}</div>
      <div><strong>Name post</strong> {{ post.title }}</div>
      <div><strong>Description</strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/post/${post.id}`)"> Enter </my-button>

      <my-button style="margin-left:10px" @click="$emit('remove', post)"> Delete </my-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: {},
  },
};
</script>
<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding: 15px;
  border: 2px solid teal;
}

.post__btns{
  display: flex;
}
</style>
