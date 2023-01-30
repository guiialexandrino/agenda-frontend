<template>
  <div>
    <h1>Login</h1>
    <p>Realize o login para acessar os seus contatos.</p>

    <InputComponent label="E-mail" v-model="email" />
    <InputComponent label="Senha" v-model="senha" type="password" />

    <div class="forgotPassword">
      <a @click="handleForgotPassword">Esqueceu a senha?</a>
      <Button @click="teste">Entrar</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const senha = ref('');

function handleForgotPassword() {
  router.push({ name: 'Forgot Password' });
}

function teste() {
  console.log('clicou');
}
</script>

<style src="./Login.less" scoped />
