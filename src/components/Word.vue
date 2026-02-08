<template>
  <div
    class="grid gap-2 w-fit"
    :style="{ 'grid-template-columns': `repeat(${answer.length}, minmax(0, 1fr))` }"
  >
    <Char v-for="(char, index) in chars" :key="index" v-bind="char" />
  </div>
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
