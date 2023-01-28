<template>
  <h1>Login</h1>
  <p>Realize o login para acessar os seus contatos.</p>

  <InputComponent label="E-mail" v-model="email" />
  <InputComponent label="Senha" v-model="senha" type="password" />

  <p>
    <a @click="handleForgotPassword">Esqueceu a senha?</a
    ><button>Entrar</button>
  </p>
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
</script>

<style lang="less" scoped />
