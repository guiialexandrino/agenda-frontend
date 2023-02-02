import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PhosphorVue from 'phosphor-vue';
import Input from '../src/components/__Global/Input/Input.vue';
import Button from '../src/components/__Global/Button/Button.vue';

const app = createApp(App);

// Ferramentas Vue
app.use(router);
app.use(store);
app.use(PhosphorVue);

// Registro Componentes Globais
app.component('InputComponent', Input);
app.component('Button', Button);

// Monta Aplicação
app.mount('#app');
