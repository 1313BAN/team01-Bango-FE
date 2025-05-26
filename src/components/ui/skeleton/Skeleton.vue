<template>
  <div class="animate-pulse rounded bg-gray-200 h-6 w-full"></div>
</template>

<script setup></script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>