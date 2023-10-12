import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import axios from 'axios';
import router from './routes/index';

axios.defaults.baseURL = 'http://localhost:4000';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.common['auth-token'] = token;
  }
  return config;
});

createApp(App)
  .use(router)
  .mount('#app');
