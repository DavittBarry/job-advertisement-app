import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import HomePage from "../components/HomePage.vue";
import JobListings from "../components/JobListings.vue";
import RegisterTemplate from "../components/RegisterTemplate.vue";
import LoginTemplate from "../components/LoginTemplate.vue";
import SubmitJobForm from "../components/SubmitJobForm.vue";
import JobDetails from "../components/JobDetails.vue";
import UserProfile from "../components/UserProfile.vue";
import EditJobForm from "../components/EditJobForm.vue";
import PrivacyStatement from "../components/PrivacyStatement.vue";
import CookiePolicy from "../components/CookiePolicy.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/job-listings",
    name: "Job listings",
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
  {
    path: "/jobs/:id",
    name: "JobDetails",
    component: JobDetails,
  },
  {
    path: "/search",
    name: "SearchResults",
    component: () => import("@/components/SearchResults.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-job/:editId",
    name: "EditJob",
    component: EditJobForm,
    props: true,
  },
  {
    path: "/privacy-statement",
    name: "PrivacyStatement",
    component: PrivacyStatement,
  },
  {
    path: "/cookie-policy",
    name: "CookiePolicy",
    component: CookiePolicy,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    console.warn("Not authenticated, redirecting to Login.");
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
