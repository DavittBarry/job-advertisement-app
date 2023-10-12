<template>
        <div class="flex items-center space-x-4">
                <input class="border-brand-green-500 p-2 rounded hover:border-brand-blue-500 focus:border-brand-blue-500 transition"
                        v-model="username" placeholder="Username" />
                <input class="border-brand-green-500 p-2 rounded hover:border-brand-blue-500 focus:border-brand-blue-500 transition"
                        type="password" v-model="password" placeholder="Password" />
                <button class="bg-brand-green-500 text-white p-2 rounded hover:bg-brand-blue-600 focus:outline-none focus:border-brand-blue-600 focus:ring focus:ring-brand-blue-200 transition"
                        @click="login">Login</button>
        </div>
</template>

<script>
import axios from 'axios';

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
                        } catch (error) {
                                console.error('An error occurred during login:', error);
                        }
                }
        }
};
</script>
