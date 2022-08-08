import { createStore } from "vuex";

import posts from "./posts";

export default createStore({
  modules: {
    posts,
  },
});
