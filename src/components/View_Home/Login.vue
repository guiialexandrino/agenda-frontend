<template>
  <div>
    <h1>Login</h1>
    <p>Realize o login para acessar os seus contatos.</p>

    <InputComponent label="E-mail" v-model="form.email" />
    <InputComponent
      label="Senha"
      v-model="form.password"
      type="password"
      @keyup.enter="handleLogin"
    />

    <div class="forgotPassword">
      <a @click="handleForgotPassword">Esqueceu a senha?</a>
      <Button @click="handleLogin">Entrar</Button>
    </div>

    <!-- Visivel apenas em telas pequenas -->
    <div class="registerSmallDevices">
      <Button :outlined="true" @click="handleRegister">
        Criar uma conta!
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Reqs from '../../requisitions/beforeLogin/';

document.title = 'App Agenda';

const router = useRouter();
const store = useStore();

const form = ref({ email: '', password: '' });

function handleForgotPassword() {
  router.push({ name: 'Forgot Password' });
}

function handleRegister() {
  router.push({ name: 'Register' });
}

async function handleLogin() {
  try {
    store.dispatch('loadingInit');
    const req = await Reqs.login({
      email: form.value.email,
      password: form.value.password,
    });

    if (req.success) {
      window.document.body.classList.remove('__addBackground');
      router.push({ name: 'Contacts' });
    } else {
      store.dispatch('dialogAlert', {
        open: true,
        success: false,
        message: 'Erro no Login',
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

<style src="./Login.less" scoped />
