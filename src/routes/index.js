import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import JobListings from '../components/JobListings.vue';
import RegisterTemplate from '../components/RegisterTemplate.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
