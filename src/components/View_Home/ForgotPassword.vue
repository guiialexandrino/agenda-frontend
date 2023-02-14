<template>
  <div>
    <h1 class="__verticalTop">Esqueceu a senha?</h1>
    <p>Digite seu e-mail para receber uma nova senha:</p>
    <InputComponent label="E-mail" v-model="email" />
    <div class="__alignRight">
      <Button @click="recovery">Enviar</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Reqs from '../../requisitions/beforeLogin';

const store = useStore();
const email = ref('');

async function recovery() {
  try {
    store.dispatch('loadingInit');
    const req = await Reqs.lostPassword(email.value);
    if (req.success) {
      store.dispatch('dialogAlert', {
        open: true,
        success: true,
        message: 'Recuperação de Senha',
        info: 'Um token para recuperação de senha foi enviado ao seu email!',
      });
    } else {
      store.dispatch('dialogAlert', {
        open: true,
        success: false,
        message: 'Recuperação de Senha',
        info: req.error,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    store.dispatch('loadingDoneMethod');
  }
}
</script>
