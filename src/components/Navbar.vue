<template>
  <div class="navbar">
    <h2 @click="$router.push('/')">Vue navbar</h2>
    <div class="navbar__btns">
      <my-button @click="$router.push('/')"> Main</my-button>
      <my-button style="margin-left: 15px" @click="$router.push('/posts')">
        composition Api</my-button
      >
      <my-button
        style="margin-left: 15px"
        @click="$router.push('/composition')"
      >
        Posts</my-button
      >
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.navbar {
  height: 50px;
  border-color: teal;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>
