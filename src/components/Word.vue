<template>
  <TransitionGroup
    appear
    tag="div"
    name="char-float"
    class="grid gap-2 w-fit"
    :style="{ 'grid-template-columns': `repeat(${answer.length}, minmax(0, 1fr))` }"
  >
    <Char v-for="(char, index) in chars" :key="index" v-bind="char" :style="{ '--delay': index }" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Char from './Char.vue';
import { checkWord } from '@/utils/checkWord';

const props = defineProps<{
  word: string;
  answer: string;
}>();

const chars = computed(() => checkWord(props.answer, props.word));
</script>

<style scoped>
/* 进入动画的配置 */
.char-float-enter-active {
  /* 使用计算出的延迟：每个字比前一个慢 0.1s */
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: calc(var(--delay) * 0.1s);
}

.char-float-enter-from {
  opacity: 0;
  transform: translateY(30px); /* 向上浮现的起点是在下方 30px */
}

/* 确保动画只在第一次挂载时触发 (appear 特性) */
.char-float-leave-active {
  transition: all 0.2s ease;
}
</style>
