<template>
  <div
    class="min-h-screen flex justify-center-safe items-center-safe font-sans lg:p-8 text-slate-800"
  >
    <div class="max-w-5xl w-full gap-10 p-8 md:flex" v-if="question">
      <Question v-bind="question" />

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
          :isAllCompleted
        />
      </div>
    </div>

    <PopBirthdayModal ref="popModal" />
  </div>
</template>

<script setup lang="ts">
import Word from './components/Word.vue';
import PopBirthdayModal from '@/components/PopBirthdayModal.vue';
import Question from './components/Question.vue';
import { computed, nextTick, ref, useTemplateRef, watchEffect } from 'vue';
import { questions } from './questions';
import { useRoute, useRouter } from 'vue-router';
import Workspace from './components/Workspace.vue';
import { fireCenterConfetti } from './utils/confetti';

const popModal = useTemplateRef('popModal');
const scrollWrapper = useTemplateRef('scrollWrapper');
const route = useRoute();
const router = useRouter();
const inputValue = ref('');
const completed = ref(false);
const showModal = ref(true);
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
const isAllCompleted = computed(
  () => currentQuestionIndex.value === questions.length - 1 && completed.value,
);

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

watchEffect(() => {
  if (isAllCompleted.value) popModal.value?.openModal();
});
</script>
