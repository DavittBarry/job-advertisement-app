import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import JobListings from '../components/JobListings.vue';
import RegisterTemplate from '../components/RegisterTemplate.vue';
import LoginTemplate from '../components/LoginTemplate.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: JobListings
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterTemplate
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginTemplate
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
