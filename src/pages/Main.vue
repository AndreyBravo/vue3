<template>
  <div>
    <h1>Welcom..!</h1>
    <div>
      <div v-for="post in posts" :key="post.id">
        {{ post.title }}
        {{ post.body }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    
  },

  async mounted() {
    
  },
};
</script>

