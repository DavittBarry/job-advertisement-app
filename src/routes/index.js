import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import HomePage from "../components/HomePage.vue";
import JobListings from "../components/JobListings.vue";
import RegisterTemplate from "../components/RegisterTemplate.vue";
import LoginTemplate from "../components/LoginTemplate.vue";
import SubmitJobForm from "../components/SubmitJobForm.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: JobListings,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterTemplate,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginTemplate,
  },
  {
    path: "/submit-job-form",
    name: "SubmitJob",
    component: SubmitJobForm,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
