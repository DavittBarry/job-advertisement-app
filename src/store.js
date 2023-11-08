import { reactive } from 'vue';

export const store = reactive({
  isAuthenticated: false,
  token: ''
});

export function login(token) {
  store.isAuthenticated = true;
  store.token = token;
  localStorage.setItem('token', token);
}

export function logout() {
  store.isAuthenticated = false;
  store.token = '';
  localStorage.removeItem('token');
}
