import Main from "@/pages/Main";
import Posts from "@/pages/Posts";
import Post from "@/pages/Post";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: Posts,
  },
  {
    path: "/post/:id",
    component: Post,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router
