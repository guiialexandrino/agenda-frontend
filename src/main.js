import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Input from '../src/components/__Global/Input/Input.vue';

const app = createApp(App);

// Ferramentas Vue
app.use(router);
app.use(store);

// Registro Componentes Globais
app.component('InputComponent', Input);

// Monta Aplicação
app.mount('#app');
