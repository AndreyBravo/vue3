import axios from "axios";

export default {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
  mutations: {
    SET_POSTS(state, payload) {
      state.posts = payload;
    },
  },
  actions: {
    async GET_POSTS({ commit }) {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        // this.totalPage = Math.ceil(
        //   response.headers["x-total-count"] / this.limitPage
        // );
        // this.posts = response.data;
        commit("SET_POSTS", response.data);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
