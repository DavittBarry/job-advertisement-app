<template>
        <div class="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition cursor-pointer">
                <h2 class="text-xl font-semibold mb-2">{{ job.title }}</h2>
                <p class="text-sm text-gray-600 mb-2"><strong>Company:</strong> {{ job.company }}</p>
                <p class="text-sm text-gray-600"><strong>Description:</strong> {{ job.description }}</p>
        </div>
</template>

<script>
export default {
        props: ['job'],
};
</script>
