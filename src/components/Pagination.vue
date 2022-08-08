<template>
  <div class="wrapper__page">
    <div
      @click="changePage(pageNumber)"
      class="page"
      :class="{
        page__active: page == pageNumber,
      }"
      v-for="pageNumber in totalPage"
      :key="pageNumber"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalPage: {
      type: Number,
    },
    page: {
      type: Number,
    },
  },

  methods: {
    changePage(pageNumber) {
      this.$emit("change-page", pageNumber);
    },
  },
};
</script>
<style scoped>
.wrapper__page {
  margin-top: 10px;
  display: flex;
}

.page {
  margin-right: 5px;
  padding: 10px;
  border: 1px solid teal;
  background: #fff;
  cursor: pointer;
}

.page__active {
  border: 2px solid teal;
}
</style>
