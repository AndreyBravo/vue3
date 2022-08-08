<template>
  <div v-if="posts.length" class="posts">
    <h2 style="text-align: center">List posts</h2>
    <transition-group name="post-list">
      <post-item
        @remove="$emit('remove', post)"
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </transition-group>
  </div>
  <h2 style="margin-top: 25px" v-else>Not posts</h2>
</template>
<script>
import PostItem from "@/components/PostItem.vue";
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
