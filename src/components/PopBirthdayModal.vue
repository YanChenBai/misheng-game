<template>
  <Modal v-model:show="show">
    <div class="size-full flex justify-center items-center p-6 w-full">
      <div
        class="relative bg-white p-8 lg:w-100 w-90 rounded-[2.5rem] shadow-2xl border-4 border-pink-200 transform transition-all animate-in zoom-in-95 duration-300"
      >
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl animate-bounce">🎂</div>

        <div class="text-center space-y-4">
          <h1
            class="text-3xl font-black bg-linear-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
          >
            生日快乐捏！！！
          </h1>

          <div class="py-4">
            <p class="text-gray-500 font-medium leading-relaxed">
              愿弥弥在新的一岁<br />
              <span class="block text-pink-500 animate-pulse"> 📈 粉丝涨涨涨！ </span>
              <span class="block text-blue-400 animate-pulse"> 🚢 舰长涨涨涨！ </span>
            </p>
          </div>

          <button
            @click="closeModal"
            class="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 transition-transform active:scale-95 cursor-pointer"
          >
            收下祝福捏
          </button>
        </div>

        <div class="absolute -bottom-4 -right-4 text-4xl rotate-12">🌸</div>
        <div class="absolute -bottom-4 -left-4 text-4xl -rotate-12">🎁</div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';

const show = ref(false);

const closeModal = () => (show.value = false);

const openModal = () => (show.value = true);

defineExpose({
  openModal,
  closeModal,
});
</script>

<style scoped>
@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
