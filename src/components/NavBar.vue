<template>
        <nav class="flex items-center justify-between p-4 shadow-md bg-brand-nav-bg-light">
                <router-link to="/"
                        class="flex items-center rounded-lg bg-logo-container-bg space-x-2 p-2 hover:bg-brand-nav-bg-light transition">
                        <img src="@/assets/logo.png" alt="Job Finder Logo" class="w-10 h-10">
                        <h1 class="text-2xl font-semibold text-gray-600">
                                Job Finder
                        </h1>
                </router-link>
                <LoginTemplate />
        </nav>
</template>

<script>
import LoginTemplate from './LoginTemplate';

export default {
        components: {
                LoginTemplate
        }
};
</script>
