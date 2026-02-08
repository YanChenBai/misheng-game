<template>
  <div
    class="h-screen overflow-hidden flex items-center justify-center font-sans text-slate-800 p-8"
  >
    <div class="max-w-5xl w-full overflow-hidden flex gap-10 p-8" v-if="question">
      <Question :img="question.image" />

      <div class="w-full grid grid-rows-[1fr_auto]">
        <div
          class="overflow-y-hidden flex flex-col gap-4 items-center p-4 pb-8"
          ref="scrollWrapper"
        >
          <Word v-for="guess in record" :word="guess" :answer="question?.answer" />
        </div>

        <Workspace
          v-model:model-value="inputValue"
          @confirm="handleConfirm"
          @next-question="handleNextQuestion"
          :length="answerLength"
          :completed
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Word from './components/Word.vue';
import Question from './components/Question.vue';
import { computed, nextTick, ref, useTemplateRef } from 'vue';
import { questions } from './questions';
import { useRoute, useRouter } from 'vue-router';
import Workspace from './components/Workspace.vue';
import { fireCenterConfetti } from './utils/confetti';

const route = useRoute();
const router = useRouter();
const scrollWrapper = useTemplateRef('scrollWrapper');
const inputValue = ref('');
const completed = ref(false);
const record = ref<string[]>([]);

const currentQuestionIndex = computed({
  get: () => Number(route.query.q ?? 0),
  set: (value) => {
    router.push({
      path: router.currentRoute.value.path ?? '',
      query: {
        q: value,
      },
    });
  },
});

const question = computed(() => questions[currentQuestionIndex.value]);
const answerLength = computed(() => question.value?.answer.length ?? 0);

function handleNextQuestion() {
  if (currentQuestionIndex.value === questions.length - 1) {
    return;
  }

  currentQuestionIndex.value++;
  record.value = [];
  inputValue.value = '';
  completed.value = false;
}

async function handleConfirm() {
  if (answerLength.value !== inputValue.value.length) return;

  record.value.push(inputValue.value);

  nextTick(() => {
    scrollWrapper.value?.scrollTo({
      top: scrollWrapper.value?.scrollHeight,
      behavior: 'smooth',
    });
  });

  if (inputValue.value === question.value?.answer) {
    completed.value = true;
    await fireCenterConfetti();
  }

  inputValue.value = '';
}
</script>
