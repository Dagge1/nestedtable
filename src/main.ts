import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/scss/bootstrap.scss';
import "bootstrap/dist/js/bootstrap.min.js";  // we need this if we want to use Bootstrap js based accordion etc.

createApp(App).mount('#app');
