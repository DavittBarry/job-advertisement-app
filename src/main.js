import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import axios from 'axios';
import router from './routes/index';
import store from './store';

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:4000';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['auth-token'] = token;
  }
  return config;
});

app.use(store);

app.use(router).mount('#app');
