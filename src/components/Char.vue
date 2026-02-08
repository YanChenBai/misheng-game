<template>
  <div
    :class="[
      'size-15 flex flex-col items-center justify-center rounded-2xl transition-all hover:translate-y-1 hover:shadow-none select-none',
      wrapStyles,
    ]"
  >
    <span class="text-xs" :class="pinyinStyle">{{ pinyin }}</span>
    <span class="text-xl font-bold" :class="chatStyle">{{ char }}</span>
  </div>
</template>

<script setup lang="ts">
import { CharState, type CheckResult } from '@/types';
import { computed } from 'vue';

const props = defineProps<CheckResult>();

const wrapStyles = computed(() => {
  if (props.state === CharState.CORRECT)
    return ['bg-[#7ECD82] text-white shadow-[0px_6px_0px_0px_#A2DD95]'];

  return ['bg-white shadow-[0px_6px_0px_0px_#D6E7EF]'];
});

const pinyinStyle = computed(() => {
  if (props.state === CharState.PRON_CORRECT_POS_CORRECT) {
    return ['text-[#7ECD82]'];
  } else if (props.state === CharState.PRON_CORRECT_POS_WRONG) {
    return ['text-[#f79444]'];
  }
  if (props.state === CharState.CHAR_CORRECT_POS_WRONG) {
    return ['text-[#f79444]'];
  }
});

const chatStyle = computed(() => {
  if (props.state === CharState.CHAR_CORRECT_POS_WRONG) {
    return ['text-[#f79444]'];
  }
});
</script>
