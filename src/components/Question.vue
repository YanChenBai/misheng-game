<template>
  <div class="w-180 bg-[#FEFFFE] rounded-4xl border-4 border-slate-800 p-6 shadow-[8px_8px_0px_0px_rgba(30,41,59,0.1)]">
    <div class="rounded-2xl flex relative overflow-hidden items-center justify-center">
      <Transition name="fade-slide" mode="out-in">
        <img :src="image" :key="image" class="rounded-2xl select-none w-full" draggable="false"
          :style="{ 'aspect-ratio': `calc(${w}/${h})` }" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ image: string; w?: number; h?: number }>();
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: scale(1.05) translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
