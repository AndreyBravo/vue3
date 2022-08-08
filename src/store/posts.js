import axios from "axios";

export default {
  state: () => ({
    posts: [],
    isPostsLoading: false,
    selectedSort: "",
    sortOptions: [
      { value: "title", name: "On name" },
      { value: "body", name: "On description" },
    ],
    searchQuery: "",
    page: 1,
    limitPage: 10,
    totalPage: 0,
  }),
  getters: {
    getPosts(state) {
      return state.posts;
    },

    getSearchQuery(state) {
        return state.searchQuery
    },

    getSortOptions(state) {
      return state.sortOptions;
    },

    getIsPostsLoading(state) {
      return state.isPostsLoading;
    },

    getSelectedSort(state) {
        return state.selectedSort;
    },

    sortPosts(state) {
      return [...state.posts].sort((a, b) =>
        a[state.selectedSort]?.localeCompare(b[state.selectedSort])
      );
    },

    sortedAndSearchedPosts(state, getters) {
      return getters.sortPosts.filter((post) =>
        post.title?.includes(state.searchQuery)
      );
    },
  },
  mutations: {
    SET_POSTS(state, payload) {
      state.posts = payload;
    },
    SET_PAGE(state, payload) {
      state.page = payload;
    },
    SET_TOTALPAGE(state, payload) {
      state.totalPage = payload;
    },
    SET_ISPOSTSLOADING(state, payload) {
      state.isPostsLoading = payload;
    },
    SET_SELETEDSORTD(state, payload) {
        state.selectedSort = payload
    },
    SET_SEARCHQUERY(state, payload) {
        state.searchQuery = payload
    },
  },
  actions: {
    async GET_POSTS({ state, commit }) {
      try {
        commit("SET_ISPOSTSLOADING", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limitPage,
            },
          }
        );
        commit(
          "SET_TOTALPAGE",
          Math.ceil(response.headers["x-total-count"] / state.limitPage)
        );
        commit("SET_POSTS", response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        commit("SET_ISPOSTSLOADING", false);
      }
    },
    async GET_MOREPOSTS({ state, commit }) {
      try {
        commit("SET_PAGE", state.page+=1);
        commit("SET_ISPOSTSLOADING", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limitPage,
            },
          }
        );
        commit(
          "SET_TOTALPAGE",
          Math.ceil(response.headers["x-total-count"] / state.limitPage)
        );
        commit("SET_POSTS", [state.posts, ...response.data]);
        
      } catch (error) {
        console.log(error.message);
      } finally {
        commit("SET_ISPOSTSLOADING", false);
      }
    },
  },
};
