<template>
  <div
    class="w-full h-fit bg-white rounded-4xl border-4 border-slate-800 p-6 shadow-[8px_8px_0px_0px_rgba(30,41,59,0.1)]"
  >
    <div class="rounded-2xl flex">
      <img :src="img" class="rounded-2xl" width="1792" :key="img" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ img: string }>();
</script>
