import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import './style.css';
import { preloadQuestionImages } from './utils/preloadImages';

preloadQuestionImages();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
