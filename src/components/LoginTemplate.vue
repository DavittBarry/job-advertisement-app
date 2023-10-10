<template>
        <div class="flex flex-col items-center justify-center h-screen">
                <input class="border p-2 rounded mb-2" v-model="username" placeholder="Username" />
                <input class="border p-2 rounded mb-2" type="password" v-model="password" placeholder="Password" />
                <button class="bg-blue-500 text-white p-2 rounded" @click="login">Login</button>
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
