<template>
  <div class="pt-6 w-full border-t-2 border-[#B6B9D0]/50">
    <button
      v-if="completed"
      class="py-3 w-full bg-white text-center border-4 border-[#7ECD82] rounded-2xl text-xl text-[#7ECD82] shadow-[0px_6px_0px_0px_#7ECD82] cursor-pointer transition-all active:translate-y-1 active:shadow-none"
      :style="{ opacity: isAllCompleted ? '0.5' : '1' }"
      type="button"
      :disabled="isAllCompleted"
      @click="handleNextQuestion()"
    >
      <template v-if="isAllCompleted">全部做完辣~</template>
      <template v-else>下一题</template>
    </button>
    <div v-else class="flex lg:flex-row flex-col lg:gap-2 gap-4 lg:items-end w-full">
      <div class="flex flex-col gap-2 w-full">
        <div class="flex gap-2 justify-center">
          <div
            class="size-15 border-4 border-[#B9BBD1] rounded-2xl text-[#83858A] text-center flex justify-center items-center"
            v-for="i in length"
            :key="i"
          >
            {{ inputValue?.[i - 1] }}
          </div>
        </div>

        <input
          type="text"
          placeholder="输入答案捏"
          v-model="inputValue"
          :maxlength="length"
          :minlength="length"
          ref="inputRef"
          class="w-full py-3 bg-white text-[#83858A] text-center border-4 border-[#B9BBD1] rounded-2xl text-xl shadow-[0px_6px_0px_0px_#B9BBD1] transition-all outline-none"
        />
      </div>

      <button
        class="py-3 lg:w-25 bg-white text-center border-4 border-[#F9DD7B] rounded-2xl text-xl text-[#BD8958] shadow-[0px_6px_0px_0px_#F9DD7B] cursor-pointer transition-all active:translate-y-1 active:shadow-none"
        type="button"
        @click="handleAddGuess()"
      >
        提交
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ completed: boolean; length: number; isAllCompleted: boolean }>();
const emit = defineEmits<{ (e: 'confirm', guess?: string): void; (e: 'nextQuestion'): void }>();
const inputRef = useTemplateRef('inputRef');
const inputValue = defineModel<string>();

function handleAddGuess() {
  if (!inputValue.value) return;
  if (inputValue.value.length !== props.length) return;
  if (props.completed) return;
  if (props.isAllCompleted) return;

  emit('confirm', inputValue.value);
}

function handleNextQuestion() {
  if (!props.completed) return;

  emit('nextQuestion');
}

function focusInput() {
  inputRef.value?.focus();
}

defineExpose({ focusInput });
</script>
