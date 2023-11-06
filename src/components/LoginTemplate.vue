<template>
        <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div class="rounded-xl p-4 bg-brand-nav-bg-light container max-w-md w-full">
                                <div>
                                        <h2 class="mt-6 text-center text-3xl font-extrabold text-dark">
                                                Login
                                        </h2>
                                </div>
                                <form class="mt-8 space-y-6" @submit.prevent="login">
                                        <div class="rounded-md shadow-sm -space-y-px">
                                                <div>
                                                        <label for="username" class="sr-only">Username</label>
                                                        <input id="username" name="username" type="text" v-model="username" required
                                                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
                          placeholder-dark text-dark rounded-t-md focus:outline-none 
                          focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm"
                                                                placeholder="Username">
                                                </div>
                                                <div>
                                                        <label for="password" class="sr-only">Password</label>
                                                        <input id="password" name="password" type="password" v-model="password" required
                                                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
                          placeholder-dark text-dark rounded-b-md focus:outline-none 
                          focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm"
                                                                placeholder="Password">
                                                </div>
                                        </div>

                                        <div>
                                                <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                         text-sm font-medium rounded-md text-dark-txt bg-brand-blue-500 hover:bg-brand-green-500">
                                                        Login
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
</template>

<script>
import axios from 'axios';
import router from '../routes/index';

export default {
        data() {
                return {
                        username: '',
                        password: ''
                };
        },
        methods: {
                async login() {
                        try {
                                const response = await axios.post('/login', {
                                        username: this.username,
                                        password: this.password
                                });
                                localStorage.setItem('token', response.data);
                                router.push({ name: 'Home' });
                        } catch (error) {
                                console.error('An error occurred during login:', error);
                        }
                }
        }
};
</script>

