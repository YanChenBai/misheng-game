<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="w-screen h-screen fixed top-0 left-0 bg-black/50 z-999 flex items-center justify-center"
    >
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const show = defineModel<boolean>('show', {
  default: true,
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* 带有弹性效果的贝塞尔曲线 */
}

.modal-leave-active .modal-content {
  transition: transform 0.2s ease-in;
}

.modal-enter-from .modal-content {
  transform: scale(0.7); /* 从较小开始 */
}

.modal-leave-to .modal-content {
  transform: scale(0.9); /* 消失时轻微缩小 */
}
</style>
