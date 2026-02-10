<template>
  <div class="min-h-screen flex justify-center-safe items-center-safe font-sans lg:p-8 text-slate-800">
    <div class="max-w-5xl w-full gap-10 p-8 md:flex" v-if="question">
      <Question v-bind="question" />

      <div class="w-full grid grid-rows-[1fr_auto]">
        <div class="overflow-y-hidden flex flex-col gap-4 items-center p-4 pb-8" ref="scrollWrapper">
          <Word v-for="guess in record" :word="guess" :answer="question?.answer" />
        </div>

        <Workspace v-model:model-value="inputValue" @confirm="handleConfirm" @next-question="handleNextQuestion"
          :length="answerLength" :completed :isAllCompleted />
      </div>
    </div>

    <PopBirthdayModal ref="popModal" />
  </div>
</template>

<script setup lang="ts">
import { questions } from './questions';
import { fireCenterConfetti } from './utils/confetti';

const popModal = useTemplateRef('popModal');
const scrollWrapper = useTemplateRef('scrollWrapper');
const inputValue = ref('');
const completed = ref(false);
const record = ref<string[]>([]);

const params = useUrlSearchParams('history');

const step = computed({
  get: () => Number(params.step ?? 0),
  set: (value) => (params.step = String(value)),
});

const question = computed(() => questions[step.value]);
const answerLength = computed(() => question.value?.answer.length ?? 0);
const isAllCompleted = computed(() => step.value === questions.length - 1 && completed.value);

function handleNextQuestion() {
  if (step.value === questions.length - 1) {
    return;
  }

  step.value++;
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
