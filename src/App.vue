<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-bg">
    <div class="p-8 rounded-lg shadow-md w-full max-w-md bg-white dark:bg-dark-accent">
      <h1 class="text-2xl text-red-500 mb-4 font-semibold text-brand-blue dark:text-dark-txt">
        Welcome to your job search companion!
      </h1>
      <LoginTemplate />
    </div>
  </div>
</template>

<script>
import LoginTemplate from './components/LoginTemplate'

export default {
  name: 'App',
  components: {
    LoginTemplate
  }
}
</script>

