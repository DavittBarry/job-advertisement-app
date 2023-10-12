<template>
        <nav class="bg-brand-nav-bg-light">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex items-center justify-between h-16">
                                <div class="flex items-center">
                                        <router-link to="/"
                                                class="flex-shrink-0 flex items-center space-x-2 rounded-lg hover:bg-brand-nav-bg-light transition"
                                                active-class="bg-brand-nav-bg-light"
                                                :style="{ background: 'linear-gradient(to right, #D9D9D9, #F1F1F1)' }">
                                                <img src="@/assets/logo.png" alt="Job Finder Logo" class="w-10 h-10">
                                                <h1 class="text-2xl font-semibold text-gray-600">
                                                        Job Finder
                                                </h1>
                                        </router-link>
                                </div>
                                <div class="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
                                        <router-link to="/jobs"
                                                class="text-gray-600 font-semibold p-1 rounded-lg hover:bg-logo-container-bg hover:text-gray-900 transition"
                                                active-class="bg-logo-container-bg text-gray-900">
                                                Jobs
                                        </router-link>
                                </div>
                                <div class="lg:hidden flex items-center">
                                        <button @click="toggleMenu"
                                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none">
                                                <span class="sr-only">Open main menu</span>
                                                <svg v-if="!isOpen" class="block h-6 w-6 transition duration-300 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M4 6h16M4 12h16M4 18h16"></path>
                                                </svg>
                                                <svg v-else class="block h-6 w-6 transition duration-300 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                        </button>
                                </div>
                                <div class="hidden lg:block">
                                        <LoginTemplate />
                                </div>
                        </div>
                </div>
                <div :class="{ 'block': isOpen, 'hidden': !isOpen }" class="lg:hidden">
                        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <router-link to="/jobs"
                                        class="text-gray-600 font-semibold p-1 rounded-lg hover:bg-logo-container-bg hover:text-gray-900 transition"
                                        active-class="bg-logo-container-bg text-gray-900">
                                        Jobs
                                </router-link>
                        </div>
                        <LoginTemplate />
                </div>
        </nav>
</template>

<script>
import LoginTemplate from './LoginTemplate';

export default {
        components: {
                LoginTemplate
        },
        data() {
                return {
                        isOpen: false
                };
        },
        methods: {
                toggleMenu() {
                        this.isOpen = !this.isOpen;
                }
        }
};
</script>
