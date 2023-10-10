import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.common['auth-token'] = token;
  }
  return config;
});

createApp(App).mount('#app');
